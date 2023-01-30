const { Users, Posts, Comments, Likes } = require('../models');

class PostRepository {
  // 게시글 전체 조회
  findAllPost = async () => {
    const allPost = await Posts.findAll({
      include: [{ model: Users }, { model: Likes }],
    });

    return allPost;
  };

  // 게시글 상세 조회
  findOnePost = async (postId, userId) => {
    const postsOne = await Posts.findOne({
      where: { postId },
      include: [
        {
          model: Users,
        },
        {
          model: Likes,
        },
        {
          model: Comments,
          include: [
            { model: Users },
            { model: Likes, where: { userId: userId }, required: false },
          ],
        },
      ],
    });
    console.log(postsOne);
    return postsOne;
  };

  // 게시글 수정
  updatePost = async ({ postId, postContent, image }) => {
    await Posts.update(
      { postContent: postContent, image: image },
      { where: { postId: postId } }
    );
    return;
  };

  //게시글 삭제
  deletePosts = async (postId) => {
    const deletePost = Posts.destroy({
      where: { postId },
    });

    return deletePost;
  };

  //게시글 업로드
  createPost = async (imageUrl, userId, postContent, place) => {
    const createPost = await Posts.create({
      imageUrl,
      userId,
      postContent,
      place,
    });
    return createPost;
  };

  //게시글 좋아요
}

module.exports = PostRepository;
