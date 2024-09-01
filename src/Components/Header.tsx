import React from 'react'
import { CiShoppingCart } from "react-icons/ci";
import { Link, } from 'react-router-dom';
import { useSelector ,  } from 'react-redux';
import { CART, HOME } from '../utils/routes';
import { RootState } from '../redux/store';

const Header = () => {
      const cartItems = useSelector((store:RootState) => store.cart.cartItems);

  return (
    <div className='bg-gray-200 shadow-md p-3 font-[300] text-gray-600 flex items-center justify-between'>
      <Link to={HOME}>Logo</Link>

      <div>
        <Link to={CART}>
         <CiShoppingCart className='text-4xl relative' />
        </Link>

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