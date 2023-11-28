import { useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../store/recoil";
import { useNavigate } from "react-router-dom";

function DiaryCard({ id, name, postDate, img }) {
  const [heart, setHeart] = useState(true); //하트 on/off
  const [modal, setModal] = useRecoilState(modalState);
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/diary/${id}`);
      }}
      className="bg-white p-8 shadow-md rounded-lg cursor-pointer"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <img
            src="https://placekitten.com/40/40"
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="text-gray-800 font-semibold">{name}</p>
            <p className="text-gray-500 text-sm">{postDate}</p>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <img
          src={img}
          alt="post_image"
          className="w-full h-48 object-contain rounded-md"
        />
      </div>
    </div>
  );
}

export default DiaryCard;
