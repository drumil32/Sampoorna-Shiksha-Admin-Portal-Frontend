import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { VENDOR_ORDER } from '../../utils/restEndPoints';
import { ShowVendorOrder, VendorOrderType } from '../../types/VendorOrder';
import { toast } from "react-toastify";
import axiosInstance from '../../utils/axiosInstance';
import { setLoading, setError } from '../../redux/slices/statusSlice';
import { setUpdateQty, removeItemToCart } from '../../redux/slices/cartSlice';
import { CiTrash } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { RootState } from '../../redux/store';
import { Action } from '../../types/error';


const Cart: React.FC = () => {
  const cartItems: ShowVendorOrder[] = useSelector((state: RootState) => state.cart.cartItems);
  const [orderType, setOrderType] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [total, setTotal] = useState<number>(0);
  // const [vendorOrdercart, setVendorOrderCart] = useState<VendorCartItem[]>([]);

  const dispatch = useDispatch();

  const orderItems = cartItems?.map(item => {
    return { toyId: item.toy.id, price: item.toy.price, quantity: item.quantity, brand: item.toy.brand, subBrand: item.toy.subBrand };
  });

  useEffect(() => {
    console.log('runnig')
    setTotal(cartItems.reduce((acc, curr) => acc + (curr.toy.price * curr.quantity), 0));
  }, [cartItems]);

  // place order function
  const placeOrder = async () => {
    try {
      dispatch(setLoading(true)); // loading should be there in btn for this will add loading on btn and have id for each btn
      const response = await axiosInstance.post(VENDOR_ORDER, {
        cart: orderItems,
        orderType,
        address,
      });
      toast.success(response.data.message);
    } catch (error: any) {
      if (error.response) {
        dispatch(
          setError({
            statusCode: error.response.status,
            message: error.response.data.error,
            action: Action.PLACE_VENDOR_ORDER,
          })
        );
      } else {
        toast.error("Server is Down");
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (cartItems.length <= 0) return (
    <div className='w-full flex calc-height items-center justify-center text-2xl font-[200]'>
      Please add some toys <CiShoppingCart />
    </div>
  );


  return (
    <div className='container max-w-4xl m-auto mt-6  bg-white shadow-xl p-4 grid  sm:grid-cols-2 grid-cols-1'>
      <div className='item-details flex flex-col items-center gap-3'>
        {cartItems?.map((item) => {
          return (
            <div className='single-toy border rounded-md shadow-md sm:max-w-xs w-[80%] p-4 text-sm flex flex-col'>
              <h1 className='font-medium text-sm text-center flex items-center justify-between'>
                {item.toy.name}
                <CiTrash className='cursor-pointer text-lg text-red-400' onClick={() => dispatch(removeItemToCart(item.toy.id))} />
              </h1>

              <div className='flex flex-col mt-4 text-sm'>
                <p className='font-[300] flex justify-around'>
                  <span className=''>
                    <strong>Price</strong> : {item.toy.price}
                  </span>
                  <span className=''>
                    <strong>Category</strong> : {item.toy.category}
                  </span>
                </p>

                <p className='font-[300] flex justify-around'>
                  <span className=''>
                    <strong>Brand</strong> : {item.toy.brand}
                  </span>
                  <span className='text-ellipsis'>
                    <strong>Learn</strong> {item.toy.learn[0] + "..."}
                  </span>
                </p>

                <p className='font-[300] flex justify-around'>
                  <span className=''>
                    <strong>Serial Number</strong> : {item.toy.srNo}
                  </span>
                  <span className=''>
                    <strong>Level</strong> : {item.toy.level}
                  </span>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* price container */}
      <div className='max-w-xl mt-3 w-[80%] m-auto'>
        <table className='border w-full shadow-md'>
          <thead>
            <tr className='text-sm bg-gray-100'>
              <th className='border p-2 font-[600]'>Name</th>
              <th className='border p-2 font-[600]'>Price</th>
              <th className='border p-2 font-[600]'>Quantity</th>
            </tr>
          </thead>

          <tbody>
            {cartItems?.map((item, index) => {
              return (
                <tr
                  className={`border text-center text-xs ${index % 2 !== 0 ? "bg-gray-100" : ""
                    }`}
                >
                  <td className='border p-2'>{item.toy.name}</td>
                  <td className='border p-2'>{item.toy.price}</td>
                  <td className='border p-2'>
                    <input type="number" placeholder='Qty' className='border p-1 outline-none' min={1}
                      onChange={(e) => dispatch(setUpdateQty({ toy:item.toy, quantity: parseInt(e.target.value) }))}
                      value={item.quantity}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>

          <tfoot>
            <tr className='text-md text-green-600'>
              <td className='border text-center p-2' colSpan={2}>
                Total
              </td>
              <td className='border text-center p-2'>{total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>

        <div className='place-order mt-4 w-full flex flex-col gap-2'>
          <select
            name=''
            id=''
            className='border rounded-md shadow-md block w-full p-3 text-xs outline-none'
            onChange={(e) => setOrderType(e.target.value)}
          >
            <option value="" selected>--Vendor type--</option>
            {Object.keys(VendorOrderType).map((orderType) => (
              <option value={orderType}>{orderType}</option>
            ))}
          </select>

          <input
            type='text'
            placeholder='Enter your delivery address'
            className='border rounded-md shadow-md w-full p-3 text-xs outline-none'
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
          <button onClick={placeOrder} className='bg-blue-500 p-2 rounded-md hover:bg-blue-600 text-white w-full'>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart