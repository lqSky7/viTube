import { Comment } from "../models/comment.models";
import { errApi } from "../utils/errApi";
import { asyncHandler } from "../utils/asyncHandler";
import { apiResponse } from "../utils/responseApi";

const createcomment = asyncHandler(async (req, res) => {
  const owner = req.authorizedUser._id;
  const username = req.authorizedUser.username;
  const { content, video } = req.body;
  if (content == undefined) {
    throw new errApi(401, "comment content not provided");
  }

  try {
    const comment = await Comment.create({ content, owner, username, video });
    return res
      .status(200)
      .json(new apiResponse(201, comment, true, "comment created successfully"));
  } catch (error) {
    throw new Error(error);
  }
});

const getVideocomments = asyncHandler(async (req, res) => {
  // TODO: aggregate paginate, sort according to likes, and return in pages
  const { video }  = req.params;
  try {
    const comment = await Comment.find({ video });
    return res
      .status(200)
      .json(new apiResponse(201, { comment }, true, "user comments fetched"));
  } catch (error) {
    throw new errApi(
      401,
      "Given user does not have any comments" + error,
      error,
      ""
    );
  }
});

const updatecomment = asyncHandler(async (req, res) => {
  const { content, commentId } = req.body;
  if (content == undefined || commentId == undefined) {
    throw new errApi(401, "comment content not provided");
  }
  try {
    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { content },
      { new: true }
    );
    return res
      .status(200)
      .json(new apiResponse(201, comment, true, "comment updated successfully"));
  } catch (error) {
    throw new Error(error);
  }
});

const deletecomment = asyncHandler(async (req, res) => {
  const { commentId } = req.body;
  if (commentId == undefined) {
    throw new errApi(401, "comment content not provided");
  }
  try {
    const comment = await Comment.findByIdAndDelete(commentId);
    return res
      .status(200)
      .json(new apiResponse(201, comment, true, "comment deleted successfully"));
  } catch (error) {
    throw new Error(error);
  }
});

export { createcomment, getVideocomments, updatecomment, deletecomment };
