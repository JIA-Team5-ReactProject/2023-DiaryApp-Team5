function Header() {
  return (
    <div>
      <div className="flex m-5">
        <div className="flex-none text-5xl tracking-tighter font-mono mr-14">
          Diary
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
