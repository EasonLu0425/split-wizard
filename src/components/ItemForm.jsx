import styles from "./ItemForm.module.css";
import React, { useEffect, useContext } from "react";
import { getItem } from "../api/items";
import { getGroupMembers, getGroup } from "../api/groups";
import { useNavigate } from "react-router-dom";
import { ItemContext } from "../contexts/EditItemContext";
import Swal from "sweetalert2";
import { postItem, putItem } from "../api/items";
import { postItemDetails, putItemDetails } from "../api/itemDetails";

const User = ({ role, allUsers, user, index, onChange, onDeleteUser }) => {
  const handleUserChange = (event) => {
    const { name, value } = event.target;
    onChange(index, name, value, user.id);
  };

  return (
    <>
      <div className={styles.user}>
        <button
          className={styles.deleteUser}
          onClick={(e) => onDeleteUser(e, index, role)}
        >
          x
        </button>
        <div className={styles.userNameContainer}>
          <label>
            {`${role === "payer" ? "支付者" : "使用者"}${index + 1}`}
          </label>
          <select onChange={handleUserChange} value={user.id} name={`${role}`}>
            {allUsers.map((oneUser) => {
              return (
                <option key={`user-${index}-${oneUser.id}`} value={oneUser.id}>
                  {oneUser.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles.userAmountContainer}>
          <label>
            {`${
              role === "payer"
                ? `支付者${index + 1}金額`
                : `使用者${index + 1}金額`
            }`}
            :
          </label>
          <input
            className={styles.userAmount}
            type="number"
            name={`${role}Amount`}
            value={user.amount}
            onChange={handleUserChange}
          />
        </div>
      </div>
    </>
  );
};

const ItemForm = ({ isEdit, groupId, itemId }) => {
  const {
    itemInfo,
    groupmembers,
    receiveItemData,
    receiveGroupMembers,
    receiveGroupTitle,
    handleInputChange,
    handleOwerChange,
    handlePayerChange,
    resetItemInfo,
  } = useContext(ItemContext);
  const navigate = useNavigate();
  const handleUserChange = (index, name, value, id) => {
    if (name === "ower") {
      const [nextUser] = groupmembers.filter(
        (user) => user.id === Number(value)
      );
      const nextOwer = [...itemInfo.ower];
      nextOwer[index] = {
        ...nextOwer[index],
        name: nextUser.name,
        id: nextUser.id,
      };
      handleOwerChange(nextOwer);
    } else if (name === "owerAmount") {
      const nextOwer = itemInfo.ower.map((user) => {
        if (user.id === id) {
          return {
            ...user,
            amount: value,
          };
        } else {
          return user;
        }
      });
      handleOwerChange(nextOwer);
    } else if (name === "payer") {
      const [nextUser] = groupmembers.filter(
        (user) => user.id === Number(value)
      );
      const nextPayer = [...itemInfo.payer];
      nextPayer[index] = {
        ...nextPayer[index],
        name: nextUser.name,
        id: nextUser.id,
        payer: true,
      };
      handlePayerChange(nextPayer);
    } else if (name === "payerAmount") {
      const nextPayer = itemInfo.payer.map((user) => {
        if (user.id === id) {
          return {
            ...user,
            amount: value,
          };
        } else {
          return user;
        }
      });
      handlePayerChange(nextPayer);
    }
  };
  const handleGoDutch = (e) => {
    e.preventDefault();
    const dutchedAmount = itemInfo.itemAmount / groupmembers.length;
    const nextOwer = groupmembers.map((user) => {
      return {
        id: user.id,
        name: user.name,
        amount: dutchedAmount,
        payer: false,
      };
    });
    handleOwerChange(nextOwer);
  };

  const addOwer = (e) => {
    e.preventDefault();
    const newUser = {
      id: groupmembers[0].id,
      name: groupmembers[0].name,
      amount: 0,
      payer: false,
    };
    handleOwerChange([...itemInfo.ower, newUser]);
  };
  const addPayer = (e) => {
    e.preventDefault();
    const newUser = {
      id: groupmembers[0].id,
      name: groupmembers[0].name,
      amount: 0,
      payer: true,
    };
    handlePayerChange([...itemInfo.payer, newUser]);
  };

  const handleDeleteUser = (e, index, role) => {
    e.preventDefault();
    if (role === "ower") {
      const updatedOwer = itemInfo.ower.filter((user, idx) => idx !== index);
      handleOwerChange(updatedOwer);
    } else if (role === "payer") {
      const updatedPayer = itemInfo.payer.filter((user, idx) => idx !== index);
      handlePayerChange(updatedPayer);
    }
  };

  const handleItemSubmit = async (e) => {
    try {
      e.preventDefault();
      if (
        itemInfo.itemAmount === 0 ||
        !itemInfo.itemName ||
        itemInfo.payer.length === 0 ||
        itemInfo.ower.length === 0
      ) {
        throw new Error("每一項都是必填喔!");
      }

      let payerTotalAmount = 0;
      itemInfo.payer.forEach(
        (user) => (payerTotalAmount += Number(user.amount))
      );
      if (Number(itemInfo.itemAmount) !== payerTotalAmount) {
        throw new Error("支付者的加總金額不對!");
      }

      let owerTotalAmount = 0;
      itemInfo.ower.forEach((user) => (owerTotalAmount += Number(user.amount)));
      if (Number(itemInfo.itemAmount) !== owerTotalAmount) {
        throw new Error("使用者加總金額不對!");
      }

      const ItemData = {
        itemTime: `${itemInfo.itemDate} ${itemInfo.itemTime}`,
        itemName: itemInfo.itemName,
        itemAmount: itemInfo.itemAmount,
      };
      // 傳送axios.put 給後端

      if (isEdit) {
        const editItemRes = await putItem(ItemData, groupId, itemId);
        if (editItemRes.status === "success") {
          const editItemDetailsData = {
            itemId: itemId,
            payer: itemInfo.payer,
            ower: itemInfo.ower,
          };
          const editItemDetailsRes = await putItemDetails(
            editItemDetailsData,
            groupId,
            itemId
          );
          if (editItemDetailsRes.status === "success") {
            Swal.fire({
              position: "center",
              title: "修改成功",
              timer: 1000,
              icon: "success",
              showConfirmButton: false,
            });
          }
          navigate(`/groups/${groupId}`);
        }
      } else {
        
        const addItemData = await postItem(ItemData, groupId);
        if (addItemData.status === "success") {
          const addItemDetailsData = {
            
            payer: itemInfo.payer,
            ower: itemInfo.ower,
          };
          const newItemId = addItemData.result.id;
          const addItemDetailsRes = await postItemDetails(
            addItemDetailsData,
            groupId,
            newItemId
          );
          if (addItemDetailsRes.status === "success") {
            Swal.fire({
              position: "center",
              title: "新增成功",
              timer: 1000,
              icon: "success",
              showConfirmButton: false,
            });
            navigate(`/groups/${groupId}`);
          }
        }
      }
    } catch (err) {
      Swal.fire({
        position: "center",
        title: err.message,
        timer: 1000,
        icon: "error",
        showConfirmButton: false,
      });
    }
  };

  useEffect(() => {
    if (isEdit === true && groupId && itemId) {
      const getItemAsync = async () => {
        try {
          const groupData = await getItem(groupId, itemId);
          receiveItemData(groupData);
        } catch (err) {
          console.error(err);
        }
      };
      getItemAsync();
    } else if (!isEdit) {
      const getGroupAsync = async () => {
        try {
          const groupData = await getGroup(groupId);
          receiveGroupTitle(groupData.name);
        } catch (err) {
          console.error(err);
        }
      };
      getGroupAsync();
    }
    const getgroupmembersAsync = async () => {
      try {
        const members = await getGroupMembers(groupId);
        receiveGroupMembers(members);
      } catch (err) {
        console.error(err);
      }
    };
    getgroupmembersAsync();

    return () => {
      resetItemInfo();
    };
  }, []);

  return (
    <>
      <form className={styles.itemForm} onSubmit={handleItemSubmit}>
        <div className={styles.itemDate}>
          <label>項目日期</label>
          <input
            type="date"
            name="itemDate"
            value={itemInfo.itemDate}
            onChange={(e) => handleInputChange(e)}
          />
          <label>項目時間</label>
          <input
            type="time"
            name="itemTime"
            value={itemInfo.itemTime}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <label>項目名稱</label>
        <input
          type="text"
          name="itemName"
          value={itemInfo.itemName}
          onChange={(e) => handleInputChange(e)}
        />
        <label>項目金額</label>
        <input
          type="number"
          name="itemAmount"
          value={itemInfo.itemAmount}
          onChange={(e) => handleInputChange(e)}
        />
        <label>支付者</label>
        <div className={styles.usersContainer}>
          {itemInfo.payer &&
            itemInfo.payer.map((user, index) => (
              <User
                key={`payer-userId:${user.id}-${index}`}
                role={`payer`}
                allUsers={groupmembers}
                user={user}
                index={index}
                onDeleteUser={handleDeleteUser}
                onChange={handleUserChange}
              ></User>
            ))}
          <button className={styles.addPayerBtn} onClick={addPayer}>
            新增支付者
          </button>
        </div>
        <button className={styles.goDutchBtn} onClick={handleGoDutch}>
          所有人平分此筆項目
        </button>
        <label>使用者</label>
        <div className={styles.usersContainer}>
          {itemInfo.ower &&
            itemInfo.ower.map((user, index) => (
              <User
                key={`ower-userId:${user.id}-${index}`}
                role={`ower`}
                allUsers={groupmembers}
                user={user}
                index={index}
                onDeleteUser={handleDeleteUser}
                onChange={handleUserChange}
              ></User>
            ))}
          <button className={styles.addOwerBtn} onClick={addOwer}>
            新增使用者
          </button>
        </div>

        <button className={styles.addNewBtn} type="submit">
          {isEdit ? "更新" : "新增"}
        </button>
      </form>
    </>
  );
};

export default ItemForm;
