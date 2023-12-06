import React, { useState, useEffect } from "react";

import { getDiary } from "../services/DiaryService";
import {
  deleteComment,
  getCommentsByDiaryId,
  postComment,
} from "../services/CommentService";

export default function Comments({ diaryId }) {
  //{ diaryId } 페이지에서 보낸 useParams (페이지의 id)
  const userId = localStorage.getItem("id");
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(userId); // 로그인된 사용자 아이디 (임시)

  const handleContentChange = (e) => {
    setContent(e.target.value); //댓글 입력 칸에 적은 값을 넣음 ???
  };

  //로그인 된지 확인하는 함수
  const isLoggedIn = () => {
    const userId = localStorage.getItem("id");
    return !!userId; // userId가 존재하면 true, 그렇지 않으면 false 반환
  };

  //댓글 작성
  const handler = {
    post: async () => {
      if (!isLoggedIn()) {
        alert("로그인 후 이용 가능합니다.");
        setContent("");
        return;
      }
      //post라는 함수를 정의 그리고 그 포스트 안에 payload,newComment 가 들어있는거임
      const payload = {
        user_id: loggedInUserId, // 로그인된 사용자 아이디로 댓글 작성
        comment: content, //댓글 내용
        diary_id: diaryId, //페이지 id
      };
      //services/DiaryService에 있는 함수에 새로넣을 값(payload)을 넣음
      const newComment = await postComment(payload);
      //Comments에 있는 데이터(...p)에 새로넣을 데이터를 추가함
      if (newComment) {
        setComments((p) => [...p, newComment]);
        setContent("");
      } else {
        console.log();
        setComments(newComment);
      }
    },
  };

  useEffect(() => {
    //services에 있는 함수에다 현제 페이지의 id값(diaryId)을 넣어서 메소드 실행
    //getCommentsByDiaryId는 값을 불러옴
    //then(cmts) ???
    //setComments는 새로 작성할 댓글 데이터

    getCommentsByDiaryId(diaryId).then((cmts) => setComments(cmts));
  }, []); //댓글 db에 움직임이 있으면 렌더링(새로고침) 함

  return (
    <>
      <link href="/dist/output.css" rel="stylesheet"></link>

      {/* 댓글 작성 폼 */}
      <div className="p-6 bg-gray-100 rounded">
        <h2 className="text-xl font-bold mb-4">댓글 작성</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-600"
            >
              내용
            </label>
            <input
              id="content"
              value={content}
              onChange={handleContentChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <button
            type="button"
            className="px-4 py-2 text-white bg-black rounded-md cursor-pointer"
            onClick={handler.post}
            disabled={!isLoggedIn}
          >
            작성 완료
          </button>
        </form>
      </div>

      {/* 댓글 목록 */}
      <div className="mt-6">
        <h1 className="text-lg font-bold">댓글 창</h1>
        {comments.length > 0 ? (
          <table className="w-full mt-4">
            <tbody>
              {comments.map((comment) => (
                <Comment /* Comment에서 사용 해야하는 함수나 값을 넘겨줌 */
                  key={comment.id}
                  data={comment}
                  diaryId={diaryId}
                  setComments={setComments}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <p>댓글 없음</p>
        )}
      </div>
    </>
  );
}

const Comment = ({ data, diaryId, setComments }) => {
  const userId = localStorage.getItem("id");
  const [loggedInUserId, setLoggedInUserId] = useState(userId); // 로그인된 사용자 아이디 (임시)

  const handler = {
    delete: async () => {
      if (loggedInUserId === data.user_id) {
        //들고온 데이터 안의 user_id값과 현재 로그인 되있는 id값을 비교
        deleteComment(data.id);
        getCommentsByDiaryId(diaryId).then((cmts) => setComments(cmts));
        //바꾼 db를 다시 불러오는 함수 (다시 불러와야 화면에 삭제된 db를 보여줌)
      } else {
        console.log("댓글을 삭제할 권한이 없습니다.");
      }
    },
  };

  return (
    //댓글 내용 표시
    <tr key={data.id} className="border-b">
      <td className="p-4">
        <p className="text-gray-600">아이디: {data.user_id}</p>
        <p>{data.comment}</p>
      </td>
      <td className="p-4">
        {/* 삭제 버튼 */}
        {loggedInUserId === data.user_id && (
          <button
            className="border border-red-500 px-3 py-1 text-red-500 rounded hover:bg-red-500 hover:text-white"
            onClick={handler.delete}
          >
            삭제
          </button>
        )}
      </td>
    </tr>
  );
};
