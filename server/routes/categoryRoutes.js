const express = require('express');
const router = express.Router();
const categoryControllers = require('../controllers/categoryController');
const authMiddlewares = require('../middlewares/authMiddlewares');
//create category
router.post('/create-category',authMiddlewares.requireSignIn,authMiddlewares.isAdmin, categoryControllers.createCategoryController);

//update categroy
router.put('/update-category/:id',authMiddlewares.requireSignIn,authMiddlewares.isAdmin, categoryControllers.updateCategoryController);    

//get all categories
router.get('/all-categories', categoryControllers.getAllCategoriesController);
module.exports = router;

//get single category
router.get('/single-category/:slug', categoryControllers.getSingleCategoryController);

//delete category
router.delete('/delete-category/:id',authMiddlewares.requireSignIn,authMiddlewares.isAdmin, categoryControllers.deleteCategoryController);

module.exports = router;