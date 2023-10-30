import { useState } from "react"
import getPost from '../../util/getPost';

export default function SearchBar(data) {

  const [keyWord, setKeyWord] = useState('');
  const [searchBy, setSearchBy] = useState('title');

  const changeSearch = (e) => {
    setKeyWord(e.target.value);
    console.log(keyWord);
  }

  const isSelected = (e) => {
    setSearchBy(e.target.value);
    console.log(searchBy);
  }

  const onClickSubmit = (e) => {
    console.log('submit');
  }

  const onKeyDownSubmit = (e) => {
    if(e.key === 'Enter') {
      getPost(e.target.value, searchBy).then((res) => {
        console.log(res);
        res.forEach((element) => {
          const trimmedString = element.title.replace(/\s+/g, ''); // //사이에 정규표현식, \s+ 하나 이상의 공백을 ''로 대체
          if (trimmedString.includes(e.target.value)) data.push(element)
        });
      });
      console.log(data);
    }
  }

  // 사용자명 검색 or 게시글 제목으로 검색
 return (
  <div className="flex mt-20 justify-center">
    <div className="relative flex w-9/12">
      <select onChange={isSelected} className="p-2 m-2" name="searchType" id="searchType">
        <option value="title">제목</option>
        <option value="user">작성자</option>
      </select>
      <input
        onKeyDown={onKeyDownSubmit}
        onChange={changeSearch}
        value={keyWord}
        type="text"
        id="Search"
        placeholder=" Search for..."
        className="w-full p-2 border-b border-gray-300 py-2.5 pe-10 sm:text-sm"
      />
      <span class="absolute inset-y-0 end-3 grid w-10 place-content-center">
        <button type="submit" onClick={onClickSubmit} class="text-gray-600 hover:text-gray-700">
          <span className="sr-only">Search</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-4 w-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </span>
    </div>
  </div>

 ) 
}