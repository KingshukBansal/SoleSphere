const express = require('express');
const router = express.Router();
const authMiddlewares = require('../middlewares/authMiddlewares');
const authController = require('../controllers/authController');
router.post('/register',authController.registerController);
router.post('/login',authController.loginController);
router.post('/forgotpassword',authController.forgotPasswordController);
router.get('/test',authMiddlewares.requireSignIn,authMiddlewares.isAdmin,authController.testController);
//private routes

router.get('/userauth',authMiddlewares.requireSignIn,authMiddlewares.isUser,(req,res)=>{
    res.status(200).send({ok:true});
});

router.get('/adminauth',authMiddlewares.requireSignIn,authMiddlewares.isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
}
);

router.put('/profile',authMiddlewares.requireSignIn,authController.updateProfileController);

module.exports = router;