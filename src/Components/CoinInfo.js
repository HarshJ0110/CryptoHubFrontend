import React, { useState, useContext, useEffect } from 'react'
import { HistoricalChart } from '../config/api'
import CryptoContext from '../context/CryptoContext';
import axios from 'axios'
import { Line } from "react-chartjs-2";
import LoadingBar from './Loadingbar';

const CoinInfo = ({ id }) => {
  const [historicalData, setHistoricalData] = useState()
  const [days, setDays] = useState(3)
  const context = useContext(CryptoContext);
  const { currency, symbol } = context;
  const fetchHistoricData = async () => {
    try {
      const { data } = await axios.get(HistoricalChart(id, days, currency));
      setHistoricalData(data.prices);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchHistoricData()
  }, [currency, days]);

  {!historicalData && <LoadingBar/>}
  return (
    <div className="flex flex-col justify-center text-white lg:w-2/3">
    
    {historicalData && <Line 
      data={{
        labels: historicalData.map(coin => {
          let date = new Date(coin[0]);
          let time = 
            date.getHours() > 12 
            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
            : `${date.getHours()}:${date.getMinutes()} AM`;
          return days == 1 ? time : date.toLocaleDateString()
        }),

        datasets: [
          { 
            data: historicalData.map((coin) => coin[1]),
            label: `Price ( Past ${days} Days ) in ${currency}`,
            borderColor: "rgb(105, 187, 253)",
          }
        ]
      }}
      options={{
        elements:{
          point:{
            radius: 1
          }
        }
      }}
    />}
    {historicalData && <div className='text-white flex flex-row justify-evenly mt-5 mb-5'>
      <button style={{color: days==1 && "rgb(105, 187, 253)"}} className="px-5" value="1" onClick={(e) => (setDays(e.target.value))}>1D</button>
      <button style={{color: days==3 && "rgb(105, 187, 253)"}} className="px-5" value="3" onClick={(e) => (setDays(e.target.value))}>3D</button>
      <button style={{color: days==7 && "rgb(105, 187, 253)"}} className="px-5" value="7" onClick={(e) => (setDays(e.target.value))}>1W</button>
      <button style={{color: days==30 && "rgb(105, 187, 253)"}} className="px-5" value="30" onClick={(e) => (setDays(e.target.value))}>1M</button>
      <button style={{color: days==90 && "rgb(105, 187, 253)"}} className="px-5" value="90" onClick={(e) => (setDays(e.target.value))}>3M</button>
      <button style={{color: days==365 && "rgb(105, 187, 253)"}} className="px-5 " value="365" onClick={(e) => (setDays(e.target.value))}>1Y</button>
    </div>}
    </div>
  )
}

export default CoinInfo