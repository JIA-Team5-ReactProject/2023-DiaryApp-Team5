import { atom } from "recoil";

const loginState = atom({
  key: "login",
  default: !!localStorage.getItem('accessToken'),
});

const modalState = atom({
  key: "modal",
  default: false,
});

const searchState = atom({
  key: "search",
  default: [],
})

export { loginState, modalState, searchState };
