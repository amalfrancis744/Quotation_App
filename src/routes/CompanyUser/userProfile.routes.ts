import express from "express"
import * as userProfileController from "../../controllers/CompanyUser/userProfile"

const router = express.Router()

router.get('/me/:id', userProfileController.getUserProfile)

export default router