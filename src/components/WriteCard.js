import { useState } from 'react';

export default function WriteCard() {

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);
      setImage(imageUrl);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
        <input
          type="text"
          placeholder="제목을 입력하세요"
          style={{ width: '100%' }}
          className="px-2 py-1 border-2 border-black outline-none text-xl"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div style={{flexDirection:'row',width:'100%'}}>
          <input
              type="date"
              style={{ width: '50%', marginRight:'50px'}}
              className="px-2 py-1 border-2 border-black outline-none text-xl"
              value={date}
              onChange={(e) => setDate(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        {image && (
            <img
              src={image}
              alt="이미지 미리보기"
              style={{ width: '100%', maxHeight: '300px' }}
            />
        )}
        <textarea
          style={{ width: '100%', height: '80%', marginBottom: '50px' }}
          className="border-2 border-black outline-none text-xl"
          placeholder='일기를 작성해주세요'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      
      <button
        className="px-4 py-2 border-2 border-black bg-transparent hover-bg-gray-200 transition-colors duration-200"
      >
        일기 작성하기
      </button>
    </div>
  );
}