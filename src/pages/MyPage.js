import React, { useState, useEffect } from "react";
import axios from "axios";
import DiaryCard from "../components/DiaryCard";
import Profile from "../components/Profile";
import SearchBar from "../components/searchbar/SearchBar";

function MyPage() {
  const [diaries, setDiaries] = useState([]);
  useEffect(() => {
    const userID = localStorage.getItem("id");
    console.log(userID);

    if (userID) {
      axios
        .get(`http://localhost:3001/diary?id=${userID}`)
        .then((response) => {
          setDiaries(response.data);
          console.log(response.data);
        })
        .catch((error) => console.error("Error fetching data: ", error));
    }
  }, []);

  return (
    <div>
      <div className="mt-4 pt-10 pb-5">
        <Profile />
      </div>
      <SearchBar />
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
