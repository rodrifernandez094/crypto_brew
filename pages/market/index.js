import dynamic from "next/dynamic";
const Table = dynamic(() => import("../../components/table/Table"), {
  ssr: false,
});
import { withProtected } from "../../services/protectRoutes";

const Market = ({ data, auth }) => {
  const { user } = auth;

  return (
    <div className="container mx-auto w-full pb-12 pt-28 px-8">
      <div className="mt-8">
        <h1 className=" text-xl">Cryptocurrency Prices by Market Cap</h1>
        <Table coinData={data} user={user} />
      </div>
    </div>
  );
};

export default withProtected(Market);

export const getServerSideProps = async () => {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1";

  const res = await fetch(url);
  const data = await res.json();
  return { props: { data } };
};
