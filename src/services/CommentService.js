//db에 있는 comments를 가져오는 함수
export async function getCommentsByDiaryId(id) {
  const res = await fetch(`http://localhost:3300/comments?diary_id=${id}`);
  const comments = await res.json();
  return comments;
}

//db에 comments를 추가하는 함수
export async function postComment(payload) {
  const res = await fetch("http://localhost:3300/comments", {
    //여기 안에 있는게 json타입으로 변환 해주는 작업임
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
  const data = await res.json();

  return data;
}

//db에 comments를 삭제하는 함수
//id값 비교는 comments 컴포넌에 정의함
export async function deleteComment(id) {
  const res = await fetch(`http://localhost:3300/comments/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
}
