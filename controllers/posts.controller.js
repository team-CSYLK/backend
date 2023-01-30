require('dotenv').config();
const PostsService = require('../services/posts.service');
const aws = require('aws-sdk');

class PostsController {
  postsService = new PostsService();

  // 게시글 작성 v
  createPosts = async (req, res, next) => {
    const { postContent } = req.body;
    // const { userId } = res.locals.user;
    const userId = res.locals.userId;

    try {
      const imageUrl = req.files[0].transforms[0].location;

      await this.postsService.createPost(imageUrl, userId, postContent);
      res.status(200).json({ msg: '이미지 업로드 완료!', postimg: imageUrl });
    } catch (error) {
      next(error);
    }
  };

  // 전체 게시글 조회 v
  readPost = async (req, res) => {
    try {
      const allPosts = await this.postsService.findAllPost();
      return res.status(200).json({ data: allPosts });
    } catch (error) {
      return res
        .status(error.status || 400)
        .send({ ok: false, message: error.message });
    }
  };

  // 특정 게시글 조회 v
  detailPost = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;
      const onePosts = await this.postsService.findOnePost(postId, userId);
      return res.status(200).json({ post: onePosts });
    } catch (error) {
      return res
        .status(error.status || 400)
        .send({ ok: false, message: error.message });
    }
  };

  // 게시글 수정 v
  updatePost = async (req, res) => {
    try {
      const { postId } = req.params;
      const { postContent } = req.body;
      console.log('확인',postContent)
      await this.postsService.updatePost(postId, postContent);
      res.sendStatus(201);
    } catch (error) {
      return res
        .status(error.status || 400)
        .send({ ok: false, message: error.message });
    }
  };

  // 게시글 삭제 v
  deletePost = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;

      const findPost = await this.postsService.findAuthor(postId);
      const findkey = findPost.imageUrl.split('/')[4];
      const keyinfo = `posts-image/${findkey}`;
      // console.log(findkey);

      if (userId !== findPost.userId) {
        return res.status(400).json({ errorMessage: '권한이 없습니다.' });
      }

      const s3 = new aws.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
      });

      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: keyinfo,
      };

      s3.deleteObject(params, function (err, data) {
        if (err) {
          // console.log(err, err.stack);
        } else {
          res.status(200);
        }
      });

      await this.postsService.deletePosts(postId, userId);
      res.status(200).send({ ok: true, msg: '게시글이 삭제되었습니다' });
    } catch (error) {
      res
        .status(error.status || 400)
        .send({ ok: false, message: error.message });
    }
  };

  //게시글 좋아요 v
  likePost = async (req, res) => {
    try {
      const { postId } = req.params;
      const { userId } = res.locals.user;
      const { isLiked } = req.body;
      await this.postsService.likeEvent(postId, userId, isLiked);
      return res.sendStatus(204);
    } catch (error) {
      return res
        .status(error.status || 400)
        .send({ ok: false, message: error.message });
    }
  };
}

module.exports = PostsController;
