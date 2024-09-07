import Logo from "./Logo";
import styles from "./Sidebar.module.css";
import AppNav from "./AppNav";
import Footer from "./footer";
import { Outlet } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />

      <Footer />
    </div>
  );
}
