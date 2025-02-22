import { User } from "../models/user.models";
import { Tweet } from "../models/tweet.models";
import { errApi } from "../utils/errApi";
import { asyncHandler } from "../utils/asyncHandler";
import { apiResponse } from "../utils/responseApi";

const createTweet = asyncHandler(async(req, res) => {
    const owner = req.authorizedUser._id;
    const username = req.authorizedUser.username;
    const {content} = req.body;
    if(content == undefined){
        throw new errApi(401, "Tweet content not provided")
    }

    try {
        const tweet = await Tweet.create({content, owner, username});
        return res.status(200).json(new apiResponse(201, tweet, true, "Tweet created successfully"))
    } catch (error) {
        throw new Error(error)
    }

})

const getUserTweets = asyncHandler(async(req,res) => {
    const user = req.params;
    // const tweet = 
})

export { createTweet }