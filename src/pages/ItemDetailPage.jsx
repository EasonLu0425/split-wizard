import { useEffect, useState } from "react";
import { Navbar, Title } from "../components";
import styles from "./ItemDetailPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { getItem, deleteItem } from "../api/items";
import { deleteItemDetails } from "../api/itemDetails";
import { formatDate } from "../helpers/helper";
import Swal from "sweetalert2";
import { resetGroupRedirect } from "../api/groups";
import { addNotification } from "../api/notifications";

const ItemDetailPage = () => {
  const { groupId, itemId } = useParams();
  const navigate = useNavigate();
  const [itemData, setItemData] = useState([]);
  const [payer, setPayer] = useState([]);
  const [ower, setOwer] = useState([]);

  const backToGroupPage = () => {
    navigate(`/groups/${groupId}`);
  };

  const goToEdit = () => {
    if (itemData.groupRedirect) {
      Swal.fire({
        title: "已經結算過了，修改後會刪除分帳結果",
        text: "確定要修改嗎?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1B4965",
        cancelButtonColor: "#e56b6f",
        confirmButtonText: "修改!",
        cancelButtonText: "取消",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const resetRedirectRes = await resetGroupRedirect(groupId);
            if (resetRedirectRes.status === "success") {
              navigate(`/groups/${groupId}/${itemId}/edit`);
            }
          } catch (err) {
            console.error(err);
          }
        }
      });
    } else {
      navigate(`/groups/${groupId}/${itemId}/edit`);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "擁有的帳單一去不復返",
      text: "確定要刪除嗎?!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1B4965",
      cancelButtonColor: "#e56b6f",
      confirmButtonText: "delete!",
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          const deleteItemRes = await deleteItem(groupId, itemId);
          if (deleteItemRes.status === "success") {
            if (itemData.groupRedirect) {
              await resetGroupRedirect(groupId);
            }
            const addNotiData = {
              type: "ITEM_DELETE",
              receiverIds: [],
              groupId: groupId,
            };
            itemData.groupMembers.forEach((member) => {
              addNotiData.receiverIds.push(member.id);
            });
            if (itemData.groupRedirect) {
              await resetGroupRedirect(groupId);
            }
            await addNotification(addNotiData);
            Swal.fire({
              position: "center",
              title: "刪除項目成功",
              timer: 1000,
              icon: "success",
              showConfirmButton: false,
            });
            navigate(`/groups/${groupId}`);
          }
        }
      } catch (err) {
        console.error(err);
      }
    });
  };

  useEffect(() => {
    const getItemAsync = async () => {
      try {
        const groupData = await getItem(groupId, itemId);
        setItemData(groupData);
        setPayer(groupData.details.filter((user) => user.payer));
        setOwer(groupData.details.filter((user) => !user.payer));
      } catch (err) {
        console.error(err);
      }
    };
    getItemAsync();
  }, []);
  console.log(itemData);

  return (
    <>
      <Navbar></Navbar>
      <div className={styles.itemDetailPageContainer}>
        <Title
          title={`${itemData.groupName}/${itemData.itemName}`}
          backFn={backToGroupPage}
        ></Title>
        <div className={styles.detailContainer}>
          <div className={styles.itemDate}>{formatDate(itemData.itemTime)}</div>
          <div className={styles.itemNameAndAmount}>
            <p>{itemData.itemName}</p>
            <p>${itemData.amount}</p>
          </div>
          <div className={styles.payerContainer}>
            <p className={styles.payerTitle}>支付者</p>
            {payer.map((user, index) => (
              <div className={styles.payer} key={`payer-${index}`}>
                <p>{user.name}</p>
                <p>${user.amount}</p>
              </div>
            ))}
          </div>
          <hr />
          <div className={styles.owerContainer}>
            <div className={styles.owers}>
              <p className={styles.owerTitle}>使用者</p>
              {ower.map((user, index) => (
                <div className={styles.ower} key={`ower-${index}`}>
                  <p>{user.name} 使用</p>
                  <p>$ {user.amount}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.itemControl}>
            {itemData.groupArchive === false && (
              <>
                <button className={styles.editBtn} onClick={goToEdit}>
                  編輯
                </button>
                <button className={styles.deleteBtn} onClick={handleDelete}>
                  刪除
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemDetailPage;
