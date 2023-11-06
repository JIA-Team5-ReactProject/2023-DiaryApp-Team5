import { useNavigate } from "react-router-dom";

function Main() {
  const Navigate = useNavigate(); 

  return (
    <div>
      <div className="mt-24 p-10 flex gap-3">
        <div className="flex-none w-52"></div>
        <article className="flex-1 relative overflow-hidden rounded-lg shadow transition hover:shadow-lg cursor-pointer flex place-content-center "
        onClick={()=>{
          Navigate("/write")
        }}>
          <img
            alt="Office"
            src="https://images.unsplash.com/photo-1591028666702-f1264db7260d?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute text-2xl/relaxed font-mono self-center">
            Go write
          </div>
        </article>

        <article className="flex-1 relative overflow-hidden rounded-lg shadow transition hover:shadow-lg">
          <img
            alt="Office"
            src="https://images.unsplash.com/photo-1574629173115-01ba37282238?auto=format&fit=crop&q=80&w=1976&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="relative bg-gradient-to-t from-gray-900/50 to-gray-900/25 pt-32 sm:pt-48 lg:pt-64">
            <div className="p-4 sm:p-6">
              <p className="mt-6  text-2xl/relaxed text-white/95">
                📕 일기 쓰기 <br />
                📒 모두와 소통 <br />
                📗 추억을 저장
              </p>
            </div>
          </div>
        </article>
        <div className="flex-none w-52"></div>
      </div>
    </div>
  );
}

export default Main;
