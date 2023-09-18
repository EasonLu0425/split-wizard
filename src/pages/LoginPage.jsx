import styles from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <>
      <h1>Split Wizard</h1>
      <form>
        <div className={styles.accountContainer}>
          <div className={styles.label}>帳號:</div>
          <input
            className={styles.input}
            type="text"
            placeholder="請輸入帳號"
          ></input>
        </div>
        <div className={styles.passwordContainer}>
          <div className={styles.label}>密碼:</div>
          <input
            className={styles.input}
            type="password"
            placeholder="請輸入密碼"
          ></input>
        </div>
        <button className={styles.loginBtn} type="submit">
          登入
        </button>
      </form>
      <p>還沒有帳號?</p>
      <button className={styles.registerBtn}>註冊</button>
    </>
  );
};

export default LoginPage;
