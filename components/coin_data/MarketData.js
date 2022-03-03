const MarketData = ({ marketData }) => {
  const numberFormat = Intl.NumberFormat("en-US");

  return (
    <div className="grid grid-cols-2 gap-4 w-full mt-8">
      <div className="col-span-2 lg:col-span-1">
        <div className="flex flex-wrap text-xs">
          <div className="w-full mt-2 py-2 border-b flex-grow flex justify-between">
            <span className="text-gray-500"> Market Cap</span>
            <span> ${numberFormat.format(marketData?.market_cap)}</span>
          </div>
          <div className="w-full mt-2 py-2 border-b flex-grow flex justify-between">
            <span className="text-gray-500">All Time High</span>
            <span> ${numberFormat.format(marketData?.ath)} </span>
          </div>
          <div className="w-full mt-2 py-2 border-b flex-grow flex justify-between">
            <span className="text-gray-500">All Time Low</span>
            <span> ${numberFormat.format(marketData?.atl)} </span>
          </div>
        </div>
      </div>
      <div className="col-span-2 lg:col-span-1">
        <div className="flex flex-wrap text-xs">
          <div className="w-full mt-2 py-2 border-b flex-grow flex justify-between">
            <span className="text-gray-500">Total Supply</span>
            <span> {marketData?.total_supply ?? "-"}</span>
          </div>
          <div className="w-full mt-2 py-2 border-b flex-grow flex justify-between">
            <span className="text-gray-500">Max Supply</span>
            <span> {marketData?.max_supply ?? "-"} </span>
          </div>
          <div className="w-full mt-2 py-2 border-b flex-grow flex justify-between">
            <span className="text-gray-500">Fully Diluted Valuation</span>
            <span>
              ${numberFormat.format(marketData?.fully_diluted_val) ?? "-"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketData;
