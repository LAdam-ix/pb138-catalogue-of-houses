import { Route, Routes } from "react-router-dom";

import { MainIndex } from "./components/main";
import { SignUp } from "./components/sign/SignUp";
import { SignIn } from "./components/sign/SignIn";
import { UserProfile } from "./components/profiles/UserProfile";
import { DesignProfile } from "./components/profiles/DesignProfile";
import { AddDesign } from "./components/profiles/addDesign";
import { Payment } from "./components/buy/Payment";
import { Orders } from "./components/orders/orders";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainIndex />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/userProfile" element={<UserProfile />} />
      <Route path="/designProfile" element={<DesignProfile />} />
      <Route path="/addDesign" element={<AddDesign />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/userProfile/sentOrders" element={<Orders />} />
      <Route path="/userProfile/receivedOrders" element={<Orders />} />
    </Routes>
  )
}

export default App;
