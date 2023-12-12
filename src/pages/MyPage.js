import DiaryCard from "../components/DiaryCard";
import Profile from "../components/Profile";
import SearchBar from "../components/searchbar/SearchBar";
import { useRecoilState } from "recoil";
import { searchState } from "../store/recoil";

function MyPage() {
  const [data] = useRecoilState(searchState);
  const userID = localStorage.getItem("id");

  return (
    <div>
      <div className="mt-4 pt-10 pb-5">
        <Profile />
      </div>
      <SearchBar type={userID}/>
      <div className="mt-0 grid grid-cols-3 gap-5 p-10">
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
    </div>
  );
}

export default MyPage;
