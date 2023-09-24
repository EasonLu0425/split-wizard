import styles from './ItemForm.module.css'

const User = () => {
  return (
    <>
      <div className={styles.user}>
        <div className={styles.userNameContainer}>
          <label>使用者1</label>
          <select>
            <option>小呂</option>
          </select>
        </div>
        <div className={styles.userAmountContainer}>
          <label>使用者1金額:</label>
          <input className={styles.userAmount} type="number" name="userAmount" />
        </div>
      </div>
    </>
  );
}

const ItemForm = (isEdit) => {
  const handleGoDutch = () => {};

  return (
    <>
      <form className={styles.itemForm}>
        <label>項目名稱</label>
        <input type="text" name="itemName" />
        <label>項目金額</label>
        <input type="number" name="itemAmount" />
        <label>支出者</label>
        <select className={styles.payerSelect}>
          <option>小呂</option>
          <option>大呂</option>
        </select>
        <button className={styles.goDutchBtn} onClick={handleGoDutch}>
          所有人平分此筆項目
        </button>
        <div className={styles.usersContainer}>
        {/* 到時候用users.map丟props進去 */}
          <User></User>
        </div>

        <button className={styles.addNewBtn} type="submit">
          新增
        </button>
      </form>
    </>
  );
};


export default ItemForm