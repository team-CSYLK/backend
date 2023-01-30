const PostsRepository = require('../repositories/posts.repository');
const { Users } = require('../models');
const { posts } = require('../routes');

class PostsService {
  postsRepository = new PostsRepository();

  // 게시글 작성

  createPost = async (imageUrl, userId, postContent) => {
    const place = '강동구';
    const createPostData = await this.postsRepository.createPost(
      imageUrl,
      userId,
      postContent,
      place
    );
    return createPostData;
  };

  // 전체 게시글 조회
  findAllPost = async () => {
    const allPost = await this.postsRepository.findAllPost();
    // let isLiked;
    allPost.sort((a, b) => {
      return b.createAt - a.createAt;
    });
    return allPost.map((posts) => {
      // posts.Likes.length ? (isLiked = true) : (isLiked = false);
      return {
        postId: posts.postId,
        userId: posts.userId,
        postContent: posts.postContent,
        image: posts.imageUrl,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
        // isLiked: posts.isLiked,
      };
    });
  };

  // 특정 게시글 조회
  findOnePost = async (postId) => {
    const postOne = await this.postsRepository.findOnePost(postId);
    return postOne;
  };

  //게시글 작성자 찾기
  findAuthor = async (postId) => {
    return await this.postsRepository.findAuthor(postId);
  };

  // 게시글 수정
  updatePost = async (postId, postContent) => {
    console.log(postId, postContent);
    return await this.postsRepository.updatePost(postId, postContent);
  };

  // 게시글 삭제
  deletePosts = async (postId, userId) => {
    console.log(postId, Users);
    const findPost = await this.postsRepository.findOnePost(postId);
    console.log(findPost.userId, userId);
    if (findPost.userId == userId) {
      await this.postsRepository.deletePost(postId);
      return;
    }
  };

  // 게시글 좋아요
  likeEvent = async (postId, userId, isLiked) => {
    const postlike = await this.postsRepository.findLike(postId, userId);
    if (postlike) {
      if (postlike.isLiked === isLiked) {
        return await this.postsRepository.deleteLike(postlike.likeId);
      }
      return await this.postsRepository.updateLike(postlike.likeId, isLiked);
    }
    return await this.postsRepository.createLike(postId, userId, isLiked);
  };

  // likeEvent = async (postId, userId, isLiked) => {
  //   const postlike = await this.postsRepository.findLike({postId, userId});
  //   if (!postlike) {
  //     await this.postsRepository.createLike(postId, userId);
  //     return {msg : "좋아요를 누르셨습니다."}
  //   } else {
  //     await this.postsRepository.deleteLike(postId, userId);
  //     return {msg : "좋아요를 취소하셨습니다."}
  //   }
  // };
}

module.exports = PostsService;
