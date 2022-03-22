import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
const TopSearched = ({ currencySymbol ,currency}) => {
    const [trending, setTrending] = useState([]);
    const [loading, setLoading] = useState(true);
    let navigate = useNavigate();
    useEffect(() => {
        const topSearchedCoins = async () => {
            try {
                const ApiUrl1 = `https://api.coingecko.com/api/v3/search/trending`;
                const response = await fetch(ApiUrl1);
                const data = await response.json();
                setTrending(data.coins);
                setLoading(false);
            } catch (error) {
                console.log(error, "API ERROR ..");
            }
        };
        topSearchedCoins();
    }, []);
    return (
        <>
            <div className="content bg-light">
                <div className="container">
                    <h3 className="text-white p-2 m-0 text-center">TopSearched Coins</h3>
                    <div className="row flex-nowrap top_searched">
                        {loading ? (
                            <Loader />
                        ) : trending ? (
                            trending.map((element) => {
                                return (
                                    <div
                                        className="col-xl-3 col-md-3 col-sm-12 "
                                        key={element?.item?.id}
                                        onClick={() => {
                                            navigate(`/coins/${element?.item?.id}/${currency}/${currencySymbol}`);
                                        }}
                                    >
                                        <div className="product-card text-start">
                                            <img className="img-responsive" src={element?.item?.large} alt={element?.item?.name} />
                                            <div className="product-image-caption">
                                                <div className="product-image-txt">
                                                    <h2>{element?.item?.name}</h2>
                                                    <h3>{element?.item?.symbol.toUpperCase()}</h3>
                                                    <h3 className="decription-1">
                                                        {currencySymbol} {element?.item?.price_btc.toLocaleString()}
                                                    </h3>
                                                    <p className="decription-1">Rank:{element?.item?.market_cap_rank}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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

export default TopSearched;
