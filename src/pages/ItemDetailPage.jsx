import { Navbar, Title } from "../components";
import styles from "./ItemDetailPage.module.css";
import { useNavigate, useParams } from "react-router-dom";

const dummyData = [
  {
    name: "一欄拉麵",
    amount: 6000,
    created_at: "2023/07/16",
    users: [
      {
        id: 1,
        name: "小呂",
        amount: 6000,
        payer: true,
      },
      {
        id: 2,
        name: "小薛",
        amount: 1500,
        payer: false,
      },
      {
        id: 3,
        name: "小莊",
        amount: 1500,
        payer: false,
      },
      {
        id: 4,
        name: "大呂",
        amount: 1500,
        payer: false,
      },
      {
        id: 5,
        name: "大莊",
        amount: 1500,
        payer: false,
      },
    ],
  },
];

const ItemDetailPage = () => {
  const { groupId, itemId } = useParams();
  const navigate = useNavigate();

  const [itemData] = dummyData;
  const [payer] = itemData.users.filter((user) => user.payer);
  const ower = itemData.users.filter((user) => !user.payer);

  const backToGroupPage = () => {
    navigate(`/group/${groupId}`);
  };

  const goToEdit = () => {
    navigate(`/group/${groupId}/${itemId}/edit`);
  };

  const handleDelete = () => {
    console.log("delete this Item!");
    // 傳送axios.delete
  };

  return (
    <>
      <Navbar></Navbar>
      <div className={styles.itemDetailPageContainer}>
        <Title title={`/${groupId}/${itemId}`} backFn={backToGroupPage}></Title>
        <div className={styles.detailContainer}>
          <div className={styles.itemDate}>{itemData.created_at}</div>
          <div className={styles.itemNameAndAmount}>
            <p>{itemData.name}</p>
            <p>${itemData.amount}</p>
          </div>
          <div className={styles.payerContainer}>
            <p className={styles.payerTitle}>支付者</p>
            <div className={styles.payer}>
              <p>{payer.name}</p>
              <p>${payer.amount}</p>
            </div>
          </div>
          <hr />
          <div className={styles.owerContainer}>
            {/* users.map套進去 */}
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
