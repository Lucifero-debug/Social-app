import {Router} from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { sendMessage,getMessages, getUserConversation, getMessage } from "../controllers/message.controller.js"


const router=Router()
router.use(verifyJWT)

router.route("/send/:id").post(verifyJWT,sendMessage)
router.route("/get/:id").get(verifyJWT,getMessages)
router.route("/get").get(verifyJWT,getUserConversation)
router.route("/:textId/text").get(verifyJWT,getMessage)

export default router