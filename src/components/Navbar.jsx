import { Link, useNavigate } from "react-router-dom";
import styles from "./Navebar.module.css";
import { useState } from "react";
import bell from '../images/bell.svg'
import axios from 'axios'

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [notiOpen, setNotiOpen] =useState(false)

  const handleLogOut = async (e) => {
    // const baseURL = "http://localhost:8081/splitwizard-SP-0.1";
    const baseURL = "http://localhost:5000/splitWizard";
    const { data } = await axios.post(`${baseURL}/logout`)
    
  }

  return (
    <>
      <div className={styles.navContainer}>
        <div className="navHamburger" onClick={(e) => setNavOpen(!navOpen)}>
          <div className={styles.hamburger}></div>
        </div>
        <div className={styles.title}>
          <Link to="/">Split Wizard</Link>
        </div>
        <div className={styles.notification}>
          <div>
            <button
              className={styles.bellBtn}
              onClick={(e) => setNotiOpen(!notiOpen)}
            >
              <img src={bell}></img>
            </button>
          </div>
          <div className={styles.notiDot}></div>
          <div
            className={`${styles.modalContainer} ${
              notiOpen ? styles.notiShow : styles.notiHide
            }`}
          >
            <div className={styles.modal}>
              <ul className={styles.notiLiContainer}>
                <li>
                  <div className={styles.notiLi}>
                    <div className={styles.unreadDot}></div>
                    <p className={styles.notiContent}>小呂 邀請 您 至 日本行</p>
                    <div className={styles.notiControl}>
                      <button className={styles.notiYes}>同意</button>
                      <button className={styles.notiNo}>拒絕</button>
                    </div>
                  </div>
                </li>
              </ul>
              <button
                className={styles.moreNotiBtn}
                onClick={(e) => setNotiOpen(false)}
              >
                更多通知
              </button>
            </div>
          </div>
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
              <Link to="/manageAccount">帳號管理</Link>
            </li>
            <li>
              <Link to="/">已封存的行程</Link>
            </li>
          </ul>
          <form>
            <button className={styles.logoutBtn} onClick={handleLogOut}>登出</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Navbar;
