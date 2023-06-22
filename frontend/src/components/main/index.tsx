import "../../assets/styles/style.css";
import { Body } from "./Body";
import { Header } from "./Header";
import { Panel } from "./Panel";
import { Footer } from "../common/Footer";

export const MainIndex = () => {
  return (
    <>
      <Header />
      <Panel />
      <Body />
      <Footer />
    </>
  );
};
