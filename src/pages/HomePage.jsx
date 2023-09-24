import { Navbar } from "../components";
import styles from './HomePage.module.css'
import { Link, useNavigate } from "react-router-dom";
import plusButton from "../images/plusBtn.svg";


const HomePage = () => {
  const navigate = useNavigate();
  const handleAddGroup = () => {
    
    navigate(`/group/addGroup`);
  }
  return (
    <>
      <Navbar></Navbar>
      <div className={styles.homePageContainer}>
        <div className={styles.title}>
          <h3>我的行程</h3>
        </div>
        <div className={styles.listContainer}>
          <div className={styles.group}>
            <Link to="/">
              <div className={styles.groupName}>Group Title</div>
              <div className={styles.groupsMembers}>成員:</div>
            </Link>
          </div>
        </div>
        <div className={styles.plusBtn}>
          <button className={styles.plus} onClick={handleAddGroup}>
            <img src={plusButton} alt="plusButton" />
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
