import { useParams, useNavigate } from "react-router-dom";
import { ItemForm, Navbar, Title } from "../components";
import styles from "./AddItemPage.module.css";
import { ItemContext } from "../contexts/EditItemContext";
import { useContext } from "react";

const AddItemPage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { itemInfo } = useContext(ItemContext);
  const goToGroupPage = () => {
    navigate(`/groups/${groupId}`);
  };

  return (
    <>
      <Navbar></Navbar>
      <div className={styles.addItemPageContainer}>
        <Title title={`${itemInfo.groupName}/新增項目`} backFn={goToGroupPage}></Title>
        <div className={styles.addItemFormContainer}>
          <ItemForm isEdit={false} groupId={groupId}></ItemForm>
          <button className={styles.cancelBtn} onClick={goToGroupPage}>
            取消
          </button>
        </div>
      </div>
    </>
  );
};

export default AddItemPage;
