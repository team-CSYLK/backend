const PostsRepository = require('../repositories/posts.repository');

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
    const getAllPost = await this.postsRepository.findAllPost();
    const allLike = await this.postsRepository.findAllLike(userId);
    const allPost = [];
    const result = [];

    try {
      for (let i = 0; i < getAllPost.length; i++) {
        allPost.push({
          postId: getAllPost[i].postId,
          userId: getAllPost[i].userId,
          nickname: getAllPost[i].User.nickname,
          imageProfile: getAllPost[i].User.imageProfile,
          imageUrl: getAllPost[i].imageUrl,
          postContent: getAllPost[i].postContent,
          likes: getAllPost[i].likes,
          isLiked: false,
          createdAt: getAllPost[i].createdAt,
        });
      }

      for (let i = 0; i < allPost.length; i++) {
        for (let j = 0; j < allLike.length; j++) {
          if (
            allLike[j].userId === allPost[i].userId &&
            allLike[j].postId === allPost[i].postId
          )
            allPost[i].isLiked = true;
        }
      }

      success.status = 200;
      success.message = { statusCode: 200, data: allPost };
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
  updatePost = async (postId, postContent) => {
    try {
      if (!postContent) {
        error.status = 412;
        error.message = {
          statusCode: 412,
          errorMessage: '내용을 입력하세요.',
        };
        throw error;
      }
    } catch (error) {
      return error;
    }
    await this.postsRepository.updatePost(postId, postContent);

    success.status = 200;
    success.message = {
      statusCode: 200,
      message: '게시글 수정에 성공했습니다.',
    };
    return success;
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
    return like;
  };
  //*좋아요 취소
  destroyLike = async ({ userId, postId }) => {
    console.log(userId, postId);
    const like = await this.postsRepository.findLike({ userId, postId });
    if (like) {
      await this.postsRepository.destroyLike({ userId, postId });
      await this.postsRepository.downLike({ postId });
    }
    return like;
  };
  //*좋아요 카운트
  likeCount = async ({ postId }) => {
    console.log(postId);
    let likeCount = await this.postsRepository.likeCount({ postId });
    likeCount = likeCount.likes;
    return likeCount;
  };
}

// 게시글 좋아요
// likeEvent = async (postId, userId) => {
//   console.log(userId)
//   const postlike = await this.postsRepository.findLike(postId, userId);
//   if (!postlike) {
//     await this.postsRepository.createLike(postId, userId);
//     await this.postsRepository.likecount(postId);
//     return {msg : "좋아요를 누르셨습니다."}
//   } else {
//     await this.postsRepository.deleteLike(postId, userId);
//     await this.postsRepository.likediscount(postId);
//     return {msg : "좋아요를 취소하셨습니다."}
//   }

//     likeEvent = async (postId, userId, isLiked) => {
//   const postlike = await this.postsRepository.findLike(postId, userId);
//   if (postlike) {
//     if (postlike.isLiked === isLiked) {
//       return await this.postsRepository.deleteLike(postlike.likeId);
//     }
//     return await this.postsRepository.updateLike(postlike.likeId, isLiked);
//   }
//   return await this.postsRepository.createLike(postId, userId, isLiked);
// };
// };

module.exports = PostsService;
