import Logo from "./Logo";
import styles from "./Sidebar.module.css";
import AppNav from "./AppNav";
import Footer from "./footer";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <p>List of cities</p>

      <Footer />
    </div>
  );
}
