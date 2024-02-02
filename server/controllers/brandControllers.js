const brandModel = require("../models/brandModel");
const slugify = require("slugify");
const createBrandController = async (req, res) => {

    try{
        const { name } = req.body;
        if(!name){
            return res.status(400).send({success:false,error:"name is required"});
        }
        const existingBrand= await brandModel.findOne({name});
        if(existingBrand){
            return res.status(400).send({success:false,error:"Brand already exists"});
        }
        const brand = await new brandModel({name,slug:slugify(name)}).save();
        res.status(201).send({success:true,messayge:"brand created successfully",brand});
    }
    catch(e){
        console.log(e);
        res.status(400).send({success:false,error:e.message,messay:"internal server error"});
    }
}


const updateBrandController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        if (!name) {
            return res.status(400).send({ success: false, error: "Name is required" });
        }

        const brand = await brandModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });

        if (!brand) {
            return res.status(400).send({ success: false, error: "Brand not found" });
        } else {
            res.status(201).send({ success: true, message: "Brand updated successfully", brand });
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
                message: "Brand already exist there"
            });
        }

        res.status(500).send({ success: false, error: error.message, message: "Internal server error" });
    }
};

const getAllBrandsController = async (req, res) => {
    try {
        const brands = await brandModel.find({});
        res.status(200).send({success:true,message:"all Brands fetched successfully",brands});
    } catch (error) {
        console.log(error);
        res.status(400).send({success:false,error:error.message,message:"internal server error"});
    }
}

const getSingleBrandController = async (req, res) => {
    try {
        const brand = await brandModel.findOne({slug:req.params.slug});
        if(!brand){
            return res.status(400).send({success:false,error:"Brand not found"});
        }
        res.status(200).send({success:true,message:"Brand fetched successfully",brand});
    } catch (error) {
        console.log(error);
        res.status(400).send({success:false,error:error.message,message:"internal server error"});
    }
}

const deleteBrandController = async (req, res) => {
    try {
        const {id} = req.params;
        if (!id) {
            return res.status(400).send({ success: false, error: "Brand ID is required" });
        }
        
        const brand = await brandModel.findByIdAndDelete(id);
        console.log(brand)
        if(!brand){
            return res.status(400).send({success:false,error:"Brand not found"});
        }
        res.status(200).send({success:true,message:"Brand deleted successfully",brand});
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false,error:error.message,message:"internal server error"});
    }
}

const brandControllers={
    createBrandController,
    updateBrandController,
    getAllBrandsController,
    getSingleBrandController,
    deleteBrandController
    

}

module.exports = brandControllers;