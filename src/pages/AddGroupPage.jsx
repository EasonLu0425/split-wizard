import { useEffect, useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { Navbar, Title } from "../components";
import styles from "./AddGroupPage.module.css";
import { getAllUsers } from "../api/users";
import { addGroup } from "../api/groups";
import Swal from "sweetalert2";

const AddGroupPage = () => {
  const [groupName, setGroupName] = useState('')
  const [selectedNames, setSelectedNames] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([])
  const navigate = useNavigate();

  const handleInputChange = (inputValue) => {
    setInputValue(inputValue);
  };

  const handleSelectChange = (selectedOptions) => {
    setSelectedNames(selectedOptions);
  };

  const goToHomePage = () => {
    navigate("/");
  };

  const handleAddGroup = async (e) => {
    try {
    e.preventDefault()
    console.log('selectedNames', selectedNames)
    console.log('groupName', groupName)
    const formData = {
      name: groupName,
      members: selectedNames
    }
    const res = await addGroup(formData)
    if (res.status === 'success') {
      Swal.fire({
        position: "center",
        title: res.message,
        timer: 1000,
        icon: "success",
        showConfirmButton: false,
      });
      navigate("/");
    }
    } catch(err) {
      const { data } = err.response;
      Swal.fire({
        position: "center",
        title: data.message,
        timer: 1000,
        icon: "error",
        showConfirmButton: false,
      });
    }
    
  }

  useEffect(() => {
    const getAllUserAsync = async ()=> {
      try {
        const allusers = await getAllUsers()
        const newOptions = allusers.map((user) => {
          return { value: user.id, label: user.name };
        });
        setOptions(newOptions);
      } catch(err) {
        console.error(err)
      }
    }
    getAllUserAsync()
  }, [])

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
            onChange={e=>setGroupName(e.target.value)}
          />
          <div>
            <p className={styles.formLabel}>邀請旅伴:</p>
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
