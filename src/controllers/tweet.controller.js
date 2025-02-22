import { User } from "../models/user.models";
import { Tweet } from "../models/tweet.models";
import { errApi } from "../utils/errApi";
import { asyncHandler } from "../utils/asyncHandler";
import { apiResponse } from "../utils/responseApi";

const createTweet = asyncHandler(async (req, res) => {
  const owner = req.authorizedUser._id;
  const username = req.authorizedUser.username;
  const { content } = req.body;
  if (content == undefined) {
    throw new errApi(401, "Tweet content not provided");
  }

  try {
    const tweet = await Tweet.create({ content, owner, username });
    return res
      .status(200)
      .json(new apiResponse(201, tweet, true, "Tweet created successfully"));
  } catch (error) {
    throw new Error(error);
  }
});

const getUserTweets = asyncHandler(async (req, res) => {
  const { username } = req.params;
  try {
    const tweet = await Tweet.find({ username });
    return res
      .status(200)
      .json(new apiResponse(201, { tweet }, true, "user tweets fetched"));
  } catch (error) {
    throw new errApi(
      401,
      "Given user does not have any tweets" + error,
      error,
      ""
    );
  }
});

const updateTweet = asyncHandler(async (req, res) => {
  const { content, tweetId } = req.body;
  if (content == undefined || tweetId == undefined) {
    throw new errApi(401, "Tweet content not provided");
  }
  try {
    const tweet = await Tweet.findByIdAndUpdate(
      tweetId,
      { content },
      { new: true }
    );
    return res
      .status(200)
      .json(new apiResponse(201, tweet, true, "Tweet updated successfully"));
  } catch (error) {
    throw new Error(error);
  }
});

const deleteTweet = asyncHandler(async (req, res) => {
  const { tweetId } = req.body;
  if (tweetId == undefined) {
    throw new errApi(401, "Tweet content not provided");
  }
  try {
    const tweet = await Tweet.findByIdAndDelete(tweetId);
    return res
      .status(200)
      .json(new apiResponse(201, tweet, true, "Tweet deleted successfully"));
  } catch (error) {
    throw new Error(error);
  }
});

export { createTweet, getUserTweets, updateTweet, deleteTweet };
