// components
import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import User from "../components/User";

// styles
import styles from "./AppLayout.module.css";

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}
