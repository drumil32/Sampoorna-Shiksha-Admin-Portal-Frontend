import { useSelector } from 'react-redux';
import { ShowVendorOrder } from '../../types/VendorOrder';
import { CiShoppingCart } from "react-icons/ci";
import { RootState } from '../../redux/store';

import Error from '../../Components/ErrorHandler/Error';
import Loading from '../../Components/Loading/Loading';
  import CartItems from '../../Components/CartItems';
import Calculation from '../../Components/CalculationTotal';
const Cart: React.FC = () => {
  const vendorCartItems: ShowVendorOrder[] = useSelector((state: RootState) => state.cart.cartItems);

  if (vendorCartItems.length <= 0) return (
    <div className='w-full flex calc-height items-center justify-center text-2xl font-[200]'>
      Please add some toys <CiShoppingCart />
    </div>
  );


  return (
    <Error>
      <Loading>
        <div className='container max-w-4xl m-auto mt-6  bg-white shadow-xl p-4 grid  sm:grid-cols-2 grid-cols-1'>
          <CartItems />
          {/* price container */}
          <Calculation/>
        </div>
      </Loading>
    </Error>
  );
}

export default Cart