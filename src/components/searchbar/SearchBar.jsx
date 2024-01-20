import { useEffect, useState } from "react"
import SearchService from '../../services/SearchService';
import SearchInput from './SearchInput';
import { useRecoilState } from "recoil";
import { searchState } from "../../store/recoil";
/**
 * 
 * @param {String} type Search type "all" | "user's id" 
 * @param {int} page amount of posts
 * @returns 
 */
export default function SearchBar({type, page}) {

  const [, setData] = useRecoilState(searchState);
  const [keyWord, setKeyWord] = useState('');
  const [searchBy, setSearchBy] = useState('title');

  const getData = () => (type === 'all') ? SearchService.getDataAll() : SearchService.getDataByUser(type);

  useEffect(() => {
    const get = getData();
    get.then((res) => {
      setData(res);
    });    
  }, [searchBy]);

  const changeSearch = (e) => {
    setKeyWord(e.target.value);
    if(searchBy === 'user') {
      const searchByUser = SearchService.getDataByUser(e.target.value);
      searchByUser.then(res => {
        setData(res);
      });
    } else {
        const searchAll = getData();
        searchAll.then(res => {
          setData(SearchService.filterByTitle(res, e.target.value));
        });
      }
  }

  const isSelected = (e) => {
    setKeyWord(''); // 변경되면 공백으로 바뀌고 재렌더링 >> useEffect
    setSearchBy(e.target.value);
  }

 return (
  <div className="flex mt-20 justify-center">
    <div className="relative flex w-9/12">
      <select onChange={isSelected} disabled={type !== 'all'} className="p-2 m-2" name="searchType" id="searchType">
        <option value="title">제목</option>
        <option value="user">작성자</option>
      </select>
      <SearchInput onChange={changeSearch} value={keyWord} />
    </div>
  </div>
 ) 
}