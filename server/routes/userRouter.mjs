import { Router } from "express";
import userController from '../controllers/userController.mjs';
import { uploadProfilePicture } from '../middlewares/mediaUpload.mjs';

const router = Router();

// Route to handle profile picture upload
router.post('/upload-profile-picture', uploadProfilePicture.single('profilePicture'), userController.uploadProfilePicture);
router.post('/search', userController.search);
router.post('/update-bio', userController.updateBio);
router.get('/users/:userId', userController.getUserById);
export default router;