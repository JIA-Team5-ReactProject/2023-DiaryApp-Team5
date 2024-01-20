import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthField from "./AuthField";
import FieldData from "../constants/FieldData";
import AuthLinkButton from "./AuthLinkButton";
import AuthService from "../services/AuthService";
import { useSetRecoilState } from 'recoil';
import { loginState } from '../store/recoil';
import defaultImage from '../assets/default.png';

function AuthForm({ type, onSubmit }) {
  const setLogin = useSetRecoilState(loginState);

  const formFields =
    type === "register"
      ? [
          ...FieldData,
          {
            name: "nickname",
            type: "text",
            placeholder: "닉네임",
            label: "닉네임",
          },
        ]
      : FieldData;

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    nickname: "", // 회원가입일 경우에만
    bio: "안녕하세요.", // 회원가입일 경우에만
    image: defaultImage
  });

  const [errorMessage, setErrorMessage] = useState(""); // 유효성 검사 에러메시지

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 필드
    const requiredFields =
      type === "register"
        ? ["email", "password", "nickname", "bio"]
        : ["email", "password"];

    for (let fieldName of requiredFields) {
      if (!formValues[fieldName]) {
        setErrorMessage("입력되지 않은 필드가 있습니다. 확인해 주세요.");
        return;
      }

      if (onSubmit) {
        onSubmit(formValues); // 모든 필드가 유효하면 onSubmit 함수를 호출
      }

      try {
        if (type === "register") {
          // 이메일이 이미 사용 중인지 확인
          const emailTaken = await AuthService.isEmailTaken(formValues.email);
          if (emailTaken) {
            setErrorMessage("이미 사용 중인 이메일입니다.");
            return;
          }

          await AuthService.register(formValues);
          navigate("/login");
        } else {
          await AuthService.login(formValues);
          setLogin(true);
          navigate("/");
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <div className="font-extralight">
      <form
        onSubmit={handleSubmit}
        action=""
        className="mx-auto mb-0 mt-8 max-w-md space-y-4"
      >
        {formFields.map((field, index) => (
          <AuthField
            key={index}
            field={field}
            value={formValues[field.name]}
            onChange={handleChange}
          />
        ))}
        
        {errorMessage && (
          <div className="text-red-400 text-xs tracking-tight">
            {errorMessage}
          </div>
        )}
        <AuthLinkButton type={type} />
      </form>
    </div>
  );
}

export default AuthForm;
