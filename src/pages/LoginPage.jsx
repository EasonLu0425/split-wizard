import styles from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { axiosInstance, baseURL } from "../api/axiosInstance";
import { useAuth } from "../contexts/AuthContext";
import { useSocket } from "../contexts/SocketContext";
// import { socket } from "../socket";

const LoginPage = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const { login, isAuthenticated, currentMember } = useAuth();
  const { emitToServer} = useSocket()
  const navigate = useNavigate();

  const handleAccountInput = (e) => {
    const value = e.target.value;
    setAccount(value);
  };
  const handlePwdInput = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!account || !password) {
        Swal.fire({
          position: "center",
          title: "請完整輸入帳號密碼!",
          timer: 1000,
          icon: "error",
          showConfirmButton: false,
        });
        return;
      }
      const formData = {
        account,
        password,
      };
      setIsSubmit(true);
      // const { data } = await axiosInstance.post(`${baseURL}/login`, formData);

      const success = await login(formData); //有JWT之後把login判斷式換成api.auth跟authContext
      // localStorage.setItem("currentUserId", data.result.id);
      // if (data.status === "success") {
      if (success) {
        Swal.fire({
          position: "center",
          title: "登入成功",
          timer: 1000,
          icon: "success",
          showConfirmButton: false,
        });
        emitToServer("notificationToServer", "yeah!!!!");
        navigate("/groups");
      }
    } catch (err) {
      Swal.fire({
        position: "center",
        title: "請重新登入",
        timer: 1000,
        icon: "error",
        showConfirmButton: false,
      });
      setIsSubmit(false);
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/groups");
    }
  }, [navigate, isAuthenticated]);

  return (
    <>
      <h1>Split Wizard</h1>
      <div className={styles.formWrapper}>
        <h2>login</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.accountContainer}>
            <div className={styles.label}>email:</div>
            <input
              className={styles.input}
              type="email"
              placeholder="請輸入email"
              onChange={handleAccountInput}
              value={account}
            ></input>
          </div>
          <div className={styles.passwordContainer}>
            <div className={styles.label}>密碼:</div>
            <input
              className={styles.input}
              type="password"
              placeholder="請輸入密碼"
              onChange={handlePwdInput}
              value={password}
            ></input>
          </div>
          <button className={styles.loginBtn} type="submit" disabled={isSubmit}>
            登入
          </button>
        </form>
        <p>還沒有帳號?</p>
        <Link to="/register">
          <button className={styles.registerBtn}>註冊</button>
        </Link>
      </div>
    </>
  );
};

export default LoginPage;
