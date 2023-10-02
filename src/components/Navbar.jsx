import { Link, useNavigate } from "react-router-dom";
import styles from "./Navebar.module.css";
import { useState } from "react";
import bell from '../images/bell.svg'
import { axiosInstance, baseURL } from "../api/axiosInstance";
import Swal from "sweetalert2";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [notiOpen, setNotiOpen] =useState(false)
  const navigate = useNavigate()

  const handleLogOut = async (e) => {
    try {
      e.preventDefault()
      const { data } = await axiosInstance.post(`${baseURL}/logout`);
      console.log('登出回傳',data)
      if (data.status === "success") {
        Swal.fire({
          position: "center",
          title: "登出成功!",
          timer: 1000,
          icon: "success",
          showConfirmButton: false,
        });
        navigate("/login");
      }
    } catch (err) {
      console.error(err)
    }
    
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
