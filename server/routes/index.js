import { Router } from 'express';
import authRouter from "./authRoutes.js"
import knockoutRouter from "./knockoutRoutes.js"
import roundRouter from "./roundRoutes.js"
import matchRouter from "./matchRoutes.js"
import teamRouter from "./teamRoutes.js"
import adminRouter from "./adminRoutes.js"
const router = Router();

router.use("/auth", authRouter)
router.use("/knockout", knockoutRouter)
router.use("/round", roundRouter)
router.use("/match", matchRouter)
router.use("/team", teamRouter)
router.use("/admin", adminRouter)

export default router;