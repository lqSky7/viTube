import { Schema, model, Document, Types } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

export interface CommentDocument extends Document {
  content: string;
  video?: Types.ObjectId;
  owner?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const commentSchema = new Schema<CommentDocument>(
  {
    content: { type: String, required: true },
    video: { type: Schema.Types.ObjectId, ref: "Video" },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

commentSchema.plugin(mongooseAggregatePaginate);

export const Comment = model<CommentDocument>("Comment", commentSchema);
