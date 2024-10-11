import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, experience, location, jobType, position, companyId } = req.body;
        const userId = req.id;
        if (!title) {
            return res.status(400).json({ message: "You have forgot to provide job title",success: false })
        }
        if (!description) {
            return res.status(400).json({ message: "Please provide job description",success: false })
        }
        if (!requirements) {
            return res.status(400).json({ message: "You have forgot to provide requirements",success: false })
        }
        if (!salary) {
            return res.status(400).json({ message: "Yoy have forgot to provide salary",success: false })
        }
        if (!experience) {
            return res.status(400).json({ message: "Please provide the job experience",success: false })
        }
        if (!location) {
            return res.status(400).json({ message: "You have forgot to provide the job location",success: false })
        }
        if (!jobType) {
            return res.status(400).json({ message: "Please provide the job type",success: false })
        }
        if (!position) {
            return res.status(400).json({ message: "Please provide how many job positions are available",success: false })
        }
        if (!location) {
            return res.status(400).json({ message: "You have forgot to provide the job location",success: false })
        }
        if (!companyId) {
            return res.status(400).json({ message: "Please provide the company Id",success: false })
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
        res.status(201).json({ message: "Job posted successfully", job,success: true });

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
        res.status(200).json({jobs,success: true});
    } catch (error) {
        console.log("Error in get all jobs", error.message);
        res.status(500).json({ error: error.message });
    }
};


export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if (!job) {
            return res.status(404).json({ message: "Job not found", success: true })
        }
        res.status(200).json({job, success: true});
    } catch (error) {
        console.log("Error in get job by id", error.message);
        res.status(500).json({ error: error.message });
    }
};



export const adminJobs = async(req,res)=>{
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1
        });
        if(!jobs){
            return res.status(404).json({message:"No jobs found", success: false})
        }
        res.status(200).json({jobs, success: false});
        
    } catch (error) {
        console.log("Error in admin jobs", error.message);
        res.status(500).json({ error: error.message });
    }
}