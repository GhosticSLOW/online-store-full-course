const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, typeController.create)
router.get('/', typeController.getAll)
router.put('/:id', authMiddleware, typeController.update)
router.delete('/:id', authMiddleware, typeController.delete)

module.exports = router
