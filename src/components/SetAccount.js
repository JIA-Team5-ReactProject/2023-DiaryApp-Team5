import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { loginState } from "../store/recoil";
import { useS3Uploader } from "../hooks/S3Uploader";

function SetAccout() {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();
  const setLogin = useSetRecoilState(loginState);
  const { uploadFileToS3 } = useS3Uploader();

  // 회원 정보 수정
  const updateUserProfile = async (e) => {
    e.preventDefault();

    const updates = {};
    if (nickname) updates.nickname = nickname;
    if (password) updates.password = password;

    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      try {
        const imageUrl = await uploadFileToS3(file); // S3 업로드 함수
        updates.image = imageUrl;
      } catch (error) {
        console.error("이미지 업로드 실패", error);
        return;
      }
    }

    try {
      await axios.patch(`http://localhost:3001/users/${userId}`, updates);
      console.log("유저 정보 수정 성공");
    } catch (error) {
      console.error("유저 정보 수정 실패", error);
    }
  };

  // 회원 탈퇴
  const handleAccountDeletion = async () => {
    const userId = localStorage.getItem("id");
    const confirmed = window.confirm("정말로 탈퇴하시겠습니까?");

    if (confirmed) {
      try {
        await axios.delete(`http://localhost:3001/users/${userId}`);
        window.alert("탈퇴가 완료 되었습니다.");
        setLogin(false);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("id");
        navigate("/");
      } catch (error) {
        console.error("계정 삭제 실패", error);
      }
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <form
        onSubmit={updateUserProfile}
        className="mx-auto mb-0 max-w-md space-y-4"
      >
        <div>
          <label htmlFor="nickname" className="sr-only">
            닉네임
          </label>

          <div className="relative">
            <input
              type="nickname"
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              defaultValue={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임 입력"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>

          <div className="relative">
            <input
              type="password"
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호 입력"
            />
          </div>
        </div>

        <input
          type="file"
          className="file-input file-input-ghost w-full max-w-m"
        />

        <div className="flex items-center justify-between">
          <button
            onClick={handleAccountDeletion}
            type="button"
            className="bg-transparent border-none p-0 m-0 mt-5 text-sm text-red-600 hover:text-red-600 hover:underline focus:outline-none"
          >
            탈퇴하기
          </button>

          <button
            type="submit"
            className="inline-block rounded-lg bg-black mt-5 px-5 py-3 text-sm font-medium text-white"
          >
            수정하기
          </button>
        </div>
      </form>
    </div>
  );
}

export default SetAccout;
