import SearchClient from "@/components/client/search.client";
import { Divider } from "antd";
import styles from "styles/client.module.scss";

const HomePage = () => {
  return (
    <div className={`${styles["container"]} ${styles["home-section"]}`}>
      <div className="search-content" style={{ marginTop: 20 }}>
        <SearchClient />
      </div>
      <Divider />
      <div>Company</div>
      <div style={{ margin: 50 }}></div>
      <Divider />
      <div>Job</div>
    </div>
  );
};

export default HomePage;
