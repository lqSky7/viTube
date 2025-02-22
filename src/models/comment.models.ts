import { Schema, model, Document, Types } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

export interface CommentDocument extends Document {
  content: string;
  video?: Types.ObjectId;
  owner?: Types.ObjectId;
  username?: string
  createdAt?: Date;
  updatedAt?: Date;
}

const commentSchema = new Schema<CommentDocument>(
  {
    content: { type: String, required: true },
    video: { type: Schema.Types.ObjectId, ref: "Video" },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    username: {type: String, required: true}
  },
  { timestamps: true }
);

commentSchema.plugin(mongooseAggregatePaginate);

export const Comment = model<CommentDocument>("Comment", commentSchema);
