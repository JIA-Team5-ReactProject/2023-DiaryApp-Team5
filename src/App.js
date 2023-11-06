import Main from "./pages/Main";
import Every from "./pages/Every";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Me from "./pages/Me";
import MyPage from "./pages/MyPage";
import Diary from "./pages/Diary";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Account from "./pages/Account";


import Write from "./pages/Write";

function App() {
  
  return (
    <div>
      {/* {modal ? <DiaryModal /> : <></>} */}
      <Header />
      <Routes>
        <Route path="/diary" element={<Diary />} />
        <Route path="/" element={<Main />} />
        <Route path="/every" element={<Every />} />
        <Route path="/me" element={<Me />} />
        <Route path="/mypage/:id" element={<MyPage />} />
        <Route path="/account/:id" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/write" element={<Write/>}/>
      </Routes>
    </div>
  );
}

export default App;
