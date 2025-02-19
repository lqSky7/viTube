import { User } from "../models/user.models";
import { Subscription } from "../models/subscriber.models";
import { errApi } from "../utils/errApi";
import { asyncHandler } from "../utils/asyncHandler";
import { apiResponse } from "../utils/responseApi";
import dotenv from "dotenv";
dotenv.config({ path: "./env" });

const toggleSubscription = asyncHandler(async (req, res) => {

  const { channel, isSubscribed } = req.body; // channel = subscribed to
  if (!channel || isSubscribed === undefined) {
    throw new errApi(401, "isSubscribed/channel not provided");
  }

  if (isSubscribed == 0) {
    try {
      const subscriber = req.user123._id;
      const subs = await Subscription.create({ subscriber, channel });
      return res
        .status(201)
        .json(
          new apiResponse(
            200,
            subs,
            true,
            "new subscription document created successfully"
          )
        );
    } catch (error) {
      throw new errApi(
        500,
        "Server side issue: couldn't create subscription model",
        error
      );
    }
  } else {
    const subscriber = req.user123._id;
    try {
      const result = await Subscription.findOneAndDelete({
        $and: [{subscriber, channel }],
      });      
      return res
        .status(201)
        .json(
          new apiResponse(
            200,
            "deleted",
            true,
            "subscription deleted successfully"
          )
        );
    } catch (error) {
      throw new errApi(
        500,
        "Something went wrong while deleting subscriber",
        error,
        ""
      );
    }
  }
});

const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channel } = req.params;  // user here refers to channel's username
  if (!channel) {
    throw new errApi(401, "channel not provided");
  }
  try {
    const user = await User.findOne({ username : channel })
    const subscribers = await Subscription.countDocuments({ channel: user._id });
    return res
      .status(201)
      .json(
        new apiResponse(
          200,
          {subscribers},
          true,
          "subscribers fetched successfully"
        )
      );
  } catch (error) {
    throw new errApi(500, "Server side issue: couldn't fetch subscribers", error);
  }
});

const getSubscribedChannels = asyncHandler(async (req,res) => {
  const user = req.user123._id;
  try {
    const allSubscribedChannels = await Subscription.find({subscriber: user})
    return res.status(201).json(new apiResponse(201, allSubscribedChannels, true, "successful"))
  } catch (error) {
    throw new errApi(500, "Something went wrong while fetching all subscribed channels", [], "")
  }
})

export { toggleSubscription, getUserChannelSubscribers , getSubscribedChannels };
