import { Router } from 'express';
const router = Router();
import authRouter from "./authRoutes.js"
import leagueRouter from "./leagueRoutes.js"
import roundRouter from "./roundRoutes.js"
import matchRouter from "./matchRoutes.js"
import teamRouter from "./teamRoutes.js"
import adminRouter from "./adminRoutes.js"

router.use("/auth", authRouter)
router.use("/league", leagueRouter)
router.use("/round", roundRouter)
router.use("/match", matchRouter)
router.use("/team", teamRouter)
router.use("/admin", adminRouter)

export default router;