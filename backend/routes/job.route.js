import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { adminJobs, deleteJob, getAdminJobById, getAllJobs, getJobById, postJob, updateJob } from "../controllers/job.controller.js";
import { singleUpload } from "../middleware/multer.js";



const router = express.Router();

router.route("/post").post(isAuthenticated,postJob);
router.route("/get").get(getAllJobs);
router.route("/get/:id").get(isAuthenticated,getJobById);
router.route("/getAdminJobs").get(isAuthenticated,adminJobs);
router.route("/getAdminJobs/:id").get(isAuthenticated,getAdminJobById);
router.route("/update/:id").put(isAuthenticated,singleUpload,updateJob);
router.route("/delete/:id").delete(isAuthenticated,deleteJob);

export default router;