import React from "react";
import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import DOMPurify from 'dompurify';
import Chart from "./Chart";
const Description = () => {
    const { id} = useParams();
    const {currencySymbol} = useParams();
    const {currency} = useParams();
    const [movieDesc, setMovieDesc] = useState([]);

    useEffect(() => {
        const setDescription = async () => {
            const ApiUrl1 = `https://api.coingecko.com/api/v3/coins/${id}`;
            const response = await fetch(ApiUrl1);
            const data = await response.json();
            setMovieDesc(data);
        };
        setDescription();
    }, [id]);
    return (
        <>
            <section>
                <section className="bg-light">
                    <div className="container py-4">
                        {
                            <div className="row align-items-center py-5" id="details">
                                <div className="col-md-6 order-md-1 order-2  text-center text-md-start pt-4">
                                    <h4 className="font-weight-light animation">
                                        <b>{movieDesc.name}</b>
                                    </h4>
                                    <div className="description py- animation  overflow-hidden">
                                        <p>
                                            <strong>Symbol</strong> : {movieDesc.symbol}
                                        </p>
                                        <p>
                                            {currencySymbol} {(movieDesc.market_data) ? (movieDesc.market_data.current_price.inr.toLocaleString()):("")
                                        }
                                        </p>
                                        <p>
                                            {currencySymbol} {
                                                (movieDesc.market_data) ? (
                                                movieDesc.market_data.market_cap.inr.toLocaleString()):("")}
                                        </p>
                                        <p>
                                            <strong>Director</strong> : {movieDesc.genesis_date}
                                        </p>
                                        <p>
                                            <strong>Writer</strong> : {movieDesc.sentiment_votes_up_percentage}%
                                        </p>
                                        <p>
                                            <strong>Actors</strong> : {movieDesc.sentiment_votes_down_percentage}%
                                        </p>
                                        <p dangerouslySetInnerHTML={{
                                           __html: DOMPurify.sanitize( 
                                                (movieDesc.description)?(
                                                movieDesc.description.en.split(". ")[0]):
                                                ("")
                                            )
                                        }}>
                                            
                                        </p>
                                    </div>
                                    <div className="btns pt-2">
                                        <a href="https://coinmarketcap.com/converter/" className="btn btn-primary" target="_black">
                                            Coin Converter
                                        </a>
                                        <NavLink to="/" className="btn btn-primary btn-secondary ">
                                            Go Back To Home
                                        </NavLink>
                                    </div>
                                </div>
                                <div className="col-md-6 order-md-2 order-1 text-center p-0 ">
                                    <img src={
                                        (movieDesc.image) ?(
                                        movieDesc.image.large):("")} className="img-fluid" alt={movieDesc.name} />
                                </div>
                            </div>
                        }

                        <Chart id={id} currency={currency}  currencySymbol={currencySymbol}/>
                    </div>
                </section>
            </section>
        </>
    );
};

export default Description;
