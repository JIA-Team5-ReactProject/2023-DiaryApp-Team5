import { useNavigate } from "react-router-dom";

function App() {
  let navigate = useNavigate();
  return (
    <div className="font-mono">
      <div className="flex">
        <div className="flex-1 m-5 text-5xl">Diary</div>
        <div>
          <button
            class="middle none center m-3 rounded-lg bg-blue-500 py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-light="true"
            onClick={() => {
              navigate(""); //login페이지로 가기
            }}
          >
            login
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
