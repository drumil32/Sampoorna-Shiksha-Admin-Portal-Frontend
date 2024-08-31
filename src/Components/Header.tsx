import React from 'react'
import { RootState } from '@reduxjs/toolkit/query';
import { CiShoppingCart } from "react-icons/ci";
import { Link, } from 'react-router-dom';
import { useSelector ,  } from 'react-redux';

const Header = () => {
  // const navigate = useNavigate();
      const cartItems = useSelector((store: RootState) => store.cart.cartItems);

  return (
    <div className='bg-gray-200 shadow-md p-3 font-[300] text-gray-600 flex items-center justify-between'>
      {/* <Link to='/'>Logo</Link> */}
      <a href="">Logo</a>

      <div>
        {/* <Link to="/cart"> */}
         <CiShoppingCart className='text-4xl relative' />
        {/* </Link> */}

        {cartItems.length > 0 &&
        <div className='quantity w-[20px] h-[20px] bg-gray-400 rounded-full absolute top-3 right-3 flex items-center justify-center font-bold text-xs text-white'>
          {cartItems.length}
        </div>
      }
      </div>
    </div>
  );
}

export default Header