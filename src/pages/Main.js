import DiaryCard from "../components/DiaryCard";
import Header from "../components/Header";

function Main() {
  return (
    <div>
      <Header />
      <div className="mt-4 grid grid-cols-3 gap-5 p-10">
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
