import React, { useState, useEffect } from "react";

function DiaryValue({ diaryId }) {
  const [diary, setDiary] = useState(null);

  useEffect(() => {
    getDiary();
  }, []);

  const getDiary = () => {
    fetch(`http://localhost:3001/diary/${diaryId}`)
      .then((response) => response.json())
      .then((json) => {
        setDiary(json);
      })
      .catch((error) => {
        console.log("Error fetching diary data:", error);
      });
  };

  if (diary === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <div className="text-xl font-bold">아이디: {diary.user_id}</div>
        <div className="text-sm">작성일: {diary.post_date}</div>
      </div>
      <hr className="my-4" />
      <div className="text-xl font-bold">제목: {diary.title}</div>
      <hr className="my-4" />
      <div className="text-base">내용: {diary.content}</div>
      <hr className="my-4" />
      {diary.images &&
        diary.images.map((image, index) => (
          <div key={index} className="mb-4">
            <img
              src={image}
              alt={`이미지 ${index}`}
              className="max-w-full rounded"
            />
          </div>
        ))}
    </div>
  );
}

export default DiaryValue;
