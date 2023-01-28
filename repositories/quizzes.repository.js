const { number } = require('joi');
const { sequelize } = require('../models');

class QuizzesRepository {
  //* 의존성 주입
  constructor(QuizzesModel, MembersModel, QuizLikesModel) {
    //* Model
    this.quizzesModel = QuizzesModel;
    this.membersModel = MembersModel;
    this.quizLikesModel = QuizLikesModel;
  }

  //* nickname을 얻기 위해 사용.
  //* mId를 이용하여 Member의 정보를 받아오기.
  findMemberBymId = async (mId) => {
    //* Member의 정보를 받아 오기 때문에 membersModel을 사용.
    const memberData = await this.membersModel.findByPk(mId);
    return memberData;
  };

  //* 퀴즈 데이터 DB에 생성하기.
  createQuiz = async (mId, title, content, answer) => {
    const createQuizData = await this.quizzesModel.create({
      mId,
      title,
      content,
      answer,
    });

    return createQuizData;
  };

  getAllQuizzes = async () => {
    // const allQuizzesData = await this.quizzesModel.findAll({
    //   attributes: [
    //     'qId',
    //     'title',
    //     [sequelize.fn('COUNT', sequelize.col('QuizLike.likeStatus')), 'likes'],
    //     [
    //       sequelize.fn('COUNT', sequelize.col('QuizLike.likeStatus')),
    //       'dislikes',
    //     ],
    //   ],
    //   include: [
    //     {
    //       where: { likeStatus: true },
    //       model: this.quizLikesModel,
    //       attributes: ['likeStatus'],
    //     },
    //     {
    //       where: { likeStatus: false },
    //       model: this.quizLikesModel,
    //       attributes: ['likeStatus'],
    //     },
    //   ],
    //   required: true,
    //   group: ['Quiz.qId'],
    // });
    const [allQuizzesData, metaData] = await sequelize.query(
      `select Quizzes.qId, Quizzes.title, Members.nickname,
    count(case when likeStatus = 1 then 1 end) as 'like',
    count(case when likeStatus = 0 then 1 end) as 'unlike'
    from Quizzes
    left join QuizLikes
    on Quizzes.qId = QuizLikes.qId
    left join Members
    on Quizzes.mId = Members.mId
    group by Quizzes.qId
    `
    );
    return allQuizzesData;
  };

  getQuiz = async (qId) => {
    // const quizData = await this.quizzesModel.findByPk(qId);
    const [quizData, metaData] = await sequelize.query(
      `select Quizzes.qId, Quizzes.title, Quizzes.content, Members.nickname,
    count(case when likeStatus = 1 then 1 end) as 'like',
    count(case when likeStatus = 0 then 1 end) as 'unlike'
    from Quizzes
    left join Members
    on Quizzes.mId = Members.mId
    left join QuizLikes
    on Quizzes.qId = QuizLikes.qId where Quizzes.qId = ${qId}
    `
    );
    return quizData;
  };

  updateQuiz = async (qId, title, content, answer) => {
    return await this.quizzesModel.update(
      { title, content, answer },
      { where: { qId } }
    );
  };

  deleteQuiz = async (qId) => {
    return await this.quizzesModel.destroy({ where: { qId } });
  };

  findLike = async (qId, mId) => {
    return await this.quizLikesModel.findOne({ where: { qId, mId } });
  };

  deleteLike = async (qLId) => {
    return await this.quizLikesModel.destroy({ where: { qLId } });
  };

  updateLike = async (qLId, likeStatus) => {
    console.log(qLId, likeStatus);
    return await this.quizLikesModel.update(
      { likeStatus },
      { where: { qLId } }
    );
  };

  createLike = async (qId, mId, likeStatus) => {
    const aaa = await this.quizLikesModel.create({
      qId,
      mId,
      likeStatus,
    });
    return aaa;
  };
}

module.exports = QuizzesRepository;
