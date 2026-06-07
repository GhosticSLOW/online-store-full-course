const uuid = require('uuid')
const path = require('path');
const {Device, DeviceInfo, Brand, Type} = require('../models/models')
const ApiError = require('../error/ApiError');

class DeviceController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({name, price, brandId, typeId, img: fileName});

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }

            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devices;
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({limit, offset, include: [{model: Brand}, {model: Type}]})
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({where:{brandId}, limit, offset, include: [{model: Brand}, {model: Type}]})
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({where:{typeId}, limit, offset, include: [{model: Brand}, {model: Type}]})
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({where:{typeId, brandId}, limit, offset, include: [{model: Brand}, {model: Type}]})
        }
        return res.json(devices)
    }

    async getOne(req, res) {
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}, {model: Brand}, {model: Type}]
            },
        )
        return res.json(device)
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params
            const device = await Device.findByPk(id)
            if (!device) {
                return next(ApiError.badRequest('Устройство не найдено'))
            }
            
            // Удаляем информацию об устройстве
            await DeviceInfo.destroy({where: {deviceId: id}})
            
            // Удаляем само устройство
            await device.destroy()
            
            return res.json({message: 'Устройство успешно удалено'})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {id} = req.params
            const device = await Device.findByPk(id)
            if (!device) {
                return next(ApiError.badRequest('Устройство не найдено'))
            }

            // Обновляем основные данные устройства
            if (name) device.name = name
            if (price) device.price = price
            if (brandId) device.brandId = brandId
            if (typeId) device.typeId = typeId

            // Если загружен новый файл изображения
            if (req.files && req.files.img) {
                const {img} = req.files
                let fileName = uuid.v4() + ".jpg"
                img.mv(path.resolve(__dirname, '..', 'static', fileName))
                device.img = fileName
            }

            await device.save()

            // Обновляем информацию об устройстве
            if (info) {
                info = typeof info === 'string' ? JSON.parse(info) : info
                // Удаляем старую информацию
                await DeviceInfo.destroy({where: {deviceId: id}})
                // Добавляем новую информацию
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }

            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new DeviceController()
