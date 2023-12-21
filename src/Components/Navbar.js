import React,{useContext} from 'react'
import CryptoContext from '../context/CryptoContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
    
    const context = useContext(CryptoContext);
    const {currency, setCurrency, setWatchList, login, setLogin} = context;

    const handleLogout = (e) => {
        e.preventDefault();
        setLogin(false);
        localStorage.removeItem('token');
    }
    const handleClick = (e) =>{
        e.preventDefault();
        setWatchList(true);
    }

    return (
        <div className='bg-black p-3 flex flex-row justify-between text-blue-400'>
            <Link to="/" className='text-xl md:pl-4 font-bold'>CryptoHub</Link>
            <div className='md:pr-4 flex flex-row px-2'>
                <select className="bg-black text-lg px-2 py-1" value={currency} onChange={(e) => {
                    setCurrency(e.target.value)}}>
                    <option className='bg-black p-3'>INR</option>
                    <option className='bg-black m-4'>USD</option>
                </select>
                {!login && <Link to="/signup" className='text-lg px-4 md:px-10 md:py-1'>Signup</Link>}
                {!login && <Link to="/login" className='text-lg md:pl-3 md:py-1'>Login</Link>}
                {login && <button className='text-lg px-4 md:px-10 md:py-1' onClick={handleClick}>Watchlist</button>}
                {login && <button className='text-lg md:px-10 md:py-1' onClick={handleLogout}>Logout</button>}
            </div>
        </div>
    )
}

export default Navbar