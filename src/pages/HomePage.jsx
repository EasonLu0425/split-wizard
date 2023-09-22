import { Navbar } from "../components";
import styles from './HomePage.module.css'

const HomePage = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className={styles.homePageContainer}>
        <div>Home Page</div>
      </div>
    </>
  );
};

export default HomePage;
