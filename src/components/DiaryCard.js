import { useNavigate } from "react-router-dom";

function DiaryCard({ id, name, postDate, img }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/diary/${id}`);
      }}
      className="bg-white p-8 shadow-md rounded-lg cursor-pointer dark:bg-slate-600"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <img
            src="https://placekitten.com/40/40"
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="text-gray-800 dark:text-gray-200 font-semibold">{name}</p>
            <p className="text-gray-500 text-sm dark:text-gray-200">{postDate}</p>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <img
          src={img ?? "https://images.unsplash.com/photo-1574629173115-01ba37282238?auto=format&fit=crop&q=80&w=1976&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
          alt="post_image"
          className={img ? "w-full h-48 object-contain rounded-md" : "w-full h-48 object-cover rounded-md"}
        />
      </div>
    </div>
  );
}

export default DiaryCard;
