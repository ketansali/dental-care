const router = require("express").Router()


const patientRoutes = require('./patient.Routes')
const productRoutes = require('./product.Routes')
const addressRoutes = require('./address.Routes')
const accountRoutes = require('./account.Routes')
const cartRoutes = require('./cart.Routes')
const orderRoutes = require('./order.Routes')
const stripeRoutes = require('./stripe.Routes')

const { ensureAuthorized } = require("../middleware/auth")

router.use('/account',accountRoutes)
router.use('/address',ensureAuthorized,addressRoutes)
router.use('/product',ensureAuthorized,productRoutes)
router.use('/patient',ensureAuthorized,patientRoutes)
router.use('/cart',ensureAuthorized,cartRoutes)
router.use('/stripe',ensureAuthorized,stripeRoutes)
router.use('/order',ensureAuthorized,orderRoutes)



module.exports = router