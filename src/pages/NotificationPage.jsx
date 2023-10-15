import { Link, useNavigate } from "react-router-dom";
import styles from "./NotificationPage.module.css";
import { useEffect, useState } from "react";
import bell from "../images/bell.svg";
import { axiosInstance, baseURL } from "../api/axiosInstance";
import Swal from "sweetalert2";
import { getAllNotifications, readNotification } from "../api/notifications";
import { addMemberToGroup } from "../api/userGroupConn";
import { socket } from "../socket";
import { relativeTime } from "../helpers/helper";
import { Navbar } from "../components";

const NotificationPage = () => {
  const [notis, setNotis] = useState([]);

  const handleRead = async (e, notiId) => {
    e.preventDefault();
    const readRes = await readNotification({ notiId });
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
        const readRes = await readNotification({ notiId });
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
      const readRes = await readNotification({ notiId });
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

  useEffect(() => {
    const getNotisAsync = async () => {
      try {
        const data = await getAllNotifications();
        setNotis([...data]);
      } catch (err) {
        console.error(err);
      }
    };
    getNotisAsync();

    // const socketNotiListener = (data) => {
    //   setNotis([data, ...notis]);
    // };

    // socket.on("notificationToClient", socketNotiListener);
    // return () => {
    //   socket.off("notificationToClient", socketNotiListener);
    // };
  }, []);
  return (
    <>
      <Navbar></Navbar>
      <div className={styles.notificationPageContainer}>
        <h2>notifications</h2>
        <div className={styles.listContainer}>
          <ul className={styles.notiLiContainer}>
            {notis.length > 0 ? (
              notis.map((noti) => (
                <li key={`noti:${noti.id}`}>
                  <div
                    className={styles.notiLi}
                    onClick={(e) => {
                      if (noti.type !== "INVITATION") {
                        handleRead(e, noti.id);
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
                      {relativeTime(noti.time)}
                    </span>
                  </div>
                </li>
              ))
            ) : (
              <p>沒有任何通知喔!</p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default NotificationPage;
