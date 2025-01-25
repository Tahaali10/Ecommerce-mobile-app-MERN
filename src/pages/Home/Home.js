import React from "react";
import Banner from "../../components/Banner/Banner";
import BestSellers from "../../components/home/BestSellers/BestSellers";
import NewArrivals from "../../components/home/NewArrivals/NewArrivals";
import PopularProducts from "../../components/home/PopularProducts/PopularProducts";
import FastFoodMenu from "../../components/home/FastFood/FastFoodMenu";
import EndBanner from "../../components/home/EndBanner/EndBanner";

const Home = () => {
  return (
    <div className="w-full mx-auto">
      <Banner />
      <div className="max-w-container mx-auto px-4">
        <PopularProducts/>
        <NewArrivals />
        <FastFoodMenu/>
        <BestSellers />
      </div>
      <EndBanner/>

    </div>
  );
};

export default Home;
