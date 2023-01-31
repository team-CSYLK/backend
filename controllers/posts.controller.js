require('dotenv').config();
const PostsService = require('../services/posts.service');
const aws = require('aws-sdk');

class PostsController {
  postsService = new PostsService();

  // 게시글 작성 v
  createPosts = async (req, res, next) => {
    const { postContent, place } = req.body;
    const userId = res.locals.userId;

    const imageUrl = req.files[0].transforms[0].location;

    const uploadPost = await this.postsService.createPost(
      imageUrl,
      userId,
      postContent,
      place
    );
    return res.status(uploadPost.status || 400).json(uploadPost.message);
  };

  // 전체 게시글 조회 v
  readPost = async (req, res) => {
    const userId = res.locals.userId;

    const allPosts = await this.postsService.findAllPost(userId);
    return res.status(allPosts.status || 400).json(allPosts.message);
  };

  // 특정 게시글 조회 v
  detailPost = async (req, res) => {
    const userId = res.locals.userId;
    const { postId } = req.params;
    const onePosts = await this.postsService.findOnePost(postId, userId);

    return res.status(onePosts.status || 400).json(onePosts.message);
  };

  // 게시글 수정 v
  updatePost = async (req, res) => {
    try {
      const { postId } = req.params;
      const { postContent } = req.body;
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
    const userId = res.locals.userId;
    const { postId } = req.params;

    try {
      const findPost = await this.postsService.findAuthor(postId);
      const findkey = findPost.imageUrl.split('/')[4];
      const keyinfo = `posts-image/${findkey}`;

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
        } else {
          res.status(200);
        }
      });
      const deletePost = await this.postsService.deletePosts(postId, userId);
      return res.status(deletePost.status || 400).json(deletePost.message);
    } catch (error) {
      return error;
    }
  };

  //게시글 좋아요 v
  liketoggle = async (req, res, next) => {
    try {
      const userId = res.locals.userId;
      const { postId } = req.params;

      if (!userId || !postId) {
        throw new InvalidParamsError('잘못된 요청입니다.');
      }
      const findLike = await this.postsService.findLike({ userId, postId });
      if (!findLike) {
        const createLike = await this.postsService.createLike({
          userId,
          postId,
        });
        const likeCount = await this.postsService.likeCount({ postId });
        return res
          .status(201)
          .json({ createLike, data: likeCount, msg: '좋아요 등록완료' });
      }
      if (findLike) {
        const destroyLike = await this.postsService.destroyLike({
          userId,
          postId,
        });
        const likeCount = await this.postsService.likeCount({ postId });
        return res
          .status(200)
          .json({ destroyLike, data: likeCount, msg: '좋아요 등록취소' });
      }
    } catch (error) {
      next(error);
    }
  };
}

module.exports = PostsController;
