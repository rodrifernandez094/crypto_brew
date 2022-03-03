import { withProtected } from "../services/protectRoutes";
import { useState, useEffect } from "react";
import Table from "../components/table/Table";

const Profile = ({ auth }) => {
  const { user } = auth;
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    const coinId = JSON.parse(localStorage.getItem("favorites"));

    const fetchCoinList = async () => {
      coinId.forEach((coin) => {
        fetch(
          `https://api.coingecko.com/api/v3/coins/${coin.coinId}?tickers=false&community_data=false&developer_data=false`
        )
          .then((res) => res.json())
          .then((data) =>
            setPortfolio((old) => {
              return [
                ...old,
                {
                  id: data?.id,
                  name: data?.name,
                  market_cap: data?.market_data?.market_cap?.usd,
                  market_cap_rank: data?.market_cap_rank,
                  current_price: data?.market_data.current_price.usd,
                  high_24h: data?.market_data.high_24h.usd,
                  low_24h: data?.market_data.low_24h.usd,
                  image: data?.image.small,
                },
              ];
            })
          )
          .catch((err) => console.log(err));
      });
    };
    fetchCoinList();
  }, []);

  return (
    <div className="container mx-auto mt-24">
      <div className="flex flex-col lg:flex-row lg:py-8 gap-4">
        <aside className=" lg:w-1/5 ">
          <ul className="text-start flex flex-col gap-4 border-b px-4 py-8 text-stone-800">
            <h3 className="font-bold">Settings</h3>
            <li className="text-sm cursor-pointer">Public profile</li>
            <li className="text-sm cursor-pointer">Account</li>
            <li className="text-sm cursor-pointer">Appearence</li>
            <li className="text-sm cursor-pointer">Delete account</li>
          </ul>
        </aside>
        <main className="px-4 lg:w-4/5">
          <div className="max-w-7xl mx-auto py-6  lg:border-b">
            <h2 className="text-3xl font-bold text-stone-800">
              {user.displayName}&apos;s Profile
            </h2>
          </div>

          <div className="max-w-7xl mx-auto lg:mt-4 ">
            <div className="px-0 py-12 lg:py-4">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-lg font-bold">Portfolio</h2>
              </div>
              {portfolio && <Table coinData={portfolio} />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default withProtected(Profile);
