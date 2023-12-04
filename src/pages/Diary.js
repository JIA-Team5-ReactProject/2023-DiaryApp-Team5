import DiaryValue from "../components/DiaryValue";
import Comments from "../components/Comments";
import { useParams } from "react-router-dom";

function Diary() {
  const { id } = useParams();

  return (
    <div>
      <div className="mt-4 grid gap-5 p-10">
        <DiaryValue diaryId={id} />
        <Comments diaryId={id} />
      </div>
    </div>
  );
}

export default Diary;
