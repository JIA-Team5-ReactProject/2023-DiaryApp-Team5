import React, { useState, useEffect } from "react";

function UserDiaryEmail({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    fetch(`http://localhost:3001/user/${userId}`)
      .then((response) => response.json())
      .then((json) => {
        setUser(json);
      })
      .catch((error) => {
        console.log("Error fetching diary data:", error);
      });
  };
  if (!user) {
    console.log(userId);
    return <div>Loading...</div>;
  }

  // getUserE 컴포넌트 사용 부분
  return <div className="text-xl font-bold">작성자 : {user.email}</div>;
}

export default UserDiaryEmail;
