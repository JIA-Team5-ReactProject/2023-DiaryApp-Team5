import DiaryCard from "../components/DiaryCard";
import SearchBar from "../components/searchbar/SearchBar";
import { searchState } from "../store/recoil";
import { useRecoilState } from "recoil";

function Every() {
  const [data] = useRecoilState(searchState);

  return (
    <>
      <SearchBar type="all" />
      <div className="mt-4 grid grid-cols-3 gap-5 p-10">
        {data.map((element) => (
          <DiaryCard
            key={element.id}
            id={element.id}
            name={element.title}
            postDate={element.post_date}
            img={element.images[0]}
          />
        ))}
      </div>
    </>
  );
}

export default Every;
