import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../store/recoil";

function DiaryModal() {
  const [modal, setModal] = useRecoilState(modalState);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="w-full h-full fixed bg-black/70 backdrop-blur-sm z-10 p-16">
      <div className="bg-white rounded-xl p-3 px-36 mx-52 relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-8 h-8 absolute inset-y-0 right-0 m-2 cursor-pointer"
          onClick={() => {
            setModal(!modal);
          }}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <img
              src="https://placekitten.com/40/40"
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="text-gray-800 font-semibold">John Doe</p>
            </div>
          </div>
        </div>
        <div className="border border-black h-96 p-5 mb-4">일기</div>
        <div className="border border-black h-20 p-5">댓글</div>
      </div>
    </div>
  );
}

export default DiaryModal;
