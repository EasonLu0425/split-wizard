import { Navbar } from "../components";
import styles from "./HomePage.module.css";
import { Link, useNavigate } from "react-router-dom";
import plusButton from "../images/plusBtn.svg";
import { useEffect, useState } from "react";
import { getGroups } from "../api/groups";
import Swal from "sweetalert2";


const HomePage = () => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  const handleAddGroup = () => {
    navigate(`/groups/addGroup`);
  };

  useEffect(() => {


    const getGroupsAsync = async () => {
      try {
        const data = await getGroups();
        const groupsData = data.result;
        setGroups(groupsData.map((group) => ({ ...group })));
      } catch (err) {
        Swal.fire({
          position: "center",
          title: err.response,
          timer: 1000,
          icon: "error",
          showConfirmButton: false,
        });
      }
    };
    getGroupsAsync();
  }, []);
  return (
    <>
      <Navbar></Navbar>
      <div className={styles.homePageContainer}>
        <div className={styles.title}>
          <h3>我的行程</h3>
        </div>
        <div className={styles.listContainer}>
          {groups && groups.length > 0 ? (
            groups.map((group, index) => (
              <div key={`groupId:${group.id}`} className={styles.group}>
                <Link to={`/groups/${group.id}`}>
                  <div className={styles.groupName}>{group.name}</div>
                  <div className={styles.groupsMembers}>
                    成員:
                    {group.groupMembers.map((member, index) => (
                      <span key={`group${group.index}-${index}`}>
                        {member.name}
                        {index !== group.groupMembers.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div>您還没有行程喔!</div>
          )}
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
