import { getUserInGroupDetails } from "../api/itemDetails";
import { useState } from "react";
import clsx from "clsx";
import styles from "./UserDetail.module.css";
import { formatDate } from "../helpers/helper";

const UserDetail = ({ detailData, groupId }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [firstClick, setFirstClick] = useState(true);
  const [details, setDetails] = useState([]);
  const [paidResults, setPaidResult] = useState([]);

  const handleShowDetail = async (e) => {
    e.preventDefault();
    setShowDetail(!showDetail);
    if (firstClick) {
      setFirstClick(false);
      const detailDatas = await getUserInGroupDetails(
        groupId,
        detailData.memberId
      );
      console.log(detailDatas);
      setDetails(detailDatas.details);
      setPaidResult(detailDatas.results);
    }
  };
  return (
    <>
      <button
        className={clsx(styles.overViewCard, {
          [styles.positive]: detailData.memberNet > 0,
          [styles.negative]: detailData.memberNet <= 0,
        })}
        onClick={handleShowDetail}
      >
        <p>
          <span>{detailData.memberName}</span> 還需
          {detailData.memberNet > 0 ? "收到" : "支付"}{" "}
          <span>${Math.abs(detailData.memberNet)}</span>
        </p>
        <div
          className={showDetail ? styles.hideArrorw : styles.showArrow}
        ></div>
      </button>
      {showDetail && (
        <ul className={styles.detailContainer}>
          {details ? (
            details.map((detail) => (
              <li className={styles.detailLi} key={`detail${detail.id}`}>
                <div className={styles.detailTextContainer}>
                  <div className={styles.timeAndName}>
                    <span className={styles.detailTime}>
                      {formatDate(detail.item.itemTime)}
                    </span>
                    <span className={styles.detailName}>
                      {detail.item.name}
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
            <p>讀取中</p>
          )}
          {/* 小計 */}
          {paidResults ? (
            paidResults.map((result) => (
              <li className={styles.detailLi} key={`result${result.id}`}>
                <div className={styles.resultTextContainer}>
                  <div className={styles.timeAndName}>
                    <span className={styles.detailTime}>
                      {formatDate(result.updatedTime)}
                    </span>
                    <span className={styles.detailName}>
                      {result.giverId === detailData.memberId ? (
                        <>已清償分帳款項</>
                      ) : (
                        <>已收到分帳款項</>
                      )}
                    </span>
                  </div>
                  <span
                    className={clsx(styles.detailCost, {
                      // [styles.minusCost]: result.payerId === detailData.userId,
                    })}
                  >
                    ${result.amount}
                  </span>
                </div>
              </li>
            ))
          ) : (
            <p>讀取中</p>
          )}
        </ul>
      )}
    </>
  );
};

export default UserDetail;
