import { atom } from "recoil";

const loginState = atom({
  key: "login",
  default: false,
});

export default loginState;
