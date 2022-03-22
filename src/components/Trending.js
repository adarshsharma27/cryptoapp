import React from "react";
import { useState, useEffect } from "react";
import Loader from "./Loader";
import Cards from "./Cards";
const Trending = ({ currencySymbol, currency }) => {
    const [trending, setTrending] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const trendingCoins = async () => {
            try {
                const ApiUrl1 = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;
                const response = await fetch(ApiUrl1);
                const data = await response.json();
                setTrending(data);
                setLoading(false);
            } catch (error) {
                console.log(error, "API ERROR ..");
            }
        };
        trendingCoins();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div className="content bg-light">
                <div className="container">
                    <h3 className="text-white p-2 m-0 text-center">Trending Coins</h3>
                    <div className="row">
                        {loading ? (
                            <Loader />
                        ) : trending ? (
                            trending.map((element) => {
                                let { id, symbol, name, image, current_price, market_cap, market_cap_rank } = element;
                                return (
                                    <Cards
                                        key={id}
                                        id={id}
                                        image={image}
                                        symbol={symbol}
                                        name={name}
                                        current_price={current_price}
                                        market_cap={market_cap}
                                        market_cap_rank={market_cap_rank}
                                        currencySymbol={currencySymbol}
                                        currency={currency}
                                    />
                                );
                            })
                        ) : (
                            <h2 className="text-white p-2 m-0 text-center">No Coins</h2>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Trending;
