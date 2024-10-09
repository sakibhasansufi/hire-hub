import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";


export const register = async (req, res) => {
    try {
        const { fullName, email, password, phoneNumber, role } = req.body;
        console.log(fullName, email, password, phoneNumber, role)

        if(!fullName){
            return res.status(400).json({message: "You have forgot to enter full name",success: false})
        }
        if(!email){
            return res.status(400).json({message: "You have forgot to enter email",success: false})
        }
        if (!password) {
            return res.status(400).json({ message: "You have forgot to enter password",success: false })
        }
        if(!phoneNumber){
            return res.status(400).json({message: "You have forgot to enter phone number",success: false})
        }
        if(!role){
            return res.status(400).json({message: "You have forgot to enter role",success: false})
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists",success: false })
        };

        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long",success: false });
        }

        // Check if password contains at least one capital letter
        const capitalLetterRegex = /[A-Z]/;
        if (!capitalLetterRegex.test(password)) {
            return res.status(400).json({ error: "Password must contain at least one capital letter",success: false });
        }

        // Check if password contains at least one number
        const numberRegex = /\d/;
        if (!numberRegex.test(password)) {
            return res.status(400).json({ error: "Password must contain at least one number",success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullName,
            email,
            password: hashedPassword,
            phoneNumber,
            role
        })
        res.status(201).json({ message: "Account created successfully",success: true })

    } catch (error) {
        console.log("Error in register: ", error.message);
        res.status(500).json({ error: error.message });
    }
};



export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email) {
            return res.status(400).json({ message: "You have forgot to enter your email", success: false })
        }

        if (!password) {
            return res.status(400).json({ message: "You have forgot to enter password",success: false })
        }

        if (!role) {
            return res.status(400).json({ message: "Please select a role to log in",success: false })
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found",success: false })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Password is incorrect",success: false })
        }

        if (role !== user.role) {
            return res.status(400).json({ message: "Please select the right role",success: false })
        }

        const tokenData = {
            userId: user._id,
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });
        user ={
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullName}`,
            user,
            success: true
        })

    } catch (error) {
        console.log("Error in login: ", error.message);
        res.status(500).json({ error: error.message });
    }
};



export const logout = async (req,res)=>{
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log("Error in logout: ", error.message);
        res.status(500).json({ error: error.message });
    }
};



export const updateProfile = async (req,res) =>{
   
    try {
        const {fullName,email,currentPassword,newPassword,phoneNumber,bio,skills} = req.body;
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const userId = req.id;
        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }

        const existingEmail = await User.findOne({ email });
		if (existingEmail) {
			return res.status(400).json({ message: "Email has already taken",success: false });
		}

        if ((!newPassword && currentPassword) || (!currentPassword && newPassword)) {
			return res.status(400).json({ message: "Please provide both current password and new password",success: false });
		}


        if (currentPassword && newPassword) {
			const isMatch = await bcrypt.compare(currentPassword, user.password);
			if (!isMatch) return res.status(400).json({ message: "Current password is incorrect" });
			if (newPassword.length < 6) {
				return res.status(400).json({ message: "Password must be at least 6 characters long",success: false });
			}

			const capitalLetterRegex = /[A-Z]/;
			// Check if password contains at least one capital letter
			if (!capitalLetterRegex.test(newPassword)) {
				return res.status(400).json({ message: "Password must contain at least one capital letter",success: false });
			}
			// Check if password contains at least one number
			const numberRegex = /\d/;
			if (!numberRegex.test(newPassword)) {
				return res.status(400).json({ message: "Password must contain at least one number",success: false });
			}

			user.password = await bcrypt.hash(newPassword, 10);
		}


        user.fullName = fullName || user.fullName
        user.email = email || user.email
        user.phoneNumber = phoneNumber || user.phoneNumber
        user.profile.bio = bio || user.profile.bio
        user.profile.skills = skillsArray || user.profile.skills


        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url // save the cloudinary url
            user.profile.resumeOriginalName = file.originalname // Save the original file name
        }

        await user.save();

        user.password = null;


        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };


        return res.status(200).json({
            message:"Profile updated successfully.",
            user,
            success: true
        })

    } catch (error) {
        console.log("Error in update profile: ", error.message);
        res.status(500).json({ error: error.message });
    }
}