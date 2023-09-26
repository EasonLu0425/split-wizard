import { useParams, useNavigate } from "react-router-dom";
import { ItemForm, Navbar, Title } from "../components";
import styles from "./AddItemPage.module.css";

const AddItemPage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const goToGroupPage = () => {
    navigate(`/group/${groupId}`);
  };


  return (
    <>
      <Navbar></Navbar>
      <div className={styles.addItemPageContainer}>
        <Title title="groupName/新增項目" backFn={goToGroupPage}></Title>
        <div className={styles.addItemFormContainer}>
          <ItemForm isEdit={false}></ItemForm>
          <button className={styles.cancelBtn} onClick={goToGroupPage}>
            取消
          </button>
        </div>
      </div>
    </>
  );
};

export default AddItemPage;
