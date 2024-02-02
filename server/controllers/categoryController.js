const categoryModel = require("../models/categoryModel");
const slugify = require("slugify");
const createCategoryController = async (req, res) => {

    try{
        const {name} = req.body;
        if(!name){
            return res.status(400).send({success:false,error:"name is required"});
        }
        const existingCategory= await categoryModel.findOne({name});
        if(existingCategory){
            return res.status(400).send({success:false,error:"category already exists"});
        }
        const category = await new categoryModel({name,slug:slugify(name)}).save();
        res.status(201).send({success:true,messayge:"category created successfully",category});
    }
    catch(e){
        console.log(e);
        res.status(400).send({success:false,error:e.message,messay:"internal server error"});
    }
}


const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        if (!name) {
            return res.status(400).send({ success: false, error: "Name is required" });
        }

        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });

        if (!category) {
            return res.status(400).send({ success: false, error: "Category not found" });
        } else {
            res.status(201).send({ success: true, message: "Category updated successfully", category });
        }

    } catch (error) {
        console.error(error.message);

        if (error.code === 11000 && error.keyPattern && error.keyValue) {
            // Duplicate key error handling
            const duplicateField = Object.keys(error.keyPattern)[0];
            const duplicateValue = error.keyValue[duplicateField];
            return res.status(409).send({
                success: false,
                error: error.message,
                message: "Category already exist there"
            });
        }

        res.status(500).send({ success: false, error: error.message, message: "Internal server error" });
    }
};

const getAllCategoriesController = async (req, res) => {
    try {
        const categories = await categoryModel.find({});
        res.status(200).send({success:true,message:"all categories fetched successfully",categories});
    } catch (error) {
        console.log(error);
        res.status(400).send({success:false,error:error.message,messay:"internal server error"});
    }
}

const getSingleCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({slug:req.params.slug});
        if(!category){
            return res.status(400).send({success:false,error:"category not found"});
        }
        res.status(200).send({success:true,message:"category fetched successfully",category});
    } catch (error) {
        console.log(error);
        res.status(400).send({success:false,error:e.message,messay:"internal server error"});
    }
}

const deleteCategoryController = async (req, res) => {
    try {
        const {id} = req.params;
        if (!id) {
            return res.status(400).send({ success: false, error: "Category ID is required" });
        }

        const category = await categoryModel.findByIdAndDelete(id);
        if(!category){
            return res.status(400).send({success:false,error:"category not found"});
        }
        res.status(200).send({success:true,message:"category deleted successfully",category});
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false,error:error.message,message:"internal server error"});
    }
}

const categroyControllers={
    createCategoryController,
    updateCategoryController,
    getAllCategoriesController,
    getSingleCategoryController,
    deleteCategoryController
    

}

module.exports = categroyControllers;