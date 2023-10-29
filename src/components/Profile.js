import axios from "axios";
import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("id");

    // 사용자 정보를 불러오는 함수
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users");
        const users = response.data;

        const foundUser = users.find((user) => user.id === parseInt(userId));
        if (foundUser) {
          setUser(foundUser);
        }
      } catch (error) {
        throw error;
      }
    };

    fetchUserProfile();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="font-extralight relative block overflow-hidden rounded-lg  p-4 sm:p-6 xl:px-20">
      <span className="absolute inset-x-0 bottom-0 h-0.5"></span>
      <div className="sm:flex sm:justify-between sm:gap-4">
        <div>
          <h3 className="text-lg font-bold tracking-tighter text-gray-900 sm:text-xl">
            {user.bio}
          </h3>

          <p className="mt-2 text-xs font-medium text-gray-600">
            {user.nickname}
          </p>
        </div>

        <div className="hidden sm:block sm:shrink-0">
          <img
            alt="Paul Clapton"
            src="https://yt3.googleusercontent.com/ytc/APkrFKZVkeEZhHqvCktgwxlXTmpzzdDh64-BJ4X3lQ2P=s900-c-k-c0x00ffffff-no-rj"
            className="h-24 w-24 rounded-lg object-cover shadow-sm"
          />
        </div>
      </div>
      <div className="mt-0">
        <p className="max-w-[40ch] text-sm text-gray-500">{user.detail}</p>
      </div>
    </div>
  );
}

export default Profile;
