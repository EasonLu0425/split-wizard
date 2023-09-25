import styles from "./ItemForm.module.css";
import React, { useState, useEffect } from "react";

const dummyData = [
  {
    name: "一欄拉麵",
    amount: 6000,
    created_at: "2023/07/16",
    users: [
      {
        id: 1,
        name: "小呂",
        amount: 6000,
        payer: true,
      },
      {
        id: 2,
        name: "小薛",
        amount: 1500,
        payer: false,
      },
      {
        id: 3,
        name: "小莊",
        amount: 1500,
        payer: false,
      },
      {
        id: 4,
        name: "大呂",
        amount: 1500,
        payer: false,
      },
      {
        id: 5,
        name: "大莊",
        amount: 1500,
        payer: false,
      },
    ],
  },
];

const User = ({ allUsers, user, index, onChange }) => {
  const handleUserChange = (event) => {
    const { name, value } = event.target;
    onChange(index, name, value, user.id);
  };

  return (
    <>
      <div className={styles.user}>
        <div className={styles.userNameContainer}>
          <label>{`使用者${index + 1}`}</label>
          <select onChange={handleUserChange} value={user.id} name={`user`}>
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
          <label>{`使用者${index}金額`}:</label>
          <input
            className={styles.userAmount}
            type="number"
            name={`userAmount`}
            value={user.amount}
            onChange={handleUserChange}
          />
        </div>
      </div>
    </>
  );
};

const ItemForm = (isEdit) => {
  const [itemName, setItemName] = useState("");
  const [itemAmount, setItemAmount] = useState("");
  const [payer, setPayer] = useState("");
  const [ower, setOwer] = useState([]);
  const [itemData] = dummyData;
  const usersInfo = itemData.users;

  useEffect(() => {
    if (isEdit && itemData) {
      setItemName(itemData.name || "");
      setItemAmount(itemData.amount || "");
      setPayer(usersInfo.filter((user) => user.payer) || "");
      setOwer(usersInfo.filter((user) => !user.payer) || []);
    }
  }, [isEdit, itemData, usersInfo]);

  const handleUserChange = (index, name, value, id) => {
    if (name === "user") {
      const [nextUser] = usersInfo.filter(user => user.id === Number(value))
      const nextOwer = [...ower]
      nextOwer[index] = {...nextOwer[index], name:nextUser.name, id:nextUser.id}
      setOwer(nextOwer)
    } else if (name === "userAmount") {
      const nextOwer = ower.map((user) => {
        if (user.id === id) {
          return {
            ...user,
            amount: value,
          };
        } else {
          return user;
        }
      });
      setOwer(nextOwer);
    }
  };
  const handleGoDutch = (e) => {
    e.preventDefault()
    const dutchedAmount = itemAmount/ ower.length
    const nextOwer = ower.map(user => {
      return {
        ...user,
        amount: dutchedAmount
      }
    })
    setOwer(nextOwer)
  };

  return (
    <>
      <form className={styles.itemForm}>
        <label>項目名稱</label>
        <input
          type="text"
          name="itemName"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <label>項目金額</label>
        <input
          type="number"
          name="itemAmount"
          value={itemAmount}
          onChange={(e) => setItemAmount(e.target.value)}
        />
        <label>支出者</label>
        <select
          className={styles.payerSelect}
          value={payer}
          onChange={(e) => setPayer(e.target.value)}
        >
          {itemData.users.map((user) => (
            <option key={`payer-userId:${user.id}`}>{user.name}</option>
          ))}
        </select>
        <button className={styles.goDutchBtn} onClick={handleGoDutch}>
          所有人平分此筆項目
        </button>
        <div className={styles.usersContainer}>
          {ower.map((user, index) => (
            <User
              key={`ower-userId:${user.id}-${index}`}
              allUsers={usersInfo}
              user={user}
              index={index}
              onChange={handleUserChange}
            ></User>
          ))}
        </div>

        <button className={styles.addNewBtn} type="submit">
          {isEdit ? "更新" : "新增"}
        </button>
      </form>
    </>
  );
};

export default ItemForm;
