import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useState,useEffect} from 'react';
import axios from 'axios';
import AWS from "aws-sdk";


export default function WriteCard() {

  //수정 삭제 임의 구현 삭제 해야함 xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  // 일기 임의 저장 함수
  const [diaryList, setDiaryList] = useState([]);

  //일기 ID 저장 함수
  const [editingId, setEditingId] = useState(null);
  
  useEffect(() => {
  getDiaries();
  }, []);

  //불러오기 함수
  const getDiaries = async () => {
    try {
      const response = await axios.get('http://localhost:3001/diary');
      setDiaryList(response.data);
    } catch (error) {
      console.error('일기 불러오기 실패', error);
    }
  };

  //삭제 함수
  const deleteDiary = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/diary/${id}`);
      getDiaries();  // 일기가 삭제된 후에는 다시 일기 리스트를 불러와 화면을 갱신합니다.
    } catch (error) {
      console.error('일기 삭제 실패', error);
    }
  };

  //입력란에 해당 ID 일기 올려주는 함수
  const handleEdit = (id, diary) => {
    setTitle(diary.title);
    setContent(diary.content);
    setDate(diary.post_date);
    setEditingId(id);
    setFiles(diary.images); // 일기의 이미지 정보를 files 상태에 저장
  };

  //이미지 클릭시 삭제 함수
  const deleteImage = (index) => {
  const newFiles = [...files];
  newFiles.splice(index, 1);
  setFiles(newFiles);
  };
  //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  
  //내용 담는 State
  const[title,setTitle] = useState("")
  const[content,setContent] = useState("")
  const[date,setDate] = useState("")
  const[files,setFiles] = useState([])

  //사진 미리보기 State
  const [previews, setPreviews] = useState([]);

//-----------------------------------------------------------------------
  //버킷 담는 State
  const[myBucket,setMyBucket] = useState(null);

  //최초 실행될 때 AWS 암호키를 변수에 등록해주기 위한 함수
  useEffect(() => {
    AWS.config.update({
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
      region: process.env.REACT_APP_AWS_REGION,
    });
    // AWS S3 객체 생성 (정해진 규격이라 무조건 아래처럼 해야함)
    const myBucket = new AWS.S3({
      params: { Bucket:"j1a"},
      region: "ap-northeast-2"
    })
    //버킷State에 저장해주기
    setMyBucket(myBucket)
  },[])
//-----------------------------------------------------------------------------

//버튼 클릭시 파일을 담아주는 함수 (index함수로 하면 디자인이 더러워서 버튼으로 함)
  const openFileSelector = () => {
    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.setAttribute('multiple', '');
    fileSelector.onclick = (event) => {
      event.target.value = null;
    };
    fileSelector.onchange = (event) => {
      // 선택된 파일들을 배열로 변환 후 기존 파일들에 추가
      const newFiles = Array.from(event.target.files);
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
    
      // 각 파일에 대한 미리보기 이미지 생성
      const newPreviews = newFiles.map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });
    
      // 생성된 미리보기 이미지를 기존 미리보기 이미지들에 추가
      Promise.all(newPreviews)
        .then((newResults) => {
          setPreviews((prevResults) => [...prevResults, ...newResults]);
        })
        .catch((error) => console.error(error));
    };
    fileSelector.click();
  };
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
  // AWS로 사진 전송
  const uploadFiles = async (files) => {
    const urls = await Promise.all(
      files.map(file => {
        return new Promise((resolve, reject) => {
          const param = {
            ACL: "public-read",
            ContentType: "*",
            Body: file,
            Bucket: "j1a",
            Key: file.name,
          };
  
          myBucket.putObject(param).send((err, data) => {
            if(err) {
              console.log(err);
              reject(err);
            } else {
              const url = `https://${param.Bucket}.s3.${AWS.config.region}.amazonaws.com/${param.Key}`; // 업로드된 이미지의 URL 생성
              resolve(url);
            }
          });
        });
      })
    );
  
    return urls;
  };
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
  //버튼 클릭시 db.json에 데이터 전송하는 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !title || !content) {
      alert("일기를 모두 작성해주세요")
    } else {
      let imageUrls = [];
      if(files.length > 0) {
        imageUrls = await uploadFiles(files); // 업로드된 이미지의 URL들
      }
  
      const diary = {
        user_id: "v0v0v",
        post_date: date,
        title: title,
        content: content,
        images: imageUrls, // 이미지 URL들을 DB에 저장
      };
      
  // 수정 삭제 임의 구현 나중에 삭제 해야함xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    try {
      if (editingId) {
        await axios.put(`http://localhost:3001/diary/${editingId}`, diary);
      } else {
        await axios.post('http://localhost:3001/diary', diary);
      }
      setEditingId(null);  // 일기를 저장하고 나면 editingId를 null로 설정
      setTitle("");         // 일기를 저장하고 나면 제목을 비움
      setContent("");       // 일기를 저장하고 나면 내용을 비움
      setDate("");          // 일기를 저장하고 나면 날짜를 비움
      setFiles([]);         // 일기를 저장하고 나면 파일을 비움
      setPreviews([]);      // 일기를 저장하고 나면 미리보기 이미지를 비움
    } catch (error){
      console.error('저장 실패', error);
    }
  };
  }
  //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx


      //원래 써야하는 함수 부분
  //     try {
  //       await axios.post('http://localhost:3001/diary', diary);
  //       alert('일기가 성공적으로 저장되었습니다.');
  //       setTitle("");
  //       setContent("");
  //       setDate("");
  //       setFiles([]);
  //       setPreviews([]);
  //     } catch (error) {
  //       console.error('저장 실패', error);
  //     }
  //   }
  // };
  //-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
  //제목 내용 변경시 {title} 변경해주기
  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  //글 내용 변경시 {content} 변경해주기
  const handleContentChange = (c) => {
    setContent(c)
  }

  //날짜 변경시 {date} 변경해주기
  const handleDateChange = (d) => {
    setDate(d.target.value)
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
//-----------------------------------------------------------------------------

  return(
    <>
      <div>
        {/* 제목 입력 받기 */}
        <input
          type='text'
          value={title}
          placeholder='제목을 입력해주세요'
          onChange={handleTitleChange}
          style={{marginBottom:'20px',width:'40%',height:'51px',border: '1px solid #ccc', 
                  padding: '5px', marginRight:'20%'}}
        />
        {/* 수정 삭제 임의 구현 나중에 삭제 해야함xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
        <input
          type='date'
          value={date}
          onChange={handleDateChange}
          style={{marginBottom:'20px',width:'40%',height:'50px',border: '1px solid #ccc', padding: '5px'}}
        />
        {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}

        {/* 원래 사용 코드 */}
        {/* 날짜 입력 받기
        <input
          type='date'
          value={date}
          onChange={handleDateChange}
          style={{marginBottom:'20px',width:'40%',height:'50px',border: '1px solid #ccc', padding: '5px'}}
        /> */}
      </div>

      <div>
        {/* 일기 내용 퀼 */}
        <ReactQuill 
          modules={modules}
          value={content}
          placeholder='일기를 작성해주세요'
          onChange={handleContentChange}
        />
        {/* 사진 입력 받기 */}
        <button onClick={openFileSelector}>파일 선택</button>

        {/* 이미지 미리보기 */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
          {previews.map((preview, index) => (
          <img key={index} src={preview} alt="preview" style={{ width: '23%', height: '23%', objectFit: 'cover', margin: '8px' }} />
          ))}
        </div>

        {/* 작성 완료 버튼 */}
        <button className="fixed right-0 mr-4 mb-4 bottom-0 bg-transparent hover:bg-black text-gray-500 font-bold py-2 px-4 border border-gray-500 hover:text-white rounded"
          onClick={handleSubmit} >
          일기 작성 완료
        </button> 
      </div> 

      {/* 수정 삭제 임의 구현 나중에 삭제 해야함 xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
      <div>
    {diaryList.map(diary => (
    <div key={diary.id}>
      <h2>{diary.title}</h2>
      <p>{diary.content}</p>
      <p>{diary.post_date}</p>
      {diary.images.map((image, index) => (
      <img key={index} src={image} alt="일기 이미지" onClick={() => deleteImage(index)} /> // 클릭 이벤트 추가
      ))}

      <button onClick={() => handleEdit(diary.id, diary)}
      className='mr-4 mb-4 bottom-0 bg-transparent hover:bg-black text-gray-500 font-bold py-2 px-4 border border-gray-500 hover:text-white rounded'
      >수정</button>
      <button onClick={() => deleteDiary(diary.id)}
      className='mr-4 mb-4 bottom-0 bg-transparent hover:bg-black text-gray-500 font-bold py-2 px-4 border border-gray-500 hover:text-white rounded'
      >삭제</button>
    </div>
  ))}
</div>
      {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
    </>
  )
}