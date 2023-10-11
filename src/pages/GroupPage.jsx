import { useParams, useNavigate, Link } from "react-router-dom";
import { Navbar, Title } from "../components";
import styles from "./GroupPage.module.css";
import plusButton from "../images/plusBtn.svg";
import { useEffect, useState } from "react";
import { getGroup, resetGroupRedirect } from "../api/groups";
import { formatDate } from "../helpers/helper";
import { createResult } from "../api/result";
import Swal from "sweetalert2";

const GropuPage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState("");
  const [groupItems, setGroupItems] = useState([]);
  const [isSettled, setIsSettled] = useState(false);
  const [isArchive, setIsArchive] = useState(false)

  const goToHomePage = () => {
    navigate("/groups");
  };

  const handleAddItem = () => {
    if (isSettled) {
      Swal.fire({
        title: "已經結算過了，新增後會刪除分帳結果",
        text: "確定要再新增嗎?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1B4965",
        cancelButtonColor: "#e56b6f",
        confirmButtonText: "新增!",
        cancelButtonText: "取消",
      }).then(async (result) => {
        try {
          if (result.isConfirmed) {
            const resetRedirectRes = await resetGroupRedirect(groupId);
            if (resetRedirectRes.status === "success") {
              navigate(`/groups/${groupId}/addItem`);
            }
          }
        } catch (err) {
          console.error(err);
        }
      });
    } else {
      navigate(`/groups/${groupId}/addItem`);
    }
  };

  const onSettleClick = async (e) => {
    e.preventDefault();
    if (isSettled) {
      navigate(`/groups/${groupId}/settle`);
    } else {
      const createRes = await createResult(groupId);
      if (createRes.status === "success") {
        navigate(`/groups/${groupId}/settle`);
      }
    }
  };

  useEffect(() => {
    const getGroupAsync = async () => {
      try {
        const groupData = await getGroup(groupId);
        console.log(groupData.items)
        setGroupName(groupData.name);
        setGroupItems(groupData.items);
        setIsSettled(groupData.redirect);
        setIsArchive(groupData.archive)
      } catch (err) {
        console.error(err);
      }
    };
    getGroupAsync();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className={styles.groupPageContainer}>
        <Title title={`${groupName}`} backFn={goToHomePage}></Title>
        <div className={styles.itemsContainer}>
          <ul className={styles.itemsLi}>
            {groupItems && groupItems.length > 0 ? (
              groupItems.map((item) => (
                <li
                  className={styles.item}
                  key={`group${groupId}-item${item.id}`}
                >
                  <Link
                    to={`/groups/${groupId}/${item.id}`}
                    className={styles.itemLink}
                  >
                    <div className={styles.itemBox}>
                      <p className={styles.itemName}>{item.itemName}</p>
                      <p className={styles.itemDate}>
                        {formatDate(item.itemTime)}
                      </p>
                      <p className={styles.itemAmount}>$ {item.itemAmount}</p>
                      <div className={styles.itemPayerWrapper}>
                        {item.details.map((user) => (
                          <p
                            className={styles.itemPayer}
                            key={`payer${user.member.id}`}
                          >
                            {user.member.name} 先付 ${user.amount}
                          </p>
                        ))}
                      </div>
                    </div>
                  </Link>
                </li>
              ))
            ) : (
              <div>目前還沒有任何項目喔!</div>
            )}
          </ul>
          {groupItems && groupItems.length > 0 ? (
            <div>
              <button className={styles.settleBtn} onClick={onSettleClick}>
                結算
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className={styles.plusBtn}>
          {!isArchive && (
            <button className={styles.plus} onClick={handleAddItem}>
              <img src={plusButton} alt="plusButton" />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default GropuPage;
