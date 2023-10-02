import { useNavigate, useParams} from "react-router-dom";
import { Navbar, Title, ItemForm } from "../components";
import styles from "./EditItemPage.module.css";
import { ItemContext } from "../contexts/EditItemContext";
import { useContext } from "react";

const EditItemPage = () => {
  const { groupId, itemId } = useParams();
  const navigate = useNavigate();
  const {
    itemInfo,
  } = useContext(ItemContext);
  const backToItem = () => {
    navigate(`/group/${groupId}/${itemId}`);
  };

  return (
    <>
        <Navbar></Navbar>
        <div className={styles.editItemPageContainer}>
          <Title
            title={`${itemInfo.groupName}/${itemInfo.itemName}/編輯`}
            backFn={backToItem}
          ></Title>
          <ItemForm isEdit={true} groupId={groupId} itemId={itemId}></ItemForm>
          <button className={styles.cancelBtn} onClick={backToItem}>
            取消
          </button>{" "}
        </div>
    </>
  );
};

export default EditItemPage;
