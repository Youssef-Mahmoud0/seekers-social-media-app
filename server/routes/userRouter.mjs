import { Router } from "express";
import userController from '../controllers/userController.mjs';
import { uploadProfilePicture } from '../middlewares/mediaUpload.mjs';

const router = Router();

// Route to handle profile picture upload
router.post('/upload-profile-picture', uploadProfilePicture.single('profilePicture'), userController.uploadProfilePicture);


export default router;