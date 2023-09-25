import styles from './Title.module.css'

const Title = ({title, backFn}) => {
  return (
    <>
      <div className={styles.title}>
        <button className={styles.backArrow} onClick={backFn}>
          &#8592;
        </button>
        <p className={styles.titleName}>{title}</p>
      </div>
    </>
  );
}

export default Title