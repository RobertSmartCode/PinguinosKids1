import React from "react";
import HomeBanner from "./HomeBanner";
import BestSellers from "./BestSellers";
import NewArrivals from "./NewArrivals";
import Footer from "../../components/common/Footer/Footer";

const Home: React.FC = () => {
  return (
    <div>
      <HomeBanner/>
      <NewArrivals/>
      <BestSellers/>
      <Footer /> 
    </div>
  );
};

export default Home;
