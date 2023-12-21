import React, { useContext, useEffect } from 'react';
import WatchlistCoin from './WatchList';
import CryptoContext from '../context/CryptoContext';

const SideBar = () => {
    const context = useContext(CryptoContext);
    const { userName, getCoins, coins, watchlist, setWatchList} = context;
    const link = "http://localhost:4000"

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getCoins();
        }
    }, [])

    return (
        <>
            {watchlist && <div className='sidebar sidebar_cont w-96 ml-[74vw] min:h-screen bg-gray-700 text-blue-400'>
                <h1 className='text-3xl mb-10 mt-4'>{userName}</h1>
                <div className='sidebar_cont rounded-lg border-red-700'>
                    <h1 className='text-2xl mb-4'>WatchList</h1>
                    <i className="fa-solid fa-xmark fa-2xl cursor-pointer" onClick={() =>{setWatchList(false)}}></i>
                    <div className='border-2 border-gray-500 rounded-lg px-12 m-10 text-lg'>
                        {coins.map((c) => {
                            return <>
                                <WatchlistCoin key={c.id} addedcoin={c} />
                            </>
                        })}
                    </div>
                </div>
            </div>
        }
        </>
    )
}
export default SideBar
