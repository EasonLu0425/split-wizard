import { Navbar } from "../components"
import { useState } from "react";
import styles from './ManageAccountPage.module.css'
import Swal from "sweetalert2";

const ManageAccountPage = () => {
   const [account, setAccount] = useState("");
   const [password, setPassword] = useState("");
   const [pwdConfirm, setPwdConfirm] = useState("");
   const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!account || !password || !pwdConfirm) {
      Swal.fire({
        position: "center",
        title: "每一項都是必填喔!",
        timer: 1000,
        icon: "error",
        showConfirmButton: false,
      });
      return;
    }
    if (password !== pwdConfirm) {
      Swal.fire({
        position: "center",
        title: "密碼與確認密碼不一致!",
        timer: 1000,
        icon: "error",
        showConfirmButton: false,
      });
      return;
    }
    console.log("submit!");
    setIsSubmit(true);
  };
  return (
    <>
      <Navbar></Navbar>
      <div className={styles.manageAccountPageContainer}>
        <h2>帳號設定</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.accountContainer}>
            <div className={styles.label}>帳號:</div>
            <input
              className={styles.input}
              type="text"
              placeholder="請輸入帳號"
              onChange={(e) => setAccount(e.target.value)}
              value={account}
            ></input>
          </div>
          <div className={styles.passwordContainer}>
            <div className={styles.label}>密碼:</div>
            <input
              className={styles.input}
              type="password"
              placeholder="請輸入密碼"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            ></input>
          </div>
          <div className={styles.pwdConfirmContainer}>
            <div className={styles.label}>確認密碼:</div>
            <input
              className={styles.input}
              type="password"
              placeholder="請再次輸入密碼"
              onChange={(e) => setPwdConfirm(e.target.value)}
              value={pwdConfirm}
            ></input>
          </div>
          <button className={styles.loginBtn} type="submit" disabled={isSubmit}>
            註冊
          </button>
        </form>
      </div>
    </>
  );
}

export default ManageAccountPage