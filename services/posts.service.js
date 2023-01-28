const PostRepository = require('../repositories/posts.repository');
const { posts } = require('../routes');

class PostsService {
  postsRepository = new PostRepository();

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
        image: posts.image,
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

  // 게시글 수정
  updatePost = async (postId, postContent, image) => {
    const findPost = await this.postRepository.findOnePost(postId)

    if(findPost.userId == Users.userId){
        await this.postRepository.updatePost({postId, postContent, image});
        return ;
    } 
  };

  // 게시글 삭제
  deletePosts = async (postId, Users) => {
    const findPost = await this.postRepository.findOnePost(postId)

    if(findPost.userId == Users.userId){
      await this.postRepository.deletePost(postId);
      return ;
      }
  };

  // 게시글 좋아요
  // likeEvent = async () => {};
}

module.exports = PostsService;
