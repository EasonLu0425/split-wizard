import { useEffect, useState } from "react";
import { Navbar, Title } from "../components";
import styles from "./ItemDetailPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { getItem } from "../api/items";
import { formatDate } from "../helpers/helper";


const ItemDetailPage = () => {
  const { groupId, itemId } = useParams();
  const navigate = useNavigate();
  const [itemData, setItemData] = useState([]);
  const [payer, setPayer] = useState([])
  const [ower, setOwer] = useState([])

  const backToGroupPage = () => {
    navigate(`/groups/${groupId}`);
  };

  const goToEdit = () => {
    navigate(`/groups/${groupId}/${itemId}/edit`);
  };

  const handleDelete = () => {
    console.log("delete this Item!");
    // 傳送itemAPI.delete
  };

  useEffect(() => {
    const getItemAsync = async () => {
      try {
        const groupData = await getItem(groupId, itemId);
        setItemData(groupData)
        setPayer(groupData.users.filter(user => user.payer))
        setOwer(groupData.users.filter((user) => !user.payer));
      } catch (err) {
        console.error(err);
      }
    };
    getItemAsync();
  }, []);

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
          {payer.map((user, index) => (
            <div className={styles.payerContainer} key={`payer-${index}`}>
              <p className={styles.payerTitle}>支付者</p>
              <div className={styles.payer}>
                <p>{user.name}</p>
                <p>${user.amount}</p>
              </div>
            </div>
          ))}
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
            <button className={styles.editBtn} onClick={goToEdit}>
              編輯
            </button>
            <button className={styles.deleteBtn} onClick={handleDelete}>
              刪除
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemDetailPage;
