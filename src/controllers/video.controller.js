import { Video } from "../models/video.models";
import { errApi } from "../utils/errApi";
import { asyncHandler } from "../utils/asyncHandler";
import { apiResponse } from "../utils/responseApi";
import { uppToCloudinary } from "../utils/cloudinary";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const uploadVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    throw new errApi(401, "Video title not provided");
  }
  if (!req.file) {
    throw new errApi(401, "video file is required");
  }

  try {
    const videoLocalPath = req.file?.path;

    const videoUploadResponse = await uppToCloudinary(videoLocalPath);

    if (!videoUploadResponse) {
      throw new errApi(500, "Failed to upload video to cloudinary");
    }

    const video = await Video.create({
      title,
      description,
      videoFile: videoUploadResponse.url,
      duration: videoUploadResponse.duration || 0,
      owner: req.authorizedUser._id,
    });

    return res
      .status(200)
      .json(
        new apiResponse(
          201,
          { video },
          true,
          "Video document created successfully!"
        )
      );
  } catch (error) {
    throw new errApi(
      500,
      "Something went wrong while uploading video: " + error.message
    );
  }
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.body;
  const owner = req.authorizedUser._id;
  if (!videoId) {
    throw new errApi(401, "Video Id not provided", [], "");
  }
  try {
    const delResponse = await Video.findOneAndDelete({
      $and: [{ owner }, { _id: videoId }],
    });
    return res
      .status(200)
      .json(
        new apiResponse(
          201,
          { delResponse },
          true,
          "Video found and deleted successfully..."
        )
      );
  } catch (error) {
    throw new errApi(403, "Video does not exist or server issue", [], "");
  }
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if (!videoId) {
    throw new errApi(401, "Video Id not provided", [], "");
  }
  try {
    const getVideoResponse = await Video.findByIdAndUpdate(
      videoId,
      { $inc: { views: 1 } },
      { new: true }
    ); //TODO: setup a cron job to update views
    return res
      .status(200)
      .json(
        new apiResponse(
          201,
          { getVideoResponse },
          true,
          "Video fetched successfully"
        )
      );
  } catch (error) {
    throw new errApi(401, "Video does not exist on server", [], "");
  }
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.body;
  const owner = req.authorizedUser._id;
  
  if (!videoId) {
    throw new errApi(401, "Video Id not provided", [], "");
  }
  try {
    const toggleRes = await Video.findOneAndUpdate(
      {
        $and: [{ owner }, { _id: videoId }],
      },
      [{ $set: { isPublished: { $not: "$isPublished" } } }],
      { new : true }
    );

    return res
      .status(200)
      .json(
        new apiResponse(
          201,
          { toggleRes },
          true,
          "togglePublishStatus executed successfully..."
        )
      );
  } catch (error) {
    throw new errApi(403, "Video does not exist or server issue", [], "");
  }
});

const getUserFeed = asyncHandler(async (req, res) => {
  const { page, query, sortBy, sortType, userId } = req.query

// create an aggregate query: without await (https://stackoverflow.com/questions/77414445/mongoose-aggregate-pagination-v2-aggregatepagination-isnt-working-properly)
// then use aggregate paginate with await. 
const matchStage = {isPublished: true}  // generate feed only from published videos!
if(userId){matchStage._id = userId}
if(query){matchStage.title = {$search : query}}

const aggregateQuery = Video.aggregate([{$match: matchStage}]);

  const paginateOptions = {
    page: parseInt(page) || 1,
    limit: 2,
    sort: { [sortBy || "createdAt"]: sortType === "asc" ? 1 : -1 }
  }

try {
  const result = await Video.aggregatePaginate(aggregateQuery,paginateOptions);
  return res.status(200).json(new apiResponse(201, {result}, true, "requried feed fetched successfully"))
} catch (error) {
  throw new Error(error)
}
  
})

export { uploadVideo, deleteVideo, getVideoById , togglePublishStatus , getUserFeed};
