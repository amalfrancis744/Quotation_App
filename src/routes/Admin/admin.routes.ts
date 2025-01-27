import express from 'express'
import * as adminController from '..//../controllers/Admin/adminAuth'



const router = express.Router()

router.post('/register',adminController.registerAdmin)
router.post('/login',adminController.loginAdmin)


export default router