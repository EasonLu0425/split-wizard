import { getUserInGroupDetails } from "../api/itemDetails";
import { useState } from "react";
import clsx from "clsx";
import styles from "./UserDetail.module.css";
import { formatDate } from "../helpers/helper";

const UserDetail = ({ detailData, groupId }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [firstClick, setFirstClick] = useState(true);
  const [details, setDetails] = useState([]);
  const [paidResult, setPaidResult] = useState([]);

  const handleShowDetail = async (e) => {
    e.preventDefault();
    setShowDetail(!showDetail);
    if (firstClick) {
      setFirstClick(false);
      const detailDatas = await getUserInGroupDetails(
        groupId,
        detailData.userId
      );
      console.log(detailDatas);
      setDetails(detailDatas.details);
      setPaidResult(detailDatas.paidResult);
    }
  };
  return (
    <>
      <button
        className={clsx(styles.overViewCard, {
          [styles.positive]: detailData.userNet > 0,
          [styles.negative]: detailData.userNet <= 0,
        })}
        onClick={handleShowDetail}
      >
        <p>
          <span>{detailData.userName}</span> 還需
          {detailData.userNet > 0 ? "收到" : "支付"}{" "}
          <span>${Math.abs(detailData.userNet)}</span>
          <div
            className={showDetail ? styles.hideArrorw : styles.showArrow}
          ></div>
        </p>
      </button>
      {showDetail && (
        <ul className={styles.detailContainer}>
          {details ? (
            details.map((detail) => (
              <li className={styles.detailLi} key={`detail${detail.id}`}>
                <div className={styles.detailTextContainer}>
                  <div className={styles.timeAndName}>
                    <span className={styles.detailTime}>
                      {formatDate(detail.Item.itemTime)}
                    </span>
                    <span className={styles.detailName}>
                      {detail.Item.name}
                    </span>
                  </div>
                  <span
                    className={clsx(styles.detailCost, {
                      [styles.minusCost]: !detail.payer,
                    })}
                  >
                    $ {!detail.payer && "-"}
                    {detail.amount}
                  </span>
                </div>
              </li>
            ))
          ) : (
            <p>加载中</p>
          )}
          {paidResult ? (
            paidResult.map((result) => (
              <li className={styles.detailLi} key={`result${result.id}`}>
                <div className={styles.detailTextContainer}>
                  <div className={styles.timeAndName}>
                    <span className={styles.detailTime}>
                      {formatDate(result.createdAt)}
                    </span>
                    <span className={styles.detailName}>
                      {result.owerId === detailData.userId ? (
                        <>已支付分帳款項</>
                      ) : (
                        <>已收到分帳款項</>
                      )}
                    </span>
                  </div>
                  <span
                    className={clsx(styles.detailCost, {
                      [styles.minusCost]: result.payerId === detailData.userId,
                    })}
                  >
                    $ {result.payerId === detailData.userId && "-"}
                    {result.amount}
                  </span>
                </div>
              </li>
            ))
          ) : (
            <p>加载中</p>
          )}
        </ul>
      )}
    </>
  );
};

export default UserDetail