import { useEffect, useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { Navbar, Title } from "../components";
import styles from "./AddGroupPage.module.css";
import { getAllUsers } from "../api/users";
import { addGroup } from "../api/groups";
import { addMemberToGroup } from "../api/userGroupConn";
import Swal from "sweetalert2";
import { addNotification } from "../api/notifications";
import { useSocket } from "../contexts/SocketContext";

const AddGroupPage = () => {
  const [groupName, setGroupName] = useState("");
  const [selectedNames, setSelectedNames] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const {emitToServer} = useSocket()
  const navigate = useNavigate();

  const handleInputChange = (inputValue) => {
    setInputValue(inputValue);
  };

  const handleSelectChange = (selectedOptions) => {
    setSelectedNames(selectedOptions);
  };

  const goToHomePage = () => {
    navigate("/groups");
  };

  const handleAddGroup = async (e) => {
    try {
      e.preventDefault();
      const groupData = {
        name: groupName,
      };
      if (!groupName) throw new Error("請輸入行程名稱!");
      if (selectedNames.length === 0) throw new Error("請選擇至少一位旅伴!");
      const newGroupData = await addGroup(groupData);
      const currentUserId = localStorage.getItem("currentUserId");
      const selectedUsers = selectedNames.map((user) => (user.value));
      const addNotiData = {
        type: "INVITATION",
        receiverIds: selectedUsers,
        groupId: newGroupData.result.id,
      };
      const addMTGData = {
        memberId: currentUserId,
        groupId: newGroupData.result.id,
      };
      const addNotiRes = await addNotification(addNotiData);
      const addMTGRes = await addMemberToGroup(addMTGData);
      if (addMTGRes.status === "success" && addNotiRes.status === "success") {
        Swal.fire({
          position: "center",
          title: "創建行程成功",
          timer: 1000,
          icon: "success",
          showConfirmButton: false,
        });
        emitToServer("notificationToServer", {receiverIds: selectedUsers});
        navigate("/groups");
      }
    } catch (err) {
      console.log(err.message);
      Swal.fire({
        position: "center",
        title: err.message || "發生錯誤，請稍後再試",
        timer: 1000,
        icon: "error",
        showConfirmButton: false,
      });
    }
  };

  useEffect(() => {
    const getAllUserAsync = async () => {
      try {
        const data = await getAllUsers();
        const allusers = data.result;
        const newOptions = allusers.map((user) => {
          return { value: user.id, label: `${user.name}(${user.uid})` };
        });
        setOptions(newOptions);
      } catch (err) {
        console.error(err);
      }
    };
    getAllUserAsync();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className={styles.addGroupPageContainer}>
        <Title title="新增行程" backFn={goToHomePage}></Title>
        <form className={styles.addGroupForm} onSubmit={handleAddGroup}>
          <label className={styles.formLabel}>行程名稱:</label>
          <input
            type="text"
            placeholder="請輸入行程名稱"
            className={styles.groupNameInput}
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <div>
            <label className={styles.formLabel}>邀請旅伴:</label>
            <Select
              isMulti
              options={options}
              value={selectedNames}
              inputValue={inputValue}
              onInputChange={handleInputChange}
              onChange={handleSelectChange}
              placeholder="輸入使用者名稱並選擇用戶"
              className={styles.usersSelect}
            />
          </div>
          <button type="submit" className={styles.addGroupBtn}>
            新增行程
          </button>
        </form>
        <button className={styles.cancelBtn} onClick={goToHomePage}>
          取消
        </button>
      </div>
    </>
  );
};

export default AddGroupPage;
