import { useRecoilState } from "recoil";
import { loginState } from "../store/recoil";
import { useNavigate, useLocation } from "react-router-dom";
import LoginDropdown from "./LoginDropdown";
import { useEffect, useState } from "react";

function Header() {
  const [login] = useRecoilState(loginState);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setShowDropdown(false);
  }, [location]);

  function handleButtonClick() {
    const accessToken = localStorage.getItem("accessToken");
    accessToken === null ? navigate("/login") : setShowDropdown(!showDropdown);
  }

  return (
    <div className="h-10">
      <div className="fixed flex p-4 bg-white w-full border z-20">
        <div className="flex-none text-5xl tracking-tighter font-mono mr-14">
          <div className="flex items-center">
            {login === true ? (
              <svg
                className="h-10 w-10 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            ) : (
              <svg
                className="h-10 w-10 text-black "
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                {" "}
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />{" "}
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            )}

            <span
              className="cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            >
              Diary
            </span>
          </div>
        </div>
        <div className="flex-1 flex tracking-tighter font-extralight">
          <div
            className="flex-none mr-10 place-self-end hover:cursor-pointer"
            onClick={() => {
              navigate("/teammate");
            }}
          >
            조원 소개
          </div>
          <div
            className="flex-none mr-10 place-self-end hover:cursor-pointer"
            onClick={() => {
              navigate("/every");
            }}
          >
            모두의 일기장
          </div>
        </div>

        <div className="place-self-center ml-4">
          <button onClick={handleButtonClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6 mt-4 mr-3"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </button>
          {showDropdown === true ? <LoginDropdown /> : null}
        </div>
      </div>
    </div>
  );
}

export default Header;
