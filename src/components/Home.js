import React from "react";
import { useState, useEffect } from "react";
import Loader from "./Loader";
import Cards from "./Cards";
import Search from "./Search";
import Trending from "./Trending";
import TopSearched from "./TopSearched";
const Home = () => {
    const [movies, setMovies] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [search, setSearch] = useState("");
    const pageSize = 8;
    const [loading, setLoading] = useState(true);
    const [currency, setCurrency] = useState("inr");
    const [currencySymbol, setCurrencySymbol] = useState("₹");

    useEffect(() => {
        const moviesFinder = async () => {
            try {
                const ApiUrl1 = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${pageSize}&page=${pageNumber}&sparkline=false`;
                const response = await fetch(ApiUrl1);
                const data = await response.json();
                setMovies(data);
                setLoading(false);
            } catch (error) {
                console.log(error, "API ERROR ..");
            }
        };
        moviesFinder();
        if (currency === "inr") {
            setCurrencySymbol("₹");
        } else if (currency === "usd") {
            setCurrencySymbol("$");
        }
    }, [pageNumber, search, currency]);

    const nextPage = () => {
        setPageNumber(pageNumber + 1);
        setLoading(true);
        window.scroll(0, 150);
    };
    const previousPage = () => {
        if (pageNumber === 1) return;
        setPageNumber(pageNumber - 1);
        setLoading(true);
        window.scroll(0, 150);
    };
    return (
        <>
            <Search setSearch={setSearch} setCurrency={setCurrency} />
            <div className="content bg-light">
                <div className="container">
                    <div className="row">
                        {loading ? (
                            <Loader />
                        ) : movies.length ? (
                            movies.map((element) => {
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
                            <h2 className="text-white p-2 m-0 text-center">No More News</h2>
                        )}
                    </div>
                    <div className="btns py-2 d-flex align-items-center justify-content-between">
                        <button
                            href="https://www.imdb.com/title/Entertainment Desk"
                            disabled={pageNumber === 1}
                            className="btn btn-primary"
                            target="_black"
                            onClick={() => {
                                previousPage();
                            }}
                        >
                            Previous
                        </button>
                        <button
                            className="btn btn-primary btn-secondary "
                            disabled={!movies.length}
                            onClick={() => {
                                nextPage();
                            }}
                        >
                            Next
                        </button>
                    </div>
                </div>
                <Trending setLoading={setLoading} loading={loading} currencySymbol={currencySymbol} currency={currency} />
                <TopSearched setLoading={setLoading} loading={loading} currencySymbol={currencySymbol} currency={currency} />
            </div>
        </>
    );
};

export default Home;
