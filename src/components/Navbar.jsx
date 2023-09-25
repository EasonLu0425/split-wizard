import { Link, useNavigate } from "react-router-dom";
import styles from "./Navebar.module.css";
import { useState } from "react";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  const handleHamburger = (e) => {
    setNavOpen(!navOpen);
  };

  return (
    <>
      <div className={styles.navContainer}>
        <div className="navHamburger" onClick={(e) => handleHamburger()}>
          <div className={styles.hamburger}></div>
        </div>
        <div className={styles.title}>
          <Link to="/">Split Wizard</Link>
        </div>
        <div className="notification">
          <div>bell</div>
          <div>dot</div>
        </div>
      </div>
      <div
        className={styles.navList}
        style={{ transform: `scaleX(${navOpen ? "1" : "0"})` }}
      >
        <div className={styles.listContainer}>
          <ul>
            <li>
              <Link to="/">我的行程</Link>
            </li>
            <li>
              <Link to="/">帳號管理</Link>
            </li>
            <li>
              <Link to='/'>已封存的行程</Link>
            </li>
          </ul>
          <form>
            <button className={styles.logoutBtn}>登出</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Navbar;
