import { Schema, model, Document, Types } from "mongoose";

export interface PlaylistDocument extends Document {
  name: string;
  description?: string;
  videos?: Types.ObjectId[];
  owner?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const playlistSchema = new Schema<PlaylistDocument>(
  {
    name: { type: String, required: true },
    description: { type: String },
    videos: [{ type: Schema.Types.ObjectId, ref: "Video" }],
    owner: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Playlist = model<PlaylistDocument>("Playlist", playlistSchema);
