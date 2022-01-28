import React from "react";
import styles from "../style/Loading.module.css";

function Loading(props) {
  return (
    <div className={props.loading ? styles.body_loading : styles.none}>
      <div
        className={styles.lds_ellipsis}
      >
        <div>Loading</div>
        <div>Loading</div>
      </div>
    </div>
  );
}

export default Loading;