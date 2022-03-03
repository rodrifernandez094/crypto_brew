import MarketData from "./MarketData";
import Breadcrumb from "../Breadcrumb";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import FirestoreService from "../../services/FirestoreService";

const MainInfo = ({ data, user }) => {
  const { uid } = user;

  useEffect(() => {
    const getFavorites = async () => {
      await FirestoreService.getFavorites(uid);
      const portfolio = await JSON.parse(localStorage.getItem("favorites"));
      if (portfolio) {
        setToggle((oldState) => {
          if (portfolio.find((fav) => fav?.coinId === data?.id)) {
            return true;
          }
          return oldState;
        });
      }
    };
    getFavorites();
  });

  const numberFormat = Intl.NumberFormat("en-US");
  //prettier-ignore
  const marketData = {
    current_price: data?.market_data?.current_price,
    price_change_24h: data?.market_data?.price_change_percentage_24h,
    total_supply: data?.market_data?.total_supply,
    max_supply: data?.market_data?.max_supply,
    circulating_supply: data?.market_data?.circulating_supply,
    fully_diluted_val: data?.market_data?.fully_diluted_valuation?.usd ?? 0,
    market_cap: data?.market_data?.market_cap?.usd,
    ath: data?.market_data?.ath?.usd,
    atl: data?.market_data?.atl?.usd,
    high24h: data?.market_data?.high_24h?.usd,
    low24h: data?.market_data?.low_24h?.usd,
  };

  const priceChange = Number(marketData?.price_change_24h).toFixed(2);
  const [toggle, setToggle] = useState(false);

  const addFavorite = async (userId, coinId, toggle) => {
    await FirestoreService.addFavorite(userId, coinId, toggle);
    toast.dark(
      <Breadcrumb
        message={toggle ? "Removed from favorites" : "Added to favorites"}
      />,
      { position: toast.POSITION.BOTTOM_CENTER }
    );

    setToggle(!toggle);
  };

  return (
    <div className="lg:w-2/4">
      <div className="flex gap-4">
        <h2 className=" text-4xl font-bold ">
          {data?.name}
          <small className=" text-gray-500 text-lg font uppercase ml-2">
            {data?.symbol}
          </small>
        </h2>
        {/* prettier-ignore */}
        <div className="text-yellow-400 cursor-pointer" onClick={() => addFavorite(uid, data?.id, toggle)}>
          <FontAwesomeIcon icon={!toggle ? farStar : fasStar} />
        </div>
      </div>
      <ul className="flex justify-between w-full">
        <li className="text-gray-500 text-sm">Rank #{data?.market_cap_rank}</li>
      </ul>
      <div className="flex flex-col py-4">
        <span className=" text-3xl">
          ${numberFormat.format(marketData?.current_price?.usd)}
          <small
            className={`ml-2 px-2 text-lg ${
              priceChange < 0 ? "text-red-600" : "text-lime-600"
            }`}
          >
            {priceChange}%
          </small>
        </span>
        <span className="text-gray-500 uppercase">
          {marketData?.current_price?.btc} btc
        </span>
        <div className="flex justify-between mt-8 text-sm">
          <span className=" text-red-600">${marketData?.low24h}</span>
          <span className=" text-gray-500"> 24H Range </span>
          <span className=" text-lime-600">${marketData?.high24h}</span>
        </div>
        <MarketData marketData={marketData} />
      </div>

      <ToastContainer autoClose={3000} hideProgressBar={true} />
    </div>
  );
};

export default MainInfo;
