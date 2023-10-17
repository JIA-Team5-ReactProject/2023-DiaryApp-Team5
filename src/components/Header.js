function Header() {
  return (
    <div>
      <div className="flex m-5">
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
            나의 일기
          </div>
          <div className="flex-none mr-10 place-self-end hover:cursor-pointer">
            모두의 일기
          </div>
        </div>
        <div className="place-self-center">
          <button
            class="middle none center  mx-3 rounded-lg bg-blue-500 py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-light="true"
          >
            login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
