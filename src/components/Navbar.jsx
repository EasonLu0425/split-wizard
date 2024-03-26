import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useEffect, useState, useRef } from "react";
import bell from "../images/bell.svg";
import { axiosInstance, baseURL } from "../api/axiosInstance";
import Swal from "sweetalert2";
import { getNotifications, readNotification } from "../api/notifications";
import { addMemberToGroup } from "../api/userGroupConn";
import { socket } from "../socket";
import { useAuth, currentMember } from "../contexts/AuthContext";
import { relativeTime } from "../helpers/helper";

const Navbar = () => {
  const modalOverlayRef = useRef(null);
  const [navOpen, setNavOpen] = useState(false);
  const [notiOpen, setNotiOpen] = useState(false);
  const [notis, setNotis] = useState([]);
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axiosInstance.post(`${baseURL}/memberLogout`);
      logout();
      console.log("登出回傳", data);
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
      console.error(err);
    }
  };

  const acceptInvite = async (e, groupId, notiId) => {
    try {
      e.preventDefault();
      const currentUserId = localStorage.getItem("currentUserId");
      const addMTGData = {
        memberId: currentUserId,
        groupId,
      };
      const addRes = await addMemberToGroup(addMTGData);
      if (addRes.status) {
        Swal.fire({
          position: "center",
          title: "加入成功!",
          timer: 1000,
          icon: "success",
          showConfirmButton: false,
        });
        const readRes = await readNotification({ id: notiId });
        if (readRes.status === "success") {
          setNotis(
            notis.map((noti) => {
              if (noti.id === notiId) {
                return {
                  ...noti,
                  read: true,
                };
              } else {
                return noti;
              }
            })
          );
        }
        window.location.reload();
      }
    } catch (err) {
      Swal.fire({
        position: "center",
        title: "加入失敗，請稍後再試",
        timer: 1000,
        icon: "error",
        showConfirmButton: false,
      });
    }
  };

  const handleReject = async (e, notiId) => {
    try {
      e.preventDefault();
      const readRes = await readNotification({ id: notiId });
      if (readRes.status === "success") {
        Swal.fire({
          position: "center",
          title: "已拒絕加入!",
          timer: 1000,
          icon: "success",
          showConfirmButton: false,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRead = async (e, notiId, notiRead) => {
    e.preventDefault();
    //  如果已經已讀，就不要再傳post已讀
    if (notiRead) return;
    const readRes = await readNotification({ id: notiId });
    if (readRes.status === "success") {
      setNotis(
        notis.map((noti) => {
          if (noti.id === notiId) {
            return {
              ...noti,
              read: true,
            };
          } else {
            return noti;
          }
        })
      );
    }
  };

  const handleMoreNoti = (e) => {
    e.preventDefault();
    navigate("/notifications");
  };

  const handleClickOutside = (e) => {
    if (notiOpen) {
      console.log(e.target);
      if (modalOverlayRef.current === e.target) {
        setNotiOpen(false);
        return;
      }
    }
  };

  useEffect(() => {
    const getNotisAsync = async () => {
      try {
        const data = await getNotifications();
        setNotis([...data]);
      } catch (err) {
        console.error(err);
      }
    };
    getNotisAsync();
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      handleClickOutside(e);
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [notiOpen]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  return (
    <>
      <div className={styles.navContainer}>
        <div
          className={styles.navHamburger}
          onClick={(e) => setNavOpen(!navOpen)}
        >
          <div className={styles.hamburger}></div>
        </div>
        <div className={styles.title}>
          <Link to="/groups">Split Wizard</Link>
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
          <div
            className={styles.notiDot}
            style={{
              display:
                notis.length === 0 || notis.every((noti) => noti.read === true)
                  ? "none"
                  : "block",
            }}
          ></div>
          {/* notiList */}
          <div
            className={`${styles.modalContainer} ${
              notiOpen ? styles.notiShow : styles.notiHide
            }`}
          >
            <div className={styles.modal}>
              <ul className={styles.notiLiContainer}>
                {notis.length > 0 ? (
                  notis.map((noti) => (
                    <li key={`noti:${noti.id}`}>
                      <div
                        className={styles.notiLi}
                        onClick={(e) => {
                          if (!noti.read && noti.type !== "INVITATION") {
                            handleRead(e, noti.id, noti.read);
                          }
                        }}
                      >
                        {noti.read === false && (
                          <div className={styles.unreadDot}></div>
                        )}
                        <p className={styles.notiContent}>{noti.text}</p>
                        {noti.type === "INVITATION" &&
                          (!noti.read ? (
                            <div className={styles.notiControl}>
                              <button
                                className={styles.notiYes}
                                onClick={(e) =>
                                  acceptInvite(e, noti.groupId, noti.id)
                                }
                              >
                                同意
                              </button>
                              <button
                                className={styles.notiNo}
                                onClick={(e) => handleReject(e, noti.id)}
                              >
                                拒絕
                              </button>
                            </div>
                          ) : (
                            <p className={styles.repliedTxt}>已回覆邀請</p>
                          ))}
                        <span className={styles.notiTime}>
                          {relativeTime(noti.createdTime)}
                        </span>
                      </div>
                    </li>
                  ))
                ) : (
                  <p>沒有任何通知喔!</p>
                )}
              </ul>
              <button
                className={styles.moreNotiBtn}
                onClick={(e) => handleMoreNoti(e)}
              >
                更多通知
              </button>
            </div>
          </div>
          <div
            ref={modalOverlayRef}
            className={notiOpen ? styles.modalOverlay : styles.hideOverlay}
            onClick={handleClickOutside}
          ></div>
        </div>
      </div>
      {/* navlist */}
      <div
        className={styles.navList}
        style={{ transform: `scaleX(${navOpen ? "1" : "0"})` }}
      >
        <div className={styles.listContainer}>
          <ul>
            {/* 要新增hello, currentUserNaem(#UID) */}
            <li>
              <Link to="/groups">我的行程</Link>
            </li>
            <li>
              <Link to="/manageAccount">帳號管理</Link>
            </li>
            <li>
              <Link to="/groups">已封存的行程</Link>
            </li>
          </ul>
          <button className={styles.logoutBtn} onClick={handleLogOut}>
            登出
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
