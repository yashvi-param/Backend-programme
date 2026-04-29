import express from "express";
import auth from "../middleware/auth.js"
import providerController from "../controller/providerController.js";
import checkRole from "../middleware/checkRole.js";


const router = express.Router()


router.post("/registerAsProvider", auth , providerController.registerProvider)

router.get("/getProviders", auth, checkRole("admin", "super_admin"), providerController.getProvider)

router.get("/updateProvider", auth, checkRole("admin",  "super_admin"), providerController.updateProvider)

router.get("/deleteProvider", auth, checkRole("admin ", "super_admin"), providerController.deleteProvider)

router.get("/getProviderBooking", auth, checkRole("admin", "super_admin "), providerController.getProviderBooking)

export default router;