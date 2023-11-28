import DiaryCard from "../components/DiaryCard";
import Profile from "../components/Profile";
import SearchBar from "../components/searchbar/SearchBar";
import { useRecoilState } from "recoil";
import { searchState } from "../store/recoil";

function MyPage() {
  const [diaries] = useRecoilState(searchState);
  const userID = localStorage.getItem("id");

  return (
    <div>
      <div className="mt-4 pt-10 pb-5">
        <Profile />
      </div>
      <SearchBar type={userID}/>
      <div className="mt-0 grid grid-cols-3 gap-5 p-10">
        {diaries.map((diary) => (
          <DiaryCard
            key={diary.id}
            name={diary.title}
            postDate={diary.post_date}
          />
        ))}
      </div>
    </div>
  );
}

export default MyPage;
