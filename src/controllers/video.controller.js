import { User } from "../models/user.models";
import { Video } from "../models/video.models";
import { errApi } from "../utils/errApi";
import { asyncHandler } from "../utils/asyncHandler";
import { apiResponse } from "../utils/responseApi";
import { uppToCloudinary } from "../utils/cloudinary";

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
            owner: req.user123._id
        })
        
        return res.status(200).json(
            new apiResponse(201, { video }, true, "Video document created successfully!")
        )
    } catch (error) {
        throw new errApi(500, "Something went wrong while uploading video: " + error.message)
    }
});

const deleteVideo = asyncHandler(async(req, res) => {
  const {videoId} = req.body;
  const owner = req.user123._id;
  if(!videoId) {
    throw new errApi(401, "Video Id not provided", [], "")
  }
  try {
    const delResponse = await Video.findOneAndDelete(
      {
        $and: [{owner}, {_id:videoId}]
      }
    )
    return res.status(200).json(new apiResponse(201, {delResponse}, true, "Video found and deleted successfully..."))
  } catch (error) {
    throw new errApi(403, "Video does not exist or server issue", [], "")
  }
})

export { uploadVideo, deleteVideo }