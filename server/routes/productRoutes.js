const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/productControllers');
const authMiddlewares = require('../middlewares/authMiddlewares');
const formidable=require('express-formidable');

router.post('/create-product',authMiddlewares.requireSignIn,authMiddlewares.isAdmin,formidable(), productControllers.createProduct);

router.get('/all-products',productControllers.getAllProducts);

router.get('/get-product/:pid',productControllers.getSingleProduct);

router.get('/get-photo/:pid',productControllers.getPhoto);

router.delete('/delete-product/:pid',authMiddlewares.requireSignIn,authMiddlewares.isAdmin,productControllers.deleteProduct);

router.put('/update-product/:pid',authMiddlewares.requireSignIn,authMiddlewares.isAdmin,formidable(),productControllers.updateProduct);
module.exports = router;