import { Route, Routes } from "react-router-dom";

import { MainIndex } from "./components/main";
import { SignUp } from "./components/sign/SignUp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainIndex />} />
      <Route path="signup" element={<SignUp />} />
    </Routes>
  )
}

export default App;
