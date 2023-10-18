function Header() {
  return (
    <div className="h-10">
      <div className="flex p-4 fixed bg-white w-full border">
        <div className="flex-none text-5xl tracking-tighter font-mono mr-14">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>

            <span>Diary</span>
          </div>
        </div>
        <div className="flex-1 flex tracking-tighter font-extralight">
          <div className="flex-none mr-10 place-self-end hover:cursor-pointer">
            나의 일기장
          </div>
          <div className="flex-none mr-10 place-self-end hover:cursor-pointer">
            모두의 일기장
          </div>
          <div className="flex-none mr-10 place-self-end hover:cursor-pointer">
            마이페이지
          </div>
        </div>
        <div className="place-self-center">
          <button>
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
        </div>
      </div>
    </div>
  );
}

export default Header;
