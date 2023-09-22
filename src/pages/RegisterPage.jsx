import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import styles from './RegisterPage.module.css'


const RegisterPage = () => {
  const [account, setAccount] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] =useState('')
  const [pwdConfirm, setPwdConfirm] = useState('')
  const [isSubmit, setIsSubmit] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!account || !password || !email || !pwdConfirm) {
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
    console.log('submit!')
    setIsSubmit(true)
  }

  return (
    <>
      <h1>Split Wizard</h1>
      <div className={styles.formWrapper}>
        <h2>register</h2>
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
          <div className={styles.emailContainer}>
            <div className={styles.label}>email:</div>
            <input
              className={styles.input}
              type="email"
              placeholder="請輸入email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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
        <p>已經有帳號了?</p>
        <Link to="/login">
          <button className={styles.registerBtn}>返回登入</button>
        </Link>
      </div>
    </>
  );
};

export default RegisterPage;
