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
        {
          model: Likes,
        },
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
      likes:0,
      place,
    });
    return createPost;
  };

  //*좋아요 데이터 찾기
  findLike = async ({ userId, postId }) => {
    const findLike = await Likes.findOne({ where: { userId, postId } });
    return findLike;
  };
  //*좋아요 만들기
  createLike = async ({ userId, postId }) => {
    const createLike = await Likes.create({ userId, postId });
    return createLike;
  };
  //*좋아요 취소
  destroyLike = async ({ userId, postId }) => {
    const destroyLike = await Likes.destroy({ where: { userId, postId } });
    return destroyLike;
  };
  //*좋아요 on
  upLike = async ({ postId }) => {
    const upLike = await Posts.increment(
      { likes: 1 },
      { where: { postId } }
    );
    return upLike;
  };
  //*좋아요off
  downLike = async ({ postId }) => {
    const downLike = await Posts.increment(
      { likes: -1 },
      { where: { postId } }
    );
    return downLike;
  };
  //*좋아요 count 가져오기
  likeCount = async ({ postId }) => {
    const likeCount = await Posts.findOne({ where: { postId } });
    return likeCount;
  };


}

module.exports = PostsRepository;