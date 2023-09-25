import { useState } from "react";
import Select from "react-select";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Navbar, Title } from "../components";
import styles from "./AddGroupPage.module.css";

const AddGroupPage = () => {
  const [selectedNames, setSelectedNames] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();


  const options = [
    { value: "John", label: "John" },
    { value: "Jane", label: "Jane" },
    { value: "Alice", label: "Alice" },
    // 添加更多人名
  ];

  const handleInputChange = (inputValue) => {
    setInputValue(inputValue);
  };

  const handleSelectChange = (selectedOptions) => {
    setSelectedNames(selectedOptions);
  };

  const goToHomePage = () => {
    navigate("/");
  };

  return (
    <>
      <Navbar></Navbar>
      <div className={styles.addGroupPageContainer}>
        <Title title="新增行程" backFn={goToHomePage}></Title>
        <form className={styles.addGroupForm}>
          <label className={styles.formLabel}>行程名稱:</label>
          <input
            type="text"
            placeholder="請輸入行程名稱"
            className={styles.groupNameInput}
          />
          <div>
            <p className={styles.formLabel}>邀請旅伴(最多10位):</p>
            <Select
              isMulti
              options={options}
              value={selectedNames}
              inputValue={inputValue}
              onInputChange={handleInputChange}
              onChange={handleSelectChange}
              placeholder="輸入e-mail並選擇用戶"
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
