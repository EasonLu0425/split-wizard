import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import styles from './RegisterPage.module.css'
import axios from 'axios'


const RegisterPage = () => {
  const [name, setName] = useState('')
  const [account, setaccount] = useState('')
  const [password, setPassword] =useState('')
  const [pwdConfirm, setPwdConfirm] = useState('')
  const [isSubmit, setIsSubmit] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!name || !password || !account || !pwdConfirm) {
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
      // const baseURL = "http://localhost:8081/splitwizard-SP-0.1";
      const baseURL = "http://localhost:5000/splitWizard";
      const formData = {
        name,
        account,
        password,
        passwordCheck: pwdConfirm
      };
      const { data } = await axios.post(`${baseURL}/register`, formData);
      setIsSubmit(true);
      if (data.status === 'success') {
        Swal.fire({
          position: "center",
          title: "註冊成功!",
          timer: 1000,
          icon: "success",
          showConfirmButton: false,
        });
        navigate('/login')
      } 
      // else {
      //   Swal.fire({
      //     position: "center",
      //     title: data.message,
      //     timer: 1000,
      //     icon: "error",
      //     showConfirmButton: false,
      //   });
      //   setIsSubmit(false);
      // }
    } catch(err) {
      const { data } = err.response;
      Swal.fire({
        position: "center",
        title: data.message,
        timer: 1000,
        icon: "error",
        showConfirmButton: false,
      });
      setIsSubmit(false);
    }
    
  }

  return (
    <>
      <h1>Split Wizard</h1>
      <div className={styles.formWrapper}>
        <h2>register</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.accountContainer}>
            <div className={styles.label}>名稱:</div>
            <input
              className={styles.input}
              type="text"
              placeholder="請輸入使用者名稱"
              onChange={(e) => setName(e.target.value)}
              value={name}
            ></input>
          </div>
          <div className={styles.accountContainer}>
            <div className={styles.label}>帳號(email):</div>
            <input
              className={styles.input}
              type="email"
              placeholder="請輸入email"
              onChange={(e) => setaccount(e.target.value)}
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
        <p>已經有帳號了?</p>
        <Link to="/login">
          <button className={styles.registerBtn}>返回登入</button>
        </Link>
      </div>
    </>
  );
};

export default RegisterPage;
