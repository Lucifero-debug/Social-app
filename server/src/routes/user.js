import {Router} from "express"
import { registerUser,loginUser, logoutUser, addLike, toggleFollow, findUser, addBio, random, getUserForSidebar, addStories, getStories, getNotification,getUserNotification} from "../controllers/user.controller.js"
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router= Router()

router.route("/register").post(
    upload.fields([
     {
        name:"avatar",
        maxCount:1
     },
     {
        name:"coverImage",
        maxCount:1
     }
    ]),
    registerUser
    )
    router.route("/login").post(loginUser)
    router.route("/logout").post(logoutUser)
    router.route("/:postId/like").post(verifyJWT,addLike)
    router.route("/:userId/follow").post(verifyJWT,toggleFollow)
    router.route("/:userId/find").get(verifyJWT,findUser)
    router.route("/bio").post(verifyJWT,addBio)
    router.route("/random").get(verifyJWT,random)
    router.route("/fetch").get(verifyJWT,getUserForSidebar)
    router.route("/getstory/:id").get(verifyJWT,getStories)
    router.route("/:id/notification").get(verifyJWT,getNotification)
    router.route("/:id/usernoti").get(verifyJWT,getUserNotification)
 

    router.route("/story/").post(
      upload.fields([
       {
          name:"file",
          maxCount:1
       },
      ]),
      verifyJWT,
      addStories
      )

    export default router