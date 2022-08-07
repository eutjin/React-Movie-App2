import React, { useEffect, useRef } from "react";
import styles from "./Modal2.module.css";

function Modal2({ setModal2 }) {

  const refModal = useRef(null);

  useEffect(() => {
    document.body.addEventListener("click", closer, true);

    return () => document.body.removeEventListener("click", closer, true);
  }, []);

 

  const closer = (e) => {
    // if(e.path[0] !== refModal.current){
    //   // setModal2(false)
    // }

    console.log("REFMODAL",refModal.current)
    if (refModal.current.contains(e.target)) {
      // setModal2(false)
      console.log("inside bruh");
    } else {
      setModal2(false)
    }
    console.log("ETARGET", e.target);
  };

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer} ref={refModal}>
        <div className={styles.title}>
          <h2>Share this movie</h2>
        </div>
        <div className={styles.body}>
          <form>
            <input
              type="text"
              className={styles.form}
              value={window.location.href}
            />
            <button
              type="button"
              className={styles.copybtn}
              onClick={() =>
                navigator.clipboard.writeText(window.location.href)
              }
            >
              <h4>Copy</h4>
            </button>
          </form>
        </div>
        <div className={styles.closebtn}>
          <button
            onClick={() => {
              setModal2(false);
            }}
            id="cancelBtn"
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal2;
