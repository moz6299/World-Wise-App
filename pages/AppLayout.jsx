import React from "react";
import styles from "./AppLayout.module.css";
import Sidebar from "./../components/Sidebar";
import Map from "../components/Map";
import User from "../components/User";

const AppLayout = () => {
  return (
    <div className={styles.app}>
      <User />
      <Sidebar />
      <Map />
    </div>
  );
};

export default AppLayout;
