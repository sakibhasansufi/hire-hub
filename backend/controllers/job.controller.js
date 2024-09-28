import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, experience, location, jobType, position, companyId } = req.body;
        const userId = req.id;
        if (!title) {
            return res.status(400).json({ message: "You have forgot to provide job title" })
        }
        if (!description) {
            return res.status(400).json({ message: "Please provide job description" })
        }
        if (!requirements) {
            return res.status(400).json({ message: "You have forgot to provide requirements" })
        }
        if (!salary) {
            return res.status(400).json({ message: "Yoy have forgot to provide salary" })
        }
        if (!experience) {
            return res.status(400).json({ message: "Please provide the job experience" })
        }
        if (!location) {
            return res.status(400).json({ message: "You have forgot to provide the job location" })
        }
        if (!jobType) {
            return res.status(400).json({ message: "Please provide the job type" })
        }
        if (!position) {
            return res.status(400).json({ message: "Please provide how many job positions are available" })
        }
        if (!location) {
            return res.status(400).json({ message: "You have forgot to provide the job location" })
        }
        if (!companyId) {
            return res.status(400).json({ message: "Please provide the company Id" })
        }

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            experienceLevel: experience,
            location,
            jobType,
            position,
            company: companyId,
            created_by: userId

        });
        res.status(201).json({ message: "Job posted successfully", job });

    } catch (error) {
        console.log("Error in post job", error.message);
        res.status(500).json({ error: error.message });
    }
};


export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({path: "company"}).sort({createdAt: -1});
        if (!jobs) {
            return res.status(404).json({ message: "No jobs found" })
        }
        res.status(200).json(jobs);
    } catch (error) {
        console.log("Error in get all jobs", error.message);
        res.status(500).json({ error: error.message });
    }
};


export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" })
        }
        res.status(200).json(job);
    } catch (error) {
        console.log("Error in get job by id", error.message);
        res.status(500).json({ error: error.message });
    }
};



export const adminJobs = async(req,res)=>{
    try {
        const adminId = req.id;
        const jobs = await Job.find({created_by:adminId});
        if(!jobs){
            return res.status(404).json({message:"No jobs found"})
        }
        res.status(200).json(jobs);
        
    } catch (error) {
        console.log("Error in admin jobs", error.message);
        res.status(500).json({ error: error.message });
    }
}