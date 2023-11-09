import DiaryCard from "../components/DiaryCard";
import Profile from "../components/Profile";
import SearchBar from "../components/searchbar/SearchBar";

function MyPage() {
  return (
    <div>
      <div className="mt-4 pt-10 pb-5">
        <Profile />
      </div>
      <SearchBar />
      <div className="mt-0 grid grid-cols-3 gap-5 p-10">
        <DiaryCard />
        <DiaryCard />
        <DiaryCard />
        <DiaryCard />
        <DiaryCard />
        <DiaryCard />
      </div>
    </div>
  );
}

export default MyPage;
