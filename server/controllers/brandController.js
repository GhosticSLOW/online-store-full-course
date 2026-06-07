const {Brand} = require('../models/models')
const ApiError = require('../error/ApiError');

class BrandController {
    async create(req, res) {
        const {name} = req.body
        const brand = await Brand.create({name})
        return res.json(brand)
    }

    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params
            const brand = await Brand.findByPk(id)
            if (!brand) {
                return next(ApiError.badRequest('Бренд не найден'))
            }
            await brand.destroy()
            return res.json({message: 'Бренд успешно удален'})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            const {id, name} = req.body
            const brand = await Brand.findByPk(id)
            if (!brand) {
                return next(ApiError.badRequest('Бренд не найден'))
            }
            if (name) brand.name = name
            await brand.save()
            return res.json(brand)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new BrandController()
