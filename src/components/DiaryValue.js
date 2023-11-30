import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AWS from "aws-sdk";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function DiaryValue({ diaryId }) {
  const [diary, setDiary] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [previews, setPreviews] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");

  AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: process.env.REACT_APP_AWS_REGION,
  });

  const myBucket = new AWS.S3({
    params: { Bucket: "j1a" },
    region: "ap-northeast-2",
  });

  useEffect(() => {
    getDiary();
  }, []);

  const getDiary = () => {
    fetch(`http://localhost:3001/diary/${diaryId}`)
      .then((response) => response.json())
      .then((json) => {
        setDiary(json);
        setTitle(json.title);
        setContent(json.content);
      })
      .catch((error) => {
        console.log("Error fetching diary data:", error);
      });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setPreviews(diary.images);
  };

  const handleAddPhoto = () => {
    const fileSelector = document.createElement("input");
    fileSelector.setAttribute("type", "file");
    fileSelector.setAttribute("multiple", "");
    fileSelector.onclick = (event) => {
      event.target.value = null;
    };
    fileSelector.onchange = async (event) => {
      const newFiles = Array.from(event.target.files);
      const newPreviews = newFiles.map(async (file) => {
        const params = {
          Bucket: "j1a",
          Key: file.name.replace(/\s/g, '_'), // 파일 이름에서 공백을 밑줄로 대체
          Body: file,
          ACL: "public-read",
        };
        try {
          const uploadResult = await myBucket.upload(params).promise();
          return uploadResult.Location;
        } catch (error) {
          console.error("S3 upload error:", error);
        }
      });
      Promise.all(newPreviews)
        .then((newResults) => {
          setPreviews((prevResults) => [...prevResults, ...newResults]);
        })
        .catch((error) => console.error(error));
    };
    fileSelector.click();
  };

  const handleDeletePhoto = async (index) => {
    const updatedPreviews = [...previews];
    updatedPreviews.splice(index, 1);
    setPreviews(updatedPreviews);
  };

  const handleSave = async () => {
    const updatedDiary = { ...diary, title, content, images: previews };
    fetch(`http://localhost:3001/diary/${diaryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedDiary),
    })
      .then((response) => response.json())
      .then((data) => {
        setDiary(data);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDelete = () => {
    fetch(`http://localhost:3001/comments?diary_id=${diaryId}`)
      .then((response) => response.json())
      .then((comments) => {
        comments.forEach((comment) => {
          fetch(`http://localhost:3001/comments/${comment.id}`, {
            method: "DELETE",
          })
            .catch((error) => {
              console.error("Error deleting comment:", error);
            });
        });
        fetch(`http://localhost:3001/diary/${diaryId}`, {
          method: "DELETE",
        })
          .then(() => {
            navigate("/");
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  };

  if (diary === null) {
    return <div>Loading...</div>;
  }

  //quill 디자인 
  const modules = {
    toolbar: {
      container: [
        [{'header':[1,2,3,4,5,6,false]}],
        ['bold', 'italic', 'underline', 'strike'],
        [{'color':['black','red','blue','purple','pink','orange','yellow']}],
        [{'list':'ordered'},{'list':'bullet'}]
      ]
    }
  }

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <div className="text-xl font-bold mb-4">아이디: {diary.user_id}</div>
        <div className="text-sm mb-4">작성일: {diary.post_date}</div>
      </div>
      <hr className="my-4" />
      {isEditing ? (
        <>
          <div className="mb-4">
            <input
              className="border border-black p-2 w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력해주세요"
            />
          </div>
          <ReactQuill
            value={content}
            onChange={(e) => setContent(e)}
            modules={modules}
          />
          <button onClick={handleAddPhoto}>사진 추가</button>
          <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
            {previews.map((preview, index) => (
              <div key={index} style={{ position: "relative" }}>
                <img
                  src={preview}
                  alt={`이미지 ${index}`}
                  style={{ width: "23%", height: "23%", objectFit: "cover", margin: "8px" }}
                />
                <button
                  style={{ position: "absolute", top: "8px", right: "8px" }}
                  onClick={() => handleDeletePhoto(index)}
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
          {userId === diary.user_id && (
            <button
              className="border border-black p-2 m-2 cursor-pointer"
              onClick={handleSave}
            >
              저장
            </button>
          )}
        </>
      ) : (
        <>
          <div className="text-xl font-bold mb-4">제목: {diary.title}</div>
          <hr className="my-4" />
          <div dangerouslySetInnerHTML={{ __html: diary.content }}/>
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
          {userId === diary.user_id && (
            <>
              <button
                className="border border-black p-2 m-2 cursor-pointer"
                onClick={handleEdit}
              >
                수정
              </button>
              <button
                className="border border-black p-2 m-2 cursor-pointer"
                onClick={handleDelete}
              >
                삭제
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
  }
export default DiaryValue;