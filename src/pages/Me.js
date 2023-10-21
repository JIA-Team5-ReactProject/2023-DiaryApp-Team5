import DiaryCard from "../components/DiaryCard";

function Me() {
  return (
    <div>
      <div className="mt-4 grid grid-cols-3 gap-5 p-10">
        <DiaryCard />
        <DiaryCard />
        <DiaryCard />
      </div>
    </div>
  );
}

export default Me;
