import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShowVendorOrder } from "../types/VendorOrder";
import { RootState } from "../redux/store";
import { VENDOR_ORDER } from "../utils/restEndPoints";
import { toast } from "react-toastify";
import validateVendorType from "../utils/validation/validateOrder";
import { VendorOrderType } from "../types/VendorOrder";
import axiosInstance from "../utils/axiosInstance";
import { Action } from "../types/error";
import { setLoading, setError } from "../redux/slices/statusSlice";
import { setUpdateQty } from "../redux/slices/cartSlice";

const Calculation: React.FC = () => {
  const [total, setTotal] = useState<number>(0);
  const [schoolAddress, setSchoolAddress] = useState<string>("");

  const [orderType, setOrderType] = useState<VendorOrderType>(VendorOrderType.NGO);

  const vendorCartItems: ShowVendorOrder[] = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    setTotal(vendorCartItems.reduce((acc, curr) => acc + (curr.toy.price ?? 0) * curr.quantity, 0));
  }, [vendorCartItems]);

  const orderItems = vendorCartItems?.map((item) => {
    return {
      toyId: item.toy.id,
      price: item.toy.price,
      quantity: item.quantity,
      brand: item.toy.brand,
      subBrand: item.toy.subBrand,
    };
  });

  // place order function
  const placeOrder = async () => {
    if (!validateVendorType(orderType)) {
      toast.error("Vendor type is required");
      return;
    }

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

  return (
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
          {vendorCartItems?.map((item, index) => {
            return (
              <tr
                className={`border text-center text-xs ${
                  index % 2 !== 0 ? "bg-gray-100" : ""
                }`}
              >
                <td className='border p-2'>{item.toy.name}</td>
                <td className='border p-2'>{item.toy.price}</td>
                <td className='border p-2'>
                  <input
                    type='text'
                    placeholder='Qty'
                    className='border p-1 outline-none'
                    min={1}
                    onChange={(e) =>
                      dispatch(
                        setUpdateQty({
                          toy: item.toy,
                          quantity: parseInt(e.target.value),
                        })
                      )
                    }
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
        <div className='grid grid-cols-2 gap-3 w-full'>
          <div className="">
            <label htmlFor=''>From</label>
            <select
              name=''
              id=''
              className='border rounded-md shadow-md block w-full p-3 text-xs outline-none'
              onChange={(e) =>
                setOrderType(
                  VendorOrderType[
                    e.target.value as keyof typeof VendorOrderType
                  ]
                )
              }
            >
              <option value=''>vendor</option>
              <option value='ngo'>ngo</option>
              <option value='school'>school</option>
            </select>
          </div>

          <div>
            <label htmlFor=''>To</label>
            <select
              name=''
              id=''
              className='border rounded-md shadow-md block w-full p-3 text-xs outline-none'
              onChange={(e) =>
                setOrderType(
                  VendorOrderType[
                    e.target.value as keyof typeof VendorOrderType
                  ]
                )
              }
            >
              <option value=''>vendor</option>
              <option value='ngo'>ngo</option>
              <option value='school'>school</option>
            </select>
          </div>
        </div>
        <input
          type='text'
          placeholder='Enter your School Id'
          className='border rounded-md shadow-md w-full p-3 text-xs outline-none'
          onChange={(e) => setSchoolAddress(e.target.value)}
          value={schoolAddress}
        />
        <button
          onClick={placeOrder}
          className='bg-blue-500 p-2 rounded-md hover:bg-blue-600 text-white w-full'
        >
          Place Order
        </button>
      </div>
    </div>
  );
};


export default Calculation;
