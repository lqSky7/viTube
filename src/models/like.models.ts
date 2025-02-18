import mongoose, { Schema, Document, Model } from "mongoose";
export interface ILike extends Document {
  video?: mongoose.Types.ObjectId;
  comment?: mongoose.Types.ObjectId;
  tweet?: mongoose.Types.ObjectId;
  likedBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
const likeSchema: Schema<ILike> = new Schema(
  {
    video: {
      type: mongoose.Types.ObjectId,
      ref: "Video",
    },
    comment: {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
    },
    tweet: {
      type: mongoose.Types.ObjectId,
      ref: "Tweet",
    },
    likedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
export const Like: Model<ILike> = mongoose.model<ILike>("Like", likeSchema);
