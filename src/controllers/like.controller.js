import { Like } from "../models/like.models";
import { errApi } from "../utils/errApi";
import { apiResponse } from "../utils/responseApi";
import { asyncHandler } from "../utils/asyncHandler";


const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    if(videoId == undefined){
        throw new errApi(401, "video Id not provided", "", "");
    }
    const user = req.authorizedUser._id;
    try {
        const response = await Like.create({likedBy: user, video: videoId})
        return res.status(200).json(new apiResponse(201, {response}, true, "video liked successfully"))
    } catch (error) {
        throw new errApi(401, "something went wrong", error, ""); 
    }

})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    if(commentId == undefined){
        throw new errApi(401, "Comment Id not provided", "", "");
    }
    const user = req.authorizedUser._id;
    try {
        const response = await Like.create({likedBy: user, comment: commentId})
        return res.status(200).json(new apiResponse(201, {response}, true, "Comment liked successfully"))
    } catch (error) {
        throw new errApi(401, "something went wrong", error, ""); 
    }


})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    if(tweetId == undefined){
        throw new errApi(401, "tweet Id not provided", "", "");
    }
    const user = req.authorizedUser._id;
    try {
        const response = await Like.create({likedBy: user, tweet: tweetId})
        return res.status(200).json(new apiResponse(201, {response}, true, "tweet liked successfully"))
    } catch (error) {
        throw new errApi(401, "something went wrong", error, ""); 
    }
 

}
)

const getLikedVideos = asyncHandler(async (req, res) => {
    const user = req.authorizedUser._id;
    try {
        const response = await Like.find({likedBy: user})
        return res.status(200).json(new apiResponse(201, {response}, true, "liked fetched successfully"))
    } catch (error) {
        throw new errApi(401, "something went wrong", error, ""); 
    }
})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}