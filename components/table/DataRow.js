import Link from "next/link";
import Image from "next/image";

const DataRow = ({ coinData }) => {
  const numberFormat = Intl.NumberFormat("en-US");

  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {coinData.map((data) => (
        <tr key={data?.id}>
          <td className="pl-4 py-4 border-l text-start">
            <p className="text-sm ">#{data.market_cap_rank}</p>
          </td>
          <td className=" border-x whitespace-nowrap">
            <div className="flex px-4 items-center justify-start">
              <div className="h-6 w-6 ">
                <Image
                  width={24}
                  height={24}
                  src={data?.image}
                  alt="coin"
                  className="w-100"
                />
              </div>
              <div className="text-sm font-medium ml-4 text-gray-900 flex flex-col">
                <Link href={`market/${data?.id}`}>
                  <a>{data?.name}</a>
                </Link>
                <span className=" text-gray-500 uppercase">{data?.symbol}</span>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 border-x whitespace-nowrap">
            <div className="text-sm text-gray-500">
              ${numberFormat.format(data?.current_price)}
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <div className="text-sm text-green-700">
              ${numberFormat.format(data?.high_24h)}
            </div>
            <div className="text-sm text-red-700">
              ${numberFormat.format(data?.low_24h)}
            </div>
          </td>
          <td className="px-6 py-4 border-x whitespace-nowrap">
            <div className="text-sm text-gray-500">
              ${numberFormat.format(data?.market_cap)}
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default DataRow;
