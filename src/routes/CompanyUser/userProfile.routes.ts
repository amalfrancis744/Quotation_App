import express from "express"
import * as userProfileController from "../../controllers/CompanyUser/userProfile"

const router = express.Router()

router.get('/me', userProfileController.getUserProfile) // get user profile data

export default router