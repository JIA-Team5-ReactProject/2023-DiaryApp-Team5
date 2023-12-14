import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AWS from "aws-sdk";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function DiaryValue({ diaryId }) {
  const [diary, setDiary] = useState(null);
  const [writer, setWriter] = useState("");
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
    getData();
  }, []);

  const getData = async () => {
    try {
      axios
        .get(`http://localhost:3300/diary/${diaryId}`)
        .then((res) => {
          console.log(res);
          setDiary(res.data);
          setContent(res.data.content);
          setTitle(res.data.title);

          return res.data; //서버에서 받은 데이터를 반환, 반환된 값은 밑의 .then으로 전달
        })
        .then((diaryData) => {
          //전달받은 데이터 = diary 데이터임
          return getWriter(diaryData);
        })
        .then(() => {
          console.log("getWriter 호출 후");
          console.log(writer);
        });
    } catch {}
  };

  const getWriter = async (diaryData) => {
    await axios
      .get(`http://localhost:3300/users/${diaryData.user_id}`)
      //diary의 user_id와 같은 users의 id를 가지는 데이터를 가져옴
      .then((res) => {
        //가져온 값은 res
        setWriter(res.data);
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
          Key: file.name.replace(/\s/g, "_"), // 파일 이름에서 공백을 밑줄로 대체
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
    fetch(`http://localhost:3300/diary/${diaryId}`, {
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
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmDelete) {
        fetch(`http://localhost:3300/diary/${diaryId}`, {
          method: 'DELETE',
        })
        .then(() => {
          navigate('/every'); // 게시글 삭제 후 페이지 이동
        })
        .catch((error) => {
          console.error('Error:', error);
        });
  
        // 해당 다이어리와 관련된 모든 댓글 삭제
        fetch(`http://localhost:3300/comments?diary_id=${diaryId}`)
        .then(response => response.json())
        .then(data => {
          data.forEach(comment => {
            fetch(`http://localhost:3300/comments/${comment.id}`, {
              method: 'DELETE',
            })
            .catch((error) => {
              console.error('Error:', error);
            });
          });
        });
    }
  };

  if (diary === null) {
    return <div>Loading...</div>;
  }

  //quill 디자인
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [
          {
            color: [
              "black",
              "red",
              "blue",
              "purple",
              "pink",
              "orange",
              "yellow",
            ],
          },
        ],
        [{ list: "ordered" }, { list: "bullet" }],
      ],
    },
  };

  return (
    <div className="p-4 font-extralight">
      <div className="text-xl font-bold mb-4">
        <div>작성자 : {writer.nickname}</div>
        <div className="text-sm">작성일: {diary.post_date}</div>
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
          <div
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          >
            {previews.map((preview, index) => (
              <div key={index} style={{ position: "relative" }}>
                <img
                  src={preview}
                  alt={`이미지 ${index}`}
                  style={{
                    width: "23%",
                    height: "23%",
                    objectFit: "cover",
                    margin: "8px",
                  }}
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
          <div dangerouslySetInnerHTML={{ __html: diary.content }} />
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
