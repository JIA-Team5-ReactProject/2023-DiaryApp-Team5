import React from "react";
import { Link } from "react-router-dom";

function AuthLinkButton({ type }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-500">
        {type === "login" ? (
          <>
            계정이 없으신가요?&nbsp;
            <Link to="/register" className="underline">
              가입하러 가기
            </Link>
          </>
        ) : (
          <>
            이미 계정이 있으신가요?&nbsp;
            <Link to="/login" className="underline">
              로그인 하기
            </Link>
          </>
        )}
      </p>

      <button
        type="submit"
        className="inline-block rounded-lg bg-black px-5 py-3 text-sm font-medium text-white"
      >
        {type === "login" ? "로그인" : "가입"}
      </button>
    </div>
  );
}

export default AuthLinkButton;
