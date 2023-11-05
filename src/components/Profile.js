import axios from "axios";
import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("id");

    // 사용자 정보를 불러오는 함수
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/users/${userId}`
        );
        const userProfile = response.data;

        setUser(userProfile);
        setNickname(userProfile.nickname);
        setBio(userProfile.bio);
      } catch (error) {
        throw error;
      }
    };

    fetchUserProfile();
  }, []);

  const updateUserProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3001/users/${user.id}`, {
        nickname,
        bio,
      });
      setEditMode(false);
      setUser({ ...user, nickname, bio }); // 상태 업데이트
    } catch (error) {
      console.error("업데이트 실패", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="font-extralight relative block overflow-hidden rounded-lg p-4 sm:p-6 xl:px-20">
      <span className="absolute inset-x-0 bottom-0 h-0.5"></span>
      <div className="sm:flex sm:justify-between sm:gap-4">
        {editMode ? (
          // 편집 모드인 경우 입력 폼을 렌더링
          <form className="w-full" onSubmit={updateUserProfile}>
            <label
              htmlFor="userNickname"
              className="block text-sm font-medium text-gray-700"
            >
              nickname
            </label>
            <input
              id="userNickname"
              type="text"
              defaultValue={user.nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="mt-1 block w-full rounded-md text-sm border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />

            <label
              htmlFor="userBio"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              Bio
            </label>
            <textarea
              id="userBio"
              defaultValue={user.bio}
              onChange={(e) => setBio(e.target.value)}
              className="mt-1 block w-full rounded-md text-sm border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            ></textarea>
            <button
              type="submit"
              className="bg-transparent mt-2 border-none p-0 m-0 text-xs text-blue-500 hover:text-blue-600 hover:underline focus:outline-none"
            >
              저장하기
            </button>
          </form>
        ) : (
          <>
            <div>
              <div className="hidden sm:block sm:shrink-0">
                <img
                  alt="User"
                  src="https://yt3.googleusercontent.com/ytc/APkrFKZVkeEZhHqvCktgwxlXTmpzzdDh64-BJ4X3lQ2P=s900-c-k-c0x00ffffff-no-rj"
                  className="h-24 w-24 rounded-lg object-cover shadow-sm"
                />
              </div>
              <h3 className="text-lg font-bold mt-3 tracking-tighter text-gray-900 sm:text-xl">
                {user.nickname}
              </h3>
              <p className="mt-2 text-xs font-medium text-gray-600">
                {user.bio}
              </p>
            </div>
          </>
        )}
      </div>
      {!editMode && (
        <div className="mt-0">
          <button
            onClick={() => setEditMode(true)}
            className="bg-transparent mt-2 border-none p-0 m-0 text-xs text-blue-500 hover:text-blue-600 hover:underline focus:outline-none"
          >
            수정하기
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;
