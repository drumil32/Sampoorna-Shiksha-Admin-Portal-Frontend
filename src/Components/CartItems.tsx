import Error from './ErrorHandler/Error'
import Loading from './Loading/Loading'
import { ShowVendorOrder } from '../types/VendorOrder';
import {RootState} from '../redux/store'
import { useSelector , useDispatch } from 'react-redux';
import { removeItemToCart } from '../redux/slices/cartSlice';
import { CiTrash } from "react-icons/ci";


const CartItems : React.FC = () => {
    const vendorCartItems: ShowVendorOrder[] = useSelector((state: RootState) => state.cart.cartItems);
    const dispatch = useDispatch();

    return (
      <Error>
        <Loading>
          <div className='item-details flex flex-col items-center gap-3'>
            {vendorCartItems?.map((item) => {
              return (
                <div className='single-toy border rounded-md shadow-md sm:max-w-xs w-[80%] p-4 text-sm flex flex-col bg-blue-50'>
                  <h1 className='font-medium text-xl text-center flex items-center justify-between'>
                    {item.toy.name}
                    <CiTrash
                      className='cursor-pointer text-lg text-red-400'
                      onClick={() =>
                        dispatch(removeItemToCart(item.toy.id ?? ""))
                      }
                    />
                  </h1>

                  <div className='flex flex-col mt-4 gap-1 className="font-semibold" text-sm '>
                    <p className='font-[300] flex '>
                      <span className=''>
                        <strong className='font-semibold'>ID</strong> :{" "}
                        {item.toy.id ?? ""}
                      </span>
                    </p>

                    <p className='font-[300] flex '>
                      <span className=''>
                        <strong className='font-semibold'>Level</strong> :{" "}
                        {item.toy.level}
                      </span>
                    </p>

                    <p className='font-[300] flex justify-between'>
                      <span className=''>
                        <strong className='font-semibold'>Price</strong> :{" "}
                        {item.toy.price}
                      </span>
                      <span className=''>
                        <strong className='font-semibold'>Category</strong> :{" "}
                        {item.toy.category}
                      </span>
                    </p>

                    <p className='font-[300] flex justify-between'>
                      <span className=''>
                        <strong className='font-semibold'>Brand</strong> :{" "}
                        {item.toy.brand}
                      </span>
                      <span className='text-ellipsis'>
                        <strong className='font-semibold'>Learn</strong>{" "}
                        {(item.toy.learn && item.toy.learn[0]) + "..."}
                      </span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Loading>
      </Error>
    );
}

export default CartItems;