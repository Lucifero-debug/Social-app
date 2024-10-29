import {Router} from "express"
import { verifyJWT } from "../src/middlewares/auth.middleware.js"
import { addComment,find,likeComment } from "../src/controllers/comment.controller.js"

const router=Router()
router.use(verifyJWT)

router.route("/:postId/add").post(verifyJWT,addComment)
router.route("/:commentId/like").post(verifyJWT,likeComment)
router.route("/:commentId/find").get(verifyJWT,find)


export default router