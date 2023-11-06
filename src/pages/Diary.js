
import DiaryValue from "../components/DiaryValue";
import Comments from "../components/Comments";


function Diary() {
  return (
    <div>
      <div className="mt-4 grid gap-5 p-10">
        <DiaryValue />
        <Comments/>
      </div>
    </div>
  );
}

export default Diary;
