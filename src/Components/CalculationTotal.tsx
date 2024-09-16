import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShowVendorOrder } from "../types/VendorOrder";
import { RootState } from "../redux/store";
import { CHECK_AVAILABLE_STOCK, VENDOR_ORDER } from "../utils/restEndPoints";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
import { setError, setBackdrop } from "../redux/slices/statusSlice";
import { clearHomeCart, setUpdateQtyToHomeCart } from "../redux/slices/homeCartSlice";
import { clearStockCart, setUpdateQtyToStockCart } from "../redux/slices/stockCartSlice";

const Calculation: React.FC<{ currentCart: string }> = ({ currentCart }) => {

  const [total, setTotal] = useState<number>(0);
  const [from, setFrom] = useState<string>('vendor');
  const [to, setTo] = useState<string>('ngo');
  const [schoolId, setSchoolId] = useState<string | null>(null);
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
    if (from == to) {
      toast.error("From and To cannot be same");
      return;
    }
    if (schoolId && schoolId.length == 0) {
      toast.error("School ID is required");
      return;
    }
    try {
      dispatch(setBackdrop(true));
      if (from == 'ngo') {
        await axiosInstance.post(CHECK_AVAILABLE_STOCK, { cart: orderItems });
      }

      const response = await axiosInstance.post(VENDOR_ORDER, {
        cart: orderItems,
        schoolId,
        from,
        to
      });
      toast.success(response.data.message);
      // TODO: why we are using setTimeout here?
      setTimeout(() => {
        currentCart == 'Home' ? dispatch(clearHomeCart([])) : dispatch(clearStockCart([]));
      }, 2000)
    } catch (error: any) {
      if (error.response) {
        dispatch(
          setError({
            statusCode: error.response.status,
            message: error.response.data.error
          })
        );
      } else {
        toast.error("Server is Down");
      }
    } finally {
      dispatch(setBackdrop(false));
    }
  };

  return (
    <div className='max-w-xl flex-1'>
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
              <tr key={item.toy.id} className={`border text-center text-xs ${index % 2 !== 0 ? "bg-gray-100" : ""}`}>
                <td className='border p-2'>{item.toy.name}</td>
                <td className='border p-2'>{item.toy.price}</td>
                <td className='border p-2'>
                  <input
                    type='text'
                    placeholder='Qty'
                    className='border p-1 outline-none'
                    min={1}
                    onChange={(e) =>
                      currentCart === 'Home' ?
                        dispatch(
                          setUpdateQtyToHomeCart({
                            toy: item.toy,
                            quantity: parseInt(e.target.value),
                          })
                        ) :
                        dispatch(
                          setUpdateQtyToStockCart({
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
            {" "}
            {currentCart == 'Home' ?
              <select
                name='from'
                className='border rounded-md shadow-md block w-full p-3 text-xs outline-none'
                onChange={(e) =>
                  setFrom(e.target.value)
                }
                value={from}
              >
                <option value='vendor'>vendor</option>
                <option value='ngo'>ngo</option>
              </select> : 'ngo'
            }
          </div>

          <div>
            <label htmlFor=''>To</label>
            {" "}
            {currentCart == 'Home' ?
              <select
                name='to'
                id=''
                className='border rounded-md shadow-md block w-full p-3 text-xs outline-none'
                onChange={(e) =>
                  setTo(e.target.value)
                }
                value={to}
              >
                <option value='ngo'>ngo</option>
                <option value='school'>school</option>
              </select>
              : 'School'
            }
          </div>
        </div>
        <input
          type='text'
          placeholder='Enter your School Id'
          className='border rounded-md shadow-md w-full p-3 text-xs outline-none'
          onChange={(e) => setSchoolId(e.target.value == "" ? null : e.target.value)}
          value={schoolId ?? ''}
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
