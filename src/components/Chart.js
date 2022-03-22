import { useState, useEffect } from "react";
import loader from "../images/loader.gif";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Chart = ({ id, currency, currencySymbol }) => {
    const [historicalData, SetHistoricalData] = useState([]);
    const [changeDate, setChangeDate] = useState("365");
    const [loading, setLoading] = useState(true);
    let date;
    useEffect(() => {
        const apiData = async () => {
            const ApiUrl = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${changeDate}`;
            const response = await fetch(ApiUrl);
            const data = await response.json();
            SetHistoricalData(data.prices);
            setLoading(false);
        };
        apiData();
        // eslint-disable-next-line
    }, [changeDate]);

    const options = {
        responsive: true,
        plugins: {},
    };
    const labels = historicalData.map((element) => {
        date = new Date(element[0]).toLocaleDateString();
        return date;
    });

    const data = {
        labels,
        datasets: [
            {
                label: `Price ${date} in ${currencySymbol}`,
                data: historicalData.map((element) => {
                    return element[1];
                }),
                backgroundColor: "#6D2ED5",
                borderColor: "#6D2ED5",
                radius: "0",
            },
        ],
    };
    return (
        <>
            <div className="py-4">
                {loading ? (
                    <div className="d-flex justify-content-center align-items-center flex-column vh-100">
                        <img src={loader} className="" alt="Loader" />
                    </div>
                ) : (
                    <>
                        <Line options={options} data={data} />
                        <Bar options={options} data={data} />
                    </>
                )}
            </div>
            <div id="char-btn" className="text-center pt-4">
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setLoading(true);
                        setChangeDate(1);
                    }}
                >
                    1day
                </button>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setLoading(true);
                        setChangeDate(30);
                    }}
                >
                    30days
                </button>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setLoading(true);
                        setChangeDate(60);
                    }}
                >
                    60Days
                </button>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setLoading(true);
                        setChangeDate(365);
                    }}
                >
                    1year
                </button>
            </div>
        </>
    );
};

export default Chart;
