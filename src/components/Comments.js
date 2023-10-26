import React, { useState } from 'react';

function Comments() {
  
  const [content, setContent] = useState('');

  const getComment = () => {
    fetch("http://localhost:3000/comments")
      .then(response => response.json())
      .then((json) => {
        const list = [];
        for (const comment of json) {
          list.push(`<div>`);
          list.push(`<p>아이디: ${comment.id}</p>`);
          list.push(`<p>${comment.comment}</p>`);
          list.push(`<br>`);
          list.push(`<hr>`);
          
          list.push(`</div>`);
        }
        document.getElementById("tbody").innerHTML = list.join("");
      });
  }

  const postComment = (e) => {
    e.preventDefault();
    const comments = {
      "comment": content
    };
    fetch("http://localhost:3000/comments", {
      method: "POST",
      body: JSON.stringify(comments),
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    })
      .then(response => response.json())
      .then((json) => {
        console.log(json);
        getComment(); // 작성 완료 후 댓글 조회\
        setContent('');
      });
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <>
      <button onClick={getComment} style={{fontSize: '20px'}}>댓글 조회</button>

      <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
        <h2  style={{ marginBottom: '10px' }}>댓글 작성</h2>
        <form onSubmit={postComment}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="content">내용</label>
            <input id="content" value={content} onChange={handleContentChange} />
          </div>
          <button type="submit" style={{
                  backgroundColor: '#4caf50',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  cursor: 'pointer',
              }}>작성 완료</button>
        </form>
      </div>


      <div>
        <h1 style={{fontSize: '20px'}}>댓글 창</h1>
      </div> 
      <tbody id="tbody"></tbody>
    </>

    
  );
}

export default Comments;
