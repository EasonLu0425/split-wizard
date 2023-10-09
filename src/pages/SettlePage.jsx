import { useNavigate, useParams } from "react-router-dom";
import { Navbar, Title } from "../components";
import styles from "./SettlePage.module.css";
import { useEffect, useState } from "react";
import { getOverView } from "../api/userGroupConn";
import { getResult, switchStatus } from "../api/result";
import clsx from "clsx";

const SettlePage = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [overViewData, setOverViewData] = useState({});
  const [resultData, setResultData] = useState([]);
  const [isButtonEnabled, setIsButtonEnabled] = useState(true);
  const backToGroupPage = () => {
    navigate(`/groups/${groupId}`);
  };

  const handleFinishPaid = async (e, resultId) => {
    try {
      e.preventDefault();
      const switchRes = await switchStatus(groupId, resultId);
      if (switchRes.status === "success") {
        setResultData(
          resultData.map((result) => {
            if (result.id === resultId) {
              return {
                ...result,
                status: true,
              };
            } else {
              return result;
            }
          })
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelPaid = async (e, resultId) => {
    try {
      e.preventDefault();
      const switchRes = await switchStatus(groupId, resultId);
      if (switchRes.status === "success") {
        setResultData(
          resultData.map((result) => {
            if (result.id === resultId) {
              return {
                ...result,
                status: false,
              };
            } else {
              return result;
            }
          })
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleArchive = (e) => {
    e.preventDefault()
    console.log('archive!')
  }

  useEffect(() => {
    const getOverViewAsync = async () => {
      try {
        const overViewData = await getOverView(groupId);
        setOverViewData(overViewData.result);
      } catch (err) {
        console.error(err);
      }
    };
    const getResultAsync = async () => {
      try {
        const resultData = await getResult(groupId);

        setResultData(resultData.result);
      } catch (err) {
        console.error(err);
      }
    };
    getOverViewAsync();
    getResultAsync();
  }, []);

  useEffect(() => {
    const allResultsAreTrue = resultData.every(
      (result) => result.status === true
    );
    setIsButtonEnabled(allResultsAreTrue);
  }, [resultData]);
  return (
    <>
      <Navbar></Navbar>
      <div className={styles.settlePageContainer}>
        <Title
          title={`結餘-${overViewData.groupName}`}
          backFn={backToGroupPage}
        ></Title>
        <div className={styles.overView}>
          <h2>旅程總覽</h2>
          {overViewData.overView && Array.isArray(overViewData.overView) ? (
            overViewData.overView.map((data) => (
              <div
                className={clsx(styles.overViewCard, {
                  [styles.positive]: data.userNet > 0,
                  [styles.negative]: data.userNet <= 0,
                })}
                key={data.userId}
              >
                <p>
                  <span>{data.userName}</span> 需
                  {data.userNet > 0 ? "收到" : "支付"}{" "}
                  <span>${Math.abs(data.userNet)}</span>
                </p>
              </div>
            ))
          ) : (
            <div>加载中...</div>
          )}
        </div>
        <hr />
        <div className={styles.settleContainer}>
          <div className={styles.unPaidContainer}>
            <h2>尚未支付</h2>
            <div className={styles.unPaidListContainer}>
              {resultData && Array.isArray(resultData) ? (
                resultData.map(
                  (result) =>
                    !result.status && (
                      <div
                        className={styles.unPaidLi}
                        key={`unPaid${result.id}`}
                      >
                        <div className="unpayer">
                          {result.payer.name} 給予 {result.ower.name} ${" "}
                          {result.amount}
                        </div>
                        <button
                          className={styles.payBtn}
                          onClick={(e) => handleFinishPaid(e, result.id)}
                        >
                          支付完成
                        </button>
                      </div>
                    )
                )
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className={styles.unPaidContainer}>
            <h2>已支付</h2>
            <div className={styles.paidListContainer}>
              {resultData && Array.isArray(resultData) ? (
                resultData.map(
                  (result) =>
                    result.status && (
                      <div className={styles.paidLi} key={`paid${result.id}`}>
                        <div className="unpayer">
                          {result.payer.name} 給予 {result.ower.name} ${" "}
                          {result.amount}
                        </div>
                        <button
                          className={styles.cancelPaidBtn}
                          onClick={(e) => handleCancelPaid(e, result.id)}
                        >
                          取消紀錄
                        </button>
                      </div>
                    )
                )
              ) : (
                <></>
              )}
            </div>
          </div>
          <button
            className={styles.setArchiveBtn}
            disabled={!isButtonEnabled}
            onClick={handleArchive}
          >
            封存
          </button>
        </div>
      </div>
    </>
  );
};

export default SettlePage;
