import { Schema, model, Document, Types } from "mongoose";

export interface TweetDocument extends Document {
  content: string;
  owner?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const tweetSchema = new Schema<TweetDocument>(
  {
    content: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Tweet = model<TweetDocument>("Tweet", tweetSchema);
