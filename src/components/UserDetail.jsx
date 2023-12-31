import { getUserInGroupDetails } from "../api/itemDetails";
import { useState, useEffect } from "react";
import clsx from "clsx";
import styles from "./UserDetail.module.css";
import { formatDate } from "../helpers/helper";

const UserDetail = ({ detailData, groupId }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [firstClick, setFirstClick] = useState(true);
  const [details, setDetails] = useState([]);
  const [paidResults, setPaidResult] = useState([]);

  const getDetailAsync = async () => {
    const detailDatas = await getUserInGroupDetails(
      groupId,
      detailData.memberId
    );
    setDetails(detailDatas.details);
    setPaidResult(detailDatas.results);
  };

  const handleShowDetail = async (e) => {
    e.preventDefault();
    setShowDetail(!showDetail);
    if (firstClick) {
      setFirstClick(false);
      getDetailAsync();
    }
  };

  useEffect(() => {
    setShowDetail(false);
    setFirstClick(true);
  }, [detailData]);
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
            <p>載入中</p>
          )}
          {/* 小計 */}
          {paidResults ? (
            paidResults.map((result) => (
              <li className={styles.detailLi} key={`result${result.id}`}>
                <div className={styles.resultTextContainer}>
                  <div className={styles.timeAndName}>
                    <span className={styles.detailTime}>
                      {formatDate(result.createdAt)}
                    </span>
                    <span className={styles.detailName}>
                      {result.giverId === detailData.userId ? (
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
                    $ 
                    {result.amount}
                  </span>
                </div>
              </li>
            ))
          ) : (
            <p>載入中</p>
          )}
        </ul>
      )}
    </>
  );
};

export default UserDetail;
