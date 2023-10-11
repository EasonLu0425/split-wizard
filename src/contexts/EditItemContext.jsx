import { createContext, useState } from "react";
import { formatDate, formatTime } from "../helpers/helper";

const ItemContext = createContext();

const ItemDataProvider = ({ children }) => {
  const [itemInfo, setItemInfo] = useState({
    groupName: "",
    itemName: "",
    itemDate: "",
    itemTime: "",
    itemAmount: 0,
    payer: [],
    ower: [],
  });
  const [groupmembers, setGroupMembers] = useState([]);

  const resetItemInfo = () => {
    setItemInfo({
      groupName: "",
      itemName: "",
      itemDate: "",
      itemTime: "",
      itemAmount: 0,
      payer: [],
      ower: [],
    });
  };

  const receiveItemData = (itemData) => {
    setItemInfo({
      ...itemInfo,
      groupName: itemData.groupName,
      itemName: itemData.itemName,
      itemDate: formatDate(itemData.itemTime),
      itemTime: formatTime(itemData.itemTime),
      itemAmount: itemData.amount,
      payer: itemData.details.filter((user) => user.payer),
      ower: itemData.details.filter((user) => !user.payer),
    });
  };

  const receiveGroupTitle = (groupTitle) => {
    setItemInfo({
      ...itemInfo,
      groupName: groupTitle
    })
  }

  const receiveGroupMembers = (members) => {
    setGroupMembers(members);
  };

  const handleInputChange = (event) => {
    setItemInfo({
      ...itemInfo,
      [event.target.name]: event.target.value,
    });
  };

  const updatePayerArray = (newPayerArray) => {
    setItemInfo({
      ...itemInfo,
      payer: newPayerArray,
    });
  };

  const handlePayerChange = (newPayerArray) => {
    updatePayerArray(newPayerArray);
  };

  const updateOwerArray = (newOwerArray) => {
    setItemInfo({
      ...itemInfo,
      ower: newOwerArray,
    });
  };

  const handleOwerChange = (newOwerArray) => {
    updateOwerArray(newOwerArray);
  };

  return (
    <ItemContext.Provider
      value={{
        itemInfo,
        groupmembers,
        receiveItemData,
        receiveGroupMembers,
        receiveGroupTitle,
        handleInputChange,
        handleOwerChange,
        handlePayerChange,
        resetItemInfo,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export { ItemContext, ItemDataProvider };
