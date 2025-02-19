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

export { toggleSubscription };
