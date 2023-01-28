const QuizzesRepository = require('../repositories/quizzes.repository');
const { Quiz, Member, QuizLike } = require('../models');
const { NotFound } = require('../helper/http.exception.helper');
class QuizzesService {
  quizzesRepository = new QuizzesRepository(Quiz, Member, QuizLike);

  //* 토큰 검증 구현후 mId 파라미터 삭제하기.
  createQuiz = async (mId, title, content, answer) => {

    return await this.quizzesRepository.createQuiz(mId, title, content, answer);
  };


  getAllQuizzes = async () => {
    return await this.quizzesRepository.getAllQuizzes();
  };


  getQuiz = async (qId) => {
    return await this.quizzesRepository.getQuiz(qId);
  };

  updateQuiz = async (qId, title, content, answer) => {

    const updateQuizData = await this.quizzesRepository.updateQuiz(
      qId,
      title,
      content,
      answer
    );

    //* DB에 없는 데이터에 수정 명령을 내린 상황. 404
    //* update의 경우에는 수정된 내용의 개수를 배열로 반환한다.
    //* 1개 수정시 : [ 1 ] 을 반환한다.
    //* 0개 수정시 : [ 0 ] 을 반환한다.
    if (updateQuizData < 1) {
      throw new NotFound('게시글이 정상적으로 수정되지 않았습니다.');
    }
  };

  deleteQuiz = async (qId) => {
    const deleteQuizData = await this.quizzesRepository.deleteQuiz(qId);

    //* DB에 없는 데이터에 삭제 명령을 내린 상황. 404
    //* delete의 경우에는 수정된 내용의 개수를 배열로 반환한다.
    //* 1개 삭제시 : [ 1 ] 을 반환한다.
    //* 0개 삭제시 : [ 0 ] 을 반환한다.
    if (deleteQuizData < 1) {
      throw new NotFound('게시글이 정상적으로 삭제되지 않았습니다.');
    }
  };

  likeEvent = async (qId, mId, likeStatus) => {
    //* 좋아요, 싫어요 요청 받을 경우 qId와 mId를 이용하여
    //* qlike( quizLike 테이블의 정보.)를 받아온다.
    const qlike = await this.quizzesRepository.findLike(qId, mId);
    // console.log(likeStatus, qlike.likeStatus);

    //* 분기 1.
    //* qlike를 정상적으로 받아온 경우.
    //* 좋아요 혹은 싫어요를 이미 한 상태 이기 떄문에
    //* qlike.likestatus( 좋아요를 했는지 싫어요를 했는지를 나타내는 Boolean 타입의 Column)
    //* 를 받아와서 사용자가 요청한 likestatus( 사용자가 좋아요를 눌럿는지 싫어요를 눌럿는지 나타내는 Boolean 타입의 변수).
    //* 와 비교하여 분기처리.
    if (qlike) {
      //* 분기1 - 1. qlike.likestatus === likestatus
      //* 이미 좋아요, 혹은 싫어요를 누른 상태에서 다시 한번 좋아요, 혹은 싫어요를 눌럿기 때문에
      //* 해당 데이터를 destroy한다.
      if (qlike.likeStatus === likeStatus) {
        return await this.quizzesRepository.deleteLike(qlike.qLId);
      }
      //* 분기1 - 2. qlike.likestatus !== likestatus
      //* 좋아요를 이미 누른 상태에서 싫어요를 누른 상황이거나 그 반대인 상황 이기떄문에
      //* 해당 데이터를 likestatus로 update 한다.
      console.log(likeStatus);
      return await this.quizzesRepository.updateLike(qlike.qLId, likeStatus);
    }
    //* 분기 2.
    //* qlId를 정상적으로 받아오지 못한경우.
    //* 좋아요 혹은 싫어요를 누르지 않은 상태이다.
    //* 해당 데이터를 create한다.
    return await this.quizzesRepository.createLike(qId, mId, likeStatus);
  };
}

module.exports = QuizzesService;
