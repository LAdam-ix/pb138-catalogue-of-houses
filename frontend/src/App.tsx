import { Route, Routes } from "react-router-dom";

import { MainIndex } from "./components/main";
import { SignUp } from "./components/sign/SignUp";
import { SignIn } from "./components/sign/SignIn";
import { UserProfile } from "./components/profiles/UserProfile";
import { DesignProfile } from "./components/profiles/DesignProfile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainIndex />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/userProfile" element={<UserProfile />} />
      <Route path="/designProfile" element={<DesignProfile />} />
    </Routes>
  )
}

export default App;
