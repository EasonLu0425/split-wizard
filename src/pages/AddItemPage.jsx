import { useParams, useNavigate } from "react-router-dom";
import { ItemForm, Navbar } from "../components";
import styles from "./AddItemPage.module.css";

const AddItemPage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const goToGroupPage = () => {
    navigate(`/group/${groupId}`);
  };

  const handleGoDutch = () => {};

  return (
    <>
      <Navbar></Navbar>
      <div className={styles.addItemPageContainer}>
        <div className={styles.title}>
          <button className={styles.backArrow} onClick={goToGroupPage}>
            &#8592;
          </button>
          <p className={styles.titleName}>groupName/新增項目</p>
        </div>
        <div className={styles.addItemFormContainer}>
          <ItemForm isEdit={false}></ItemForm>
          <button className={styles.cancelBtn} onClick={goToGroupPage}>取消</button>
        </div>
      </div>
    </>
  );
};

export default AddItemPage;
