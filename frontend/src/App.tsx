import { Route, Routes } from "react-router-dom";

import { MainIndex } from "./components/main";
import { SignUp } from "./components/sign/SignUp";
import { SignIn } from "./components/sign/SignIn";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainIndex />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  )
}

export default App;
