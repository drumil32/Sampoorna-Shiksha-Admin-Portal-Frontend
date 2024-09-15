import { useSelector } from 'react-redux';
import { ShowVendorOrder } from '../../types/VendorOrder';
import { CiShoppingCart } from "react-icons/ci";
import { RootState } from '../../redux/store';
import Loading from '../../Components/Loading/Loading';
import CartItems from '../../Components/CartItems';
import Calculation from '../../Components/CalculationTotal';
import { useParams } from 'react-router-dom';

const Cart: React.FC = () => {
  const vendorCartItems: ShowVendorOrder[] = useSelector((state: RootState) => state.cart.cartItems);
  const { fromStock } = useParams();
  console.log(fromStock)
  if (vendorCartItems.length <= 0) return (
    <div className='w-full flex calc-height items-center justify-center text-2xl font-[400]'>
      Please add some toys <CiShoppingCart className='mt-2 w-[30px]' />
    </div>
  );
  
  return (
    <Loading>
      <div className='max-w-7xl m-auto mt-6  bg-white flex sm:flex-cols flex-row shadow-xl gap-3 p-4'>
        <CartItems />
        {fromStock && <Calculation from='ngo' to='school' />}
        {!fromStock && <Calculation />}
      </div>
    </Loading>
  );
}

export default Cart