import { Navbar, Title } from "../components";
import styles from "./ItemDetailPage.module.css";
import { useNavigate, useParams } from "react-router-dom";

const ItemDetailPage = () => {
  const { groupId, itemId } = useParams();
  const navigate = useNavigate();

  const backToGroupPage = () => {
    navigate(`/group/${groupId}`);
  };

  const goToEdit = () => {
    navigate(`/group/${groupId}/${itemId}/edit`)
  }

  const handleDelete = () => {
    
  }

  return (
    <>
      <Navbar></Navbar>
      <div className={styles.itemDetailPageContainer}>
        <Title title={`/${groupId}/${itemId}`} backFn={backToGroupPage}></Title>
        <div className={styles.detailContainer}>
          <div className={styles.itemDate}>時間</div>
          <div className={styles.itemNameAndAmount}>
            <p>名稱</p>
            <p>總金額</p>
          </div>
          <div className={styles.payer}>
            <p>支付者名稱</p>
            <p>支付者金額</p>
          </div>
          <hr />
          <div className={styles.owerContainer}>
            {/* users.map套進去 */}
            <div className={styles.ower}>
              <p>欠款者1 欠款</p>
              <p>欠款者金額</p>
            </div>
          </div>
          <div className={styles.itemControl}>
            <button className={styles.editBtn} onClick={goToEdit}>編輯</button>
            <button className={styles.deleteBtn} onClick={handleDelete}>刪除</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemDetailPage;
