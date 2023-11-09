import DiaryCard from "../components/DiaryCard";
import { useEffect } from "react";
import SearchBar from "../components/searchbar/SearchBar";
import { searchState } from "../store/recoil";
import { useRecoilState } from "recoil";
import { useState } from "react";

function Every() {
  const [data] = useRecoilState(searchState);
  const [page, setPage] = useState(9);

  const infiniteScroll = () => {
    const { clientHeight, scrollHeight, scrollTop } = document.documentElement;
    if (clientHeight + scrollTop >= scrollHeight) {
      console.log("end");
      setPage(page + 9);
      console.log(page);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll);
    return () => {
      window.removeEventListener("scroll", infiniteScroll);
    };
  }, []);

  return (
    <>
      <SearchBar data={data} type="every" page={page} />
      <div className="mt-4 grid grid-cols-3 gap-5 p-10">
        {data.map((element) => (
          <DiaryCard
            key={element.id}
            id={element.id}
            name={element.user_id}
            postDate={element.post_date}
          />
        ))}
      </div>
    </>
  );
}

export default Every;
