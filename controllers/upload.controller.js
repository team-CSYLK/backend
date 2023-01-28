const UploadService = require("../services/upload.service");

require("dotenv").config();

class UploadController {
  uploadService = new UploadService();

  // post 업로드
  createPosts = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { postContent } = req.body;
    try {
      const images = req.files;
      const values = Object.values({ images });
      const imageUrls = values[0][0].transforms[0].location;

      await this.uploadService.createPost(imageUrls, userId, postContent);
      res.status(200).json({ msg: "이미지 업로드 완료!", postimg: imageUrls });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = UploadController;
