import { useEffect, useState } from "react"
import SearchService from '../../services/SearchService';
import SearchInput from './SearchInput';
import { useRecoilState } from "recoil";
import { searchState } from "../../store/recoil";

export default function SearchBar({type, page}) {

  const [, setData] = useRecoilState(searchState);
  const [keyWord, setKeyWord] = useState('');
  const [searchBy, setSearchBy] = useState('title');

  useEffect(() => {
    const get = SearchService.getData(type==='me' ? 'v0v0v' : keyWord, type==='me' ? 'user' : searchBy, page);
    get.then((res) => {
      setData(res);
    });    
  }, [searchBy]);

  const changeSearch = (e) => {
    setKeyWord(e.target.value);
    const get = SearchService.getData(e.target.value, searchBy, page);
    get.then((res) => {
      const arr = [];
      if(searchBy === 'user') {
        setData(res);
        console.log(res);
      } else {
        res.forEach((element) => {
          const trimmedString = element.title.replace(/\s+/g, ''); // //사이에 정규표현식, \s+ 하나 이상의 공백을 ''로 대체
          if (trimmedString.includes(e.target.value)) arr.push(element);
        });
        setData(arr);
      }
    });
  }

  const isSelected = (e) => {
    setSearchBy(e.target.value);
    setKeyWord(''); // 변경되면 공백으로 바뀌고 재렌더링 >> useEffect
  }

  // 사용자명 검색 or 게시글 제목으로 검색
 return (
  <div className="flex mt-20 justify-center">
    <div className="relative flex w-9/12">
      <select onChange={isSelected} disabled={type==="me"} className="p-2 m-2" name="searchType" id="searchType">
        <option value="title">제목</option>
        <option value="user">작성자</option>
      </select>
      <SearchInput onChange={changeSearch} value={keyWord} />
    </div>
  </div>
 ) 
}