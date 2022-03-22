import React from "react";
import { useNavigate } from "react-router-dom";
const Cards = ({ id, name, image, symbol, current_price, market_cap, market_cap_rank,currency, currencySymbol }) => {
    let navigate = useNavigate();
    return (
        <>
            <div
                className="col-xl-3 col-md-3 col-sm-12"
                onClick={() => {
                    navigate(`/coins/${id}/${currency}/${currencySymbol}`);
                }}
            >
                <div className="product-card text-start">
                    <img className="img-responsive" src={image} alt={name} />
                    <div className="product-image-caption">
                        <div className="product-image-txt">
                            <h2>{name}</h2>
                            <h3>{symbol.toUpperCase()}</h3>
                            <h3>
                                {currencySymbol} {current_price.toLocaleString()}
                            </h3>
                            <h3 className="decription-1">
                                {currencySymbol} {market_cap.toLocaleString()}
                            </h3>
                            <p className="decription-1">Rank:{market_cap_rank}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cards;
