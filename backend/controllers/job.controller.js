
import { Job } from "../models/job.company.js";

export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, experienceLevel, location, jobType, position, companyId, education, responsibility, workPlaceType } = req.body;
        const userId = req.id;
        if (!title) {
            return res.status(400).json({ message: "You have forgot to provide job title", success: false })
        }
        if (!description) {
            return res.status(400).json({ message: "Please provide job description", success: false })
        }
        if (!requirements) {
            return res.status(400).json({ message: "You have forgot to provide requirements", success: false })
        }
        if (!salary) {
            return res.status(400).json({ message: "Yoy have forgot to provide salary", success: false })
        }
        if (!experienceLevel) {
            return res.status(400).json({ message: "Please provide the job experience", success: false })
        }
        if (!location) {
            return res.status(400).json({ message: "You have forgot to provide the job location", success: false })
        }
        if (!jobType) {
            return res.status(400).json({ message: "Please provide the job type", success: false })
        }
        if (!position) {
            return res.status(400).json({ message: "Please provide how many job positions are available", success: false })
        }
        if (!location) {
            return res.status(400).json({ message: "You have forgot to provide the job location", success: false })
        }
        if (!education) {
            return res.status(400).json({ message: "You have forgot to provide the education level", success: false })
        }
        if (!responsibility) {
            return res.status(400).json({ message: "You have forgot to provide responsibility", success: false })
        }
        if (!companyId) {
            return res.status(400).json({ message: "Please provide the company Id", success: false })
        }

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            experienceLevel,
            location,
            jobType,
            position,
            education,
            workPlaceType,
            responsibility: responsibility.split(","),
            company: companyId,
            created_by: userId

        });
        res.status(201).json({ message: "Job posted successfully", job, success: true });

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
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({ message: "No jobs found" })
        }
        res.status(200).json({ jobs, success: true });
    } catch (error) {
        console.log("Error in get all jobs", error.message);
        res.status(500).json({ error: error.message });
    }
};


export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications"
        }).populate({
            path: "company"
        });
        if (!job) {
            return res.status(404).json({ message: "Job not found", success: true })
        }
        res.status(200).json({ job, success: true });
    } catch (error) {
        console.log("Error in get job by id", error.message);
        res.status(500).json({ error: error.message });
    }
};



export const adminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: 'company',
            createdAt: -1
        });
        if (!jobs) {
            return res.status(404).json({ message: "No jobs found", success: false })
        }
        res.status(200).json({ jobs, success: true });

    } catch (error) {
        console.log("Error in admin jobs", error.message);
        res.status(500).json({ error: error.message });
    }
};


export const getAdminJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const adminId = req.id; 
        const job = await Job.findOne({ _id: jobId, created_by: adminId }).populate({
            path: "company",
        });

        if (!job) {
            return res.status(404).json({ message: "Job not found or not authorized to view", success: false });
        }

        res.status(200).json({ job, success: true });
    } catch (error) {
        console.log("Error in getAdminJobById", error.message);
        res.status(500).json({ error: error.message });
    }
};



export const updateJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.id;
        const job = await Job.findOne({ _id: jobId, created_by: userId });
        if (!job) {
            return res.status(404).json({ message: "Job not found", success: false })
        };
        const update = req.body;
        
        if (update.requirements) {
            update.requirements = update.requirements.split(",").map((item) => item.trim());
        }
        if (update.responsibility) {
            update.responsibility = update.responsibility.split(",").map((item) => item.trim());
        }
        if (update.salary) {
            update.salary = Number(update.salary);
        }
        if (update.position) {
            update.position = Number(update.position);
        }

        const updateJob = await Job.findByIdAndUpdate(jobId, update,{
            new: true,
            runValidators: true
        });
        res.status(200).json({ message:'Job has been updated successfully', job:updateJob, success: true });
    } catch (error) {
        console.log("Error in update jobs", error.message);
        res.status(500).json({ error: error.message });
    }
};


export const deleteJob = async (req,res) =>{
    try {
        const jobId = req.params.id;
        const userId = req.id;
        const job = await Job.findOne({ _id: jobId, created_by: userId });
        if (!job) {
            return res.status(404).json({ message: "Job not found", success: false })
        };

        await Job.findByIdAndDelete(jobId);
        res.status(200).json({ message: "Job deleted successfully", success: true });
    } catch (error) {
        console.log("Error in delete jobs", error.message);
        res.status(500).json({ error: error.message }); 
    }
}