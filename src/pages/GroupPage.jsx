import { useParams, useNavigate, Link } from "react-router-dom";
import { Navbar, Title } from "../components";
import styles from "./GroupPage.module.css";
import plusButton from "../images/plusBtn.svg";
import { useEffect, useState } from "react";
import { getGroup } from "../api/groups";
import { formatDate } from "../helpers/helper";

const GropuPage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState("");
  const [groupItems, setGroupItems] = useState([]);

  const goToHomePage = () => {
    navigate("/groups");
  };

  const handleAddItem = () => {
    navigate(`/groups/${groupId}/addItem`);
  };

  useEffect(() => {
    const getGroupAsync = async () => {
      try {
        const groupData = await getGroup(groupId);
        setGroupName(groupData.name);
        setGroupItems(groupData.Items);
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
                      <p className={styles.itemName}>{item.name}</p>
                      <p className={styles.itemDate}>
                        {formatDate(item.itemTime)}
                      </p>
                      <p className={styles.itemAmount}>$ {item.amount}</p>
                      <p className={styles.itemPayer}>
                        {item.ItemDetails[0].User.name} 先付 ${item.amount}
                      </p>
                    </div>
                  </Link>
                </li>
              ))
            ) : (
              <div>目前還沒有任何項目喔!</div>
            )}
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
};

export default GropuPage;
