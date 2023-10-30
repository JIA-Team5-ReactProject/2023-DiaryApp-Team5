import DiaryCard from "../components/DiaryCard";
import SearchBar from '../components/searchbar/SearchBar';
import { useEffect, useState } from 'react';
import getPost from '../util/getPost'

function Me() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getPost().then((result) => {
      setData(result);
    }).catch((err) => {
      console.error(err);
    });
  },[]);

  console.log(data);

  return (
    <>
      <SearchBar />
      <div className="mt-4 grid grid-cols-3 gap-5 p-10">
        {data.map((element) => (
          <DiaryCard key={element.id} name={element.user_id} />
        ))}
      </div>      
    </>
    
  );
}

export default Me;
