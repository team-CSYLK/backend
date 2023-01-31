const { Users, Posts, Comments, Likes } = require('../models');

class PostsRepository {
  // 게시글 전체 조회
  findAllPost = async () => {
    const allPost = await Posts.findAll({
      include: [{ model: Users }],
    });

    console.log(allPost);

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
        // {
        //   model: Likes,
        // },
        //   {
        //     model: Comments,
        //     include: [
        //       { model: Users },
        //       { model: Likes, where: { userId: userId }, required: false },
        //     ],
        //   },
      ],
    });
    // console.log(postsOne);
    return postsOne;
  };

  // 게시글 작성자 찾기
  findAuthor = async (postId) => {
    return await Posts.findByPk(postId);
  };

  // 게시글 수정
  updatePost = async (postId, postContent) => {
    console.log(postId, postContent);
    await Posts.update({ postContent }, { where: { postId } });
    return;
  };

  //게시글 삭제
  deletePost = async (postId) => {
    console.log(postId);
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
  findLike = async (postId, userId) => {
    const findLike = await Likes.findOne({ where: { postId, userId } });
    return findLike;
  };

  deleteLike = async (postId, userId) => {
    const deleteLike = await Likes.delete({ where: { postId, userId } });
    return deleteLike;
  };

  updateLike = async (postId) => {};

  createLike = async (postId, userId) => {
    const createLike = await Likes.create({ userId, postId });
    return createLike;
  };
}

module.exports = PostsRepository;
