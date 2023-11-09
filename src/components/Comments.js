import React, { useState, useEffect } from "react";

import { getDiary } from "../services/DiaryService";
import {
  deleteComment,
  getCommentsByDiaryId,
  postComment,
} from "../services/CommentService";

export default function Comments({ diaryId }) {
  //{ diaryId } 페이지에서 보낸 useParams (페이지의 id)
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState("aaa"); // 로그인된 사용자 아이디 (임시)

  const handleContentChange = (e) => {
    setContent(e.target.value); //댓글 입력 칸에 적은 값을 넣음 ???
  };

  //댓글 작성
  const handler = {
    post: async () => {
      //post라는 함수를 정의 그리고 그 포스트 안에 payload,newComment 가 들어있는거임
      const payload = {
        user_id: loggedInUserId, // 로그인된 사용자 아이디로 댓글 작성
        comment: content, //댓글 내용
        diary_id: diaryId, //페이지 id
      };
      //services/DiaryService에 있는 함수에 새로넣을 값(payload)을 넣음
      const newComment = await postComment(payload);
      //Comments에 있는 데이터(...p)에 새로넣을 데이터를 추가함
      setComments((p) => [...p, newComment]);
      setContent("");
    },
  };

  useEffect(() => {
    //services에 있는 함수에다 현제 페이지의 id값(diaryId)을 넣어서 메소드 실행
    //getCommentsByDiaryId는 값을 불러옴
    //then(cmts) ???
    //setComments는 새로 작성할 댓글 데이터

    getCommentsByDiaryId(diaryId).then((cmts) => setComments(cmts));
  }, [comments]); //댓글 db에 움직임이 있으면 렌더링(새로고침) 함

  return (
    <>
      {/* 원래 댓글 조회 눌러야 댓글이 나오는건데 일단 없앴음 */}
      {/* <button onClick={getDiary} style={{ fontSize: "20px" }}>
        댓글 조회
      </button> */}

      <div
        style={{
          padding: "20px",
          backgroundColor: "#f5f5f5",
          borderRadius: "5px",
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>댓글 작성</h2>
        <form>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="content">내용</label>
            <input
              id="content"
              value={content}
              onChange={handleContentChange}
            />
          </div>
          <button
            type="button"
            style={{
              color: "black",
              border: "2px solid",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={handler.post}
          >
            작성 완료
          </button>
        </form>
      </div>

      <div>
        <h1 style={{ fontSize: "20px" }}>댓글 창</h1>
        <table>
          <tbody>
            {comments.map(
              (
                comment //comments안의 값을 쭉 읽음
              ) => (
                <Comment data={comment} /> //이 코드 아래에 따로 정의한 Comment(컴포넌트)를 반복하여 실행
                //즉 댓글 1개가 컴포넌트임 그걸comments.map로 반복해서 값을 표시
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

const Comment = ({ data }) => {
  const [loggedInUserId, setLoggedInUserId] = useState("aaa"); // 로그인된 사용자 아이디 (임시)

  const handler = {
    delete: async () => {
      if (loggedInUserId === data.user_id) {
        //들고온 데이터 안의 user_id값과 현재 로그인 되있는 id값을 비교
        deleteComment(data.id);
      } else {
        console.log("댓글을 삭제할 권한이 없습니다.");
      }
    },
  };

  return (
    //댓글 내용 표시
    <tr key={data.id}>
      <td style={{ verticalAlign: "top" }}>
        <p>아이디: {data.user_id}</p>
        <p>{data.comment}</p>
      </td>
      <td>
        {loggedInUserId === data.user_id && (
          <button onClick={handler.delete}>삭제</button>
        )}
      </td>
    </tr>
  );
};
