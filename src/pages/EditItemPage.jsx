import { useNavigate, useParams } from "react-router-dom";
import { Navbar, Title, ItemForm } from "../components";
import styles from './EditItemPage.module.css'

const EditItemPage = () => {
  const { groupId, itemId } = useParams();
  const navigate = useNavigate();

  const backToItem = () => {
    navigate(`/group/${groupId}/${itemId}`)
  }

  return (
    <>
      <Navbar></Navbar>
      <div className={styles.editItemPageContainer}>
        <Title title={`/${groupId}/${itemId}/edit`} backFn={backToItem}></Title>
        <ItemForm isEdit={true}></ItemForm>
        <button className={styles.cancelBtn} onClick={backToItem}>取消</button>
      </div>
    </>
  );
}

export default EditItemPage