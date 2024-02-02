const express = require('express');
const router = express.Router();
const brandControllers = require('../controllers/brandControllers');
const authMiddlewares = require('../middlewares/authMiddlewares');
//create brand
router.post('/create-brand',authMiddlewares.requireSignIn,authMiddlewares.isAdmin, brandControllers.createBrandController);

//update brand
router.put('/update-brand/:id',authMiddlewares.requireSignIn,authMiddlewares.isAdmin, brandControllers.updateBrandController);    

//get all brand
router.get('/all-brands', brandControllers.getAllBrandsController);
module.exports = router;

//get single brand
router.get('/single-brand/:slug', brandControllers.getSingleBrandController);

//delete brand
router.delete('/delete-brand/:id',authMiddlewares.requireSignIn,authMiddlewares.isAdmin, brandControllers.deleteBrandController);

module.exports = router;