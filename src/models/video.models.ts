import mongoose, { Schema, Document, Types } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

export interface VideoDocument extends Document {
  videoFile: string;
  thumbnail?: string;
  title: string;
  description?: string;
  duration: number;
  views?: number;
  isPublished: boolean;
  owner?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const videoSchema = new Schema<VideoDocument>(
  {
    videoFile: { type: String, required: true },
    thumbnail: { type: String, required: false },
    title: { type: String, required: true },
    description: { type: String, required: false },
    duration: { type: Number, required: true },
    views: { type: Number, default: 0 },
    isPublished: { type: Boolean, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model<VideoDocument>("Video", videoSchema);
