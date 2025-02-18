import mongoose, { Document, Schema, model } from "mongoose";

interface ISubscription extends Document {
  subscriber: mongoose.Types.ObjectId;
  channel: mongoose.Types.ObjectId;
}

const subscriptionSchema = new Schema<ISubscription>(
  {
    subscriber: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    channel: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Subscription = model<ISubscription>(
  "Subscription",
  subscriptionSchema
);
