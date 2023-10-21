import { atom } from "recoil";

const loginState = atom({
  key: "login",
  default: false,
});

const modalState = atom({
  key: "modal",
  default: false,
});

export { loginState, modalState };
