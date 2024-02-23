const express = require('express');
const router = express.Router();
const orderControllers = require('../controllers/orderController');
const authMiddlewares = require('../middlewares/authMiddlewares');

router.get('/user/order',authMiddlewares.requireSignIn,orderControllers.getOrderController);
router.get('/admin/get-all-orders',authMiddlewares.requireSignIn,authMiddlewares.isAdmin,orderControllers.getAllOrders);
router.put('/admin/changeOrderStatus',authMiddlewares.requireSignIn,authMiddlewares.isAdmin,orderControllers.changeOrderStatus);
module.exports = router;