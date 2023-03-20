import dynamic from "next/dynamic";
const Table = dynamic(() => import("../../components/table/Table"), {
  ssr: false,
});
import { useState } from "react";

const Market = ({ data, auth }) => {
  const user = auth?.user || undefined;
  const [query, setQuery] = useState("");

  return (
    <div className="container mx-auto w-full pb-12 pt-28 px-8">
      <div className="mt-8">
        <h1 className=" text-xl my-4">Cryptocurrency Prices by Market Cap</h1>
        <form>
          <input
            type="text"
            name="search"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            id=""
            className="w-full mt-2 border-0 border-b border-b-zinc-600 text-sm"
          />
        </form>
        <Table coinData={data} user={user} query={query} />
      </div>
    </div>
  );
};

export default Market;

export const getServerSideProps = async () => {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1";

  const res = await fetch(url);
  const data = await res.json();
  return { props: { data } };
};
