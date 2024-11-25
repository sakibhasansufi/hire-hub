import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";


export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({ message: "Company name is required", success: false })
        }

        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({ message: "This Company already exists", success: false })
        }

        company = await Company.create({
            name: companyName,
            userId: req.id
        });
        return res.status(201).json({ message: "Company created successfully", company, success: true });
    } catch (error) {
        console.log("Error in register company: ", error.message);
        res.status(500).json({ error: error.message });
    }
};


export const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({ userId });
        if (!companies) {
            return res.status(404).json({
                message: "Companies not found.",
                success: false
            })
        }
        return res.status(200).json({companies , success: true});
    } catch (error) {
        console.log(error);
    }
}


export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: "Company not found", success: false })
        }
        return res.status(200).json({company , success: true});
    } catch (error) {
        console.log("Error in get company by id:", error.message);
        res.status(500).json({ error: error.message });
    }
};


export const updateCompany = async (req, res) => {
    try {
        const { name, description, location, website } = req.body;
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;

        const updateData = { name, description, location, website,logo };
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!company) {
            return res.status(404).json({ message: "Company not found", success: false })
        }
        return res.status(200).json({message: "Information updated successfully",company, success: true});
    } catch (error) {
        console.log("Error in update company", error.message);
        res.status(500).json({ message: "Must provide company logo" });
    }
}