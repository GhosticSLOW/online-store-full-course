const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, brandController.create)
router.get('/', brandController.getAll)
router.put('/:id', authMiddleware, brandController.update)
router.delete('/:id', authMiddleware, brandController.delete)

module.exports = router
