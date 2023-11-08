import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function DiaryValue() {
  const [diary, setDiary] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getDiary();
  }, []);

  const getDiary = () => {
    fetch(`http://localhost:3001/diary/${id}`)
      .then(response => response.json())
      .then(json => {
        setDiary(json);
      })
      .catch(error => {
        console.log('Error fetching diary data:', error);
      });
  };

  if (diary === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div style={{ fontSize: 20 }}>아이디: {diary.user_id}</div>
      <br />
      <div>작성일: {diary.post_date}</div>
      <hr />
      <div style={{ fontSize: 20 }}>제목: {diary.title}</div>
      <hr />
      <div style={{ fontSize: 15 }}>내용: {diary.content}</div>
      <hr />
      {diary.images &&
        diary.images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`이미지 ${index}`}
              style={{ maxWidth: '100%' }}
            />
            <br />
          </div>
        ))}
    </div>
  );
}

export default DiaryValue;
