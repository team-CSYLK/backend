const PostsRepository = require('../repositories/posts.repository');
require('dotenv').config();
const aws = require('aws-sdk');

const error = new Error();
const success = {};
error.status = 400;

class PostsService {
  postsRepository = new PostsRepository();

  // 게시글 작성
  createPost = async (imageUrl, userId, postContent, place) => {
    try {
      if (!imageUrl || !postContent) {
        error.status = 412;
        error.message = {
          statusCode: 412,
          errorMessage: '내용 및 이미지를 입력하세요.',
        };
        throw error;
      }
      const createPostData = await this.postsRepository.createPost(
        imageUrl,
        userId,
        postContent,
        place
      );

      success.status = 201;
      success.message = {
        statusCode: 201,
        message: '게시글 작성에 성공했습니다.',
      };
      return success;
    } catch (error) {
      return error;
    }
  };

  // 전체 게시글 조회
  findAllPost = async (userId) => {
    const getAllPost = await this.postsRepository.findAllPost(userId);
    try {
      console.log(getAllPost);
      const data = getAllPost.map((post) => {
        return {
          postId: post.postId,
          userId: post.userId,
          nickname: post.nickname,
          imageProfile: post.imageProfile,
          imageUrl: post.imageUrl,
          postContent: post.postContent,
          likes: post.likes,
          isLiked: userId !== post.likeUserId ? false : true,
          place: post.place,
          createdAt: post.createdAt,
        };
      });

      success.status = 200;
      success.message = { statusCode: 200, data: data };
      return success;
    } catch (error) {
      return error;
    }
  };

  // 특정 게시글 조회
  findOnePost = async (postId, userId) => {
    const postOne = await this.postsRepository.findOnePost(postId);
    const userLiked = await this.postsRepository.findOndeLike(postId, userId);
    let isLiked = false;
    const comments = await this.postsRepository.findAllComm(postId);

    if (userLiked) {
      isLiked = true;
    } else {
      isLiked = false;
    }

    const data = [
      {
        post: {
          userId: postOne.userId,
          nickname: postOne.User.nickname,
          imageProfile: postOne.User.imageProfile,
          likes: postOne.likes,
          isLiked: isLiked,
          place: postOne.place,
          createdAt: postOne.createdAt,
        },
        comments,
      },
    ];

    success.status = 200;
    success.message = { statusCode: 200, data: data };
    return success;
  };

  //게시글 작성자 찾기
  findAuthor = async (postId) => {
    return await this.postsRepository.findAuthor(postId);
  };

  // 게시글 수정
  updatePost = async (postId, postContent, imageUrl) => {
    try {
      if (!postContent) {
        error.status = 412;
        error.message = {
          statusCode: 412,
          errorMessage: '내용을 입력하세요.',
        };
        throw error;
      }

      const findPost = await this.postsRepository.findAuthor(postId);
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
          error.status = 400;
          error.message = {
            statusCode: 400,
            errorMessage: '삭제 및 수정에 실패했습니다.',
          };
        } else {
        }
      });

      await this.postsRepository.updatePost(postId, postContent, imageUrl);

      success.status = 200;
      success.message = {
        statusCode: 200,
        message: '게시글 수정에 성공했습니다.',
      };
      return success;
    } catch (error) {
      return error;
    }
  };

  // 게시글 삭제
  deletePosts = async (postId, userId) => {
    const findPost = await this.postsRepository.findOnePost(postId);
    if (findPost.userId !== userId) {
      error.status = 403;
      error.message = {
        statusCode: 403,
        errorMessage: '삭제 권한이 없습니다.',
      };
      throw error;
    }
    await this.postsRepository.deletePost(postId);
    success.status = 200;
    success.message = {
      statusCode: 200,
      message: '게시글 삭제에 성공했습니다.',
    };
    return success;
  };
  //*좋아요 찾기
  findLike = async ({ userId, postId }) => {
    console.log(userId, postId);
    const like = await this.postsRepository.findLike({ userId, postId });
    return like;
  };
  //*좋아요
  createLike = async ({ userId, postId }) => {
    console.log(userId, postId);
    const like = await this.postsRepository.findLike({ userId, postId });
    if (!like) {
      await this.postsRepository.createLike({ userId, postId });
      await this.postsRepository.upLike({ postId });
    }
    success.status = 201;
    success.message = {
      statusCode: 201,
      message: '좋아요에 성공했습니다.',
    };
    return success;
  };
  //*좋아요 취소
  destroyLike = async ({ userId, postId }) => {
    console.log(userId, postId);
    const like = await this.postsRepository.findLike({ userId, postId });
    if (like) {
      await this.postsRepository.destroyLike({ userId, postId });
      await this.postsRepository.downLike({ postId });
    }
    success.status = 201;
    success.message = {
      statusCode: 201,
      message: '좋아요를 취소했습니다.',
    };
    return success;
  };
  //*좋아요 카운트
  likeCount = async ({ postId }) => {
    console.log(postId);
    let likeCount = await this.postsRepository.likeCount({ postId });
    likeCount = likeCount.likes;
    return likeCount;
  };
}

module.exports = PostsService;
