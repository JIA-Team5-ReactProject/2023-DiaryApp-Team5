import { Link } from "react-router-dom";
import LogoutService from "../services/LogoutService";
import { useSetRecoilState } from 'recoil';
import { loginState } from '../store/recoil';


function LoginDropdown() {
  const logout = LogoutService();
  const userId = localStorage.getItem("id");
  const setLogin = useSetRecoilState(loginState);

  return (
    <div className="relative">
      <div
        className="absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
        role="menu"
      >
        <div className="p-2">
          <Link
            to={`/mypage/${userId}`}
            className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            role="menuitem"
          >
            마이페이지로 이동
          </Link>
        </div>
        <div className="p-2">
          <Link
            to={`/account/${userId}`}
            className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            role="menuitem"
          >
            개인정보 관리
          </Link>
        </div>

        <div className="p-2">
          <form>
            <button
              type="submit"
              className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
              role="menuitem"
              onClick={(e) => {e.preventDefault(); logout(); setLogin(false);}}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4m5 16l4-4m-4 4l-4-4m4 4V3"
                />
              </svg>
              로그아웃
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginDropdown;
