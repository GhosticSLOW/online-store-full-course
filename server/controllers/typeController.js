const {Type} = require('../models/models')
const ApiError = require('../error/ApiError');

class TypeController {
    async create(req, res) {
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)
    }

    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params
            const type = await Type.findByPk(id)
            if (!type) {
                return next(ApiError.badRequest('Тип не найден'))
            }
            await type.destroy()
            return res.json({message: 'Тип успешно удален'})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            const {id, name} = req.body
            const type = await Type.findByPk(id)
            if (!type) {
                return next(ApiError.badRequest('Тип не найден'))
            }
            if (name) type.name = name
            await type.save()
            return res.json(type)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new TypeController()
