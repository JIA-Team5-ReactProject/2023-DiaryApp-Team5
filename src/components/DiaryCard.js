import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../store/recoil";
import { useNavigate } from "react-router-dom";

function DiaryCard({id, name, postDate }) {
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
            {/* 넘어오는 날짜 형식 보고 바꿀것 */}
          </div>
        </div>
      </div>
      <div className="mb-4">
        <img
          src="https://placekitten.com/450/500"
          alt="Post Img"
          className="w-full h-48 object-contain rounded-md"
        />
      </div>
      <div className="flex items-center justify-between text-gray-500">
        <div className="flex items-center space-x-2">
          <button
            onClick={(event) => {
              setHeart(!heart);
              event.stopPropagation();
            }}
            className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1"
          >
            {heart ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6 text-red-600"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            )}
            <span>42 Likes</span>
          </button>
        </div>
        <button className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
            <path
              fill-rule="evenodd"
              d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
              clip-rule="evenodd"
            />
          </svg>
          <span>3 views</span>
        </button>
      </div>
    </div>
  );
}

export default DiaryCard;
