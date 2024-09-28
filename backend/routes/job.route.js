import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { adminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";



const router = express.Router();

router.route("/post").post(isAuthenticated,postJob);
router.route("/get").get(isAuthenticated,getAllJobs);
router.route("/get/:id").get(isAuthenticated,getJobById);
router.route("/getAdminJobs").get(isAuthenticated,adminJobs);

export default router;