import { useParams, useNavigate, Link } from "react-router-dom";
import { Navbar } from "../components"
import styles from './GroupPage.module.css'
import plusButton from "../images/plusBtn.svg";

const GropuPage = () => {
  const {groupId} = useParams()
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/");
  }

  const handleAddItem = () => {
    navigate(`/group/${groupId}/addItem`)
  }
  return (
    <>
      <Navbar></Navbar>
      <div className={styles.groupPageContainer}>
        <div className={styles.title}>
          <button className={styles.backArrow} onClick={goToHomePage}>
            &#8592;
          </button>
          <p className={styles.titleName}>groupName</p>
        </div>
        <div className={styles.itemsContainer}>
          <ul className={styles.itemsLi}>
          {/* 用items.map 排列出來，考慮分成一個小的component */}
            <li className={styles.item}>
            <Link to={`/group/${groupId}/itemId`} className={styles.itemLink}>
              <div className={styles.itemBox}>
                <p className={styles.itemName}>親子動泛</p>
                <p className={styles.itemDate}>2023/07/19</p>
                <p className={styles.itemAmount}>$ 99999</p>
                <p className={styles.itemPayer}>支付者: 機掰郎</p>
              </div>
            </Link>
            </li>
          </ul>
        </div>
        <div className={styles.plusBtn}>
          <button className={styles.plus} onClick={handleAddItem}>
            <img src={plusButton} alt="plusButton" />
          </button>
        </div>
      </div>
    </>
  );
}

export default GropuPage