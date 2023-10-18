import DiaryCard from "../components/DiaryCard";
import Header from "../components/Header";

function Main() {
  return (
    <div>
      <Header />
      <div className="grid grid-cols-4 justify-items-center gap-4 p-10">
        <DiaryCard />
        <DiaryCard />
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

export default Main;
