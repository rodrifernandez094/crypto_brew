import { withProtected } from "../../services/protectRoutes";
import MainInfo from "../../components/coin_data/MainInfo";
import LinksColumn from "../../components/coin_data/LinksColumn";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

export const getStaticPaths = async () => {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1";
  const res = await fetch(url);
  const data = await res.json();
  const paths = await data.map((coin) => {
    return {
      params: { id: coin?.id },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  console.log(typeof context.params.id);
  const id = context?.params?.id;
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}?tickers=false&community_data=false&developer_data=false`
  );
  const data = await res.json();

  return {
    props: { data },
  };
};

const CoinDetail = ({ data, auth }) => {
  const { user } = auth;

  return (
    <div className="w-full container mx-auto pb-8 pt-24">
      <div className="w-full py-4 px-8 text-sm flex items-center gap-2">
        <Link href="/market">Market</Link>
        <FontAwesomeIcon icon={faAngleRight} />
        <span> {data?.name} </span>
      </div>
      <div className="w-full flex flex-col py-12 px-8 items-center lg:mx-0 lg:flex-row lg:justify-between">
        {/* price info */}
        <MainInfo data={data} user={user} />
        {/* social media info */}
        <LinksColumn data={data} />
      </div>
    </div>
  );
};

export default withProtected(CoinDetail);
