import SearchBar from "../components/searchbar/SearchBar";
import { useEffect } from "react";
import DiaryCard from "../components/DiaryCard";
import { useRecoilState } from "recoil";
import { searchState } from "../store/recoil";
import { useState } from "react";

function Me() {
  const [data] = useRecoilState(searchState);
  const [page, setPage] = useState(9);

  const infiniteScroll = () => {
    const { clientHeight, scrollHeight, scrollTop } = document.documentElement;
    if (clientHeight + scrollTop >= scrollHeight) {
      console.log("end");
      setPage(page + 9);
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
      <SearchBar data={data} type="me" page={page} />
      <div className="mt-4 grid grid-cols-3 gap-5 p-10">
        {data.map((element) => (
          <DiaryCard
            key={element.id}
            name={element.user_id}
            postDate={element.post_date}
          />
        ))}
      </div>
    </>
  );
}

export default Me;
