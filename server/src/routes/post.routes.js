import {Router} from "express"
import { deletePost, findPost, publishPost,random } from "../controllers/post.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import {upload} from "../middlewares/multer.middleware.js"

const router=Router()
router.use(verifyJWT)


router.route("/publish").post(
    upload.fields([
{
  name:"file",
  maxCount:1
}
    ]),verifyJWT,publishPost
)
router.route("/:postId/delete").delete(verifyJWT,deletePost)
router.route("/:postId/find").get(verifyJWT,findPost)
router.route("/random").get(verifyJWT,random)



export default router