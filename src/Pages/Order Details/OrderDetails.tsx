import { useParams } from "react-router-dom";
import Error from "../../Components/ErrorHandler/Error";
import Loading from "../../Components/Loading/Loading";
import { VendorOrder, VendorOrderType } from "../../types/VendorOrder";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Action } from "../../types/error";
import { GET_VENDOR_ORDER_BY_ID, UPDATE_VENDOR_ORDER } from "../../utils/restEndPoints";
import { setLoading, setError } from "../../redux/slices/statusSlice";

const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [orderDetails, setOrderDetails] = useState<VendorOrder | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(`${GET_VENDOR_ORDER_BY_ID}/${id}`);
      console.log(response.data);
      setOrderDetails(response.data);
    }
    fetchData();
  }, []);

  const updateToy = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axiosInstance.put(`${UPDATE_VENDOR_ORDER}/${id}`, {
        order: orderDetails
      });
      console.log(response.data);
      setOrderDetails(response.data.order);
      toast.success("Updated Details successfully");
    } catch (error: any) {
      if (error.response) {
        dispatch(
          setError({
            statusCode: error.response.status,
            message: error.response.data.error,
            action: Action.SCHOOL_DETILS,
          })
        );
      } else {
        toast.error("Server is Down.");
      }
    } finally {
      setEditMode(false);
      dispatch(setLoading(false));
    }
  };
  const handleToyArrayChanges = (index: number, quantity: number) => {
    setOrderDetails(prevValue => {
      if (!prevValue) return prevValue;
      const listOfToysSentLink = prevValue?.listOfToysSentLink ?? [];
      if (quantity == 0) {
        listOfToysSentLink.splice(index, 1);
      } else {
        listOfToysSentLink[index].quantity = quantity;
      }
      return { ...prevValue, listOfToysSentLink };
    });
  }

  return (
    <Error>
      <Loading>
        <div className='sm:max-w-xl m-auto mt-4 w-[90%] shadow-lg rounded-md border p-8 bg-blue-50'>
          <div className='flex justify-between items-center'>
            <h2 className='text-xl mb-3'>Order Details</h2>
            <button
              className='bg-green-500 text-xs rounded-md p-2 text-white font-medium mb-3'
              onClick={() => editMode ? updateToy() : setEditMode(!editMode)}
            >
              {editMode ? 'Save Details' : 'Update Details'}
            </button>
          </div>

          <div className='card grid grid-cols-2 bg-white border p-4'>
            <p className='p-1 font-[300] flex gap-3 items-center'>
              <strong>Brand :</strong>
              <span className='text-sm'>{orderDetails?.brand}</span>
            </p>
            <p className='p-1 font-[300] flex gap-3 items-center'>
              <strong>subBrand :</strong>
              <span className='text-sm'>{orderDetails?.subBrand}</span>
            </p>
            <p className='p-1 font-[300] flex gap-3 items-center'>
              <strong>Order Type :</strong>
              {
                !editMode ?
                  <span className='text-sm'>{orderDetails?.type}</span>
                  :
                  <select
                    name=''
                    id=''
                    className='border rounded-md shadow-md block w-full p-3 text-xs outline-none'
                    onChange={(e) => setOrderDetails(prevValue =>
                      prevValue ? ({ ...prevValue, type: VendorOrderType[e.target.value as keyof typeof VendorOrderType] }) : prevValue)}
                    value={orderDetails?.type}
                  >
                    {Object.keys(VendorOrderType).map((orderType) => (
                      <option key={orderType} value={orderType}>{orderType}</option>
                    ))}
                  </select>
              }
            </p>
            <p className='p-1 font-[300] flex gap-3 items-center'>
              <strong>Status :</strong>
              <span className='text-sm'>
                {!orderDetails?.status.length || orderDetails?.status.length <= 0
                  ? "Not Provided"
                  : orderDetails?.status[orderDetails?.status.length - 1].status}
              </span>
            </p>
            <p className='p-1 font-[300] flex gap-3 text-sm'>
              <strong>Address :</strong>
              {
                !editMode ?
                  orderDetails?.address ? orderDetails?.address : "Not Provided"
                  :
                  <input
                    type='text'
                    className='border rounded-md shadow-md block w-full p-3 text-xs outline-none'
                    value={orderDetails?.address}
                    onChange={(e) => setOrderDetails(prevValue => prevValue ? ({ ...prevValue, address: e.target.value }) : prevValue)} />
              }
            </p>
          </div>
        </div>

        <div className='table-container-details sm:max-w-5xl m-auto mt-9 w-[90%] shadow-lg rounded-md border p-8 bg-blue-50'>
          <h2 className='text-xl mb-3'>Toys Details</h2>
          <table className='p-4 w-full text-sm bg-white'>
            <thead>
              <tr>
                <th className='p-3 font-[500] border'>Id</th>
                <th className='p-3 font-[500] border'>Toy Name</th>
                <th className='p-3 font-[500] border'>Brand</th>
                <th className='p-3 font-[500] border'>subBrand</th>
                <th className='p-3 font-[500] border'>Price</th>
                <th className='p-3 font-[500] border'>Quantity</th>
                <th className='p-3 font-[500] border'>Category</th>
                <th className='p-3 font-[500] border'>Level</th>
                <th className='p-3 font-[500] border'>Learn</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails?.listOfToysSentLink?.map((item, index: number) => {
                const { toy } = item;
                return (
                  <tr
                    key={toy.id}
                    className={`border text-center text-xs ${index % 2 !== 0 ? "bg-gray-100" : ""
                      } hover:bg-gray-200 cursor-pointer`}
                  >
                    <td className='border p-2'>{toy.id}</td>
                    <td className='border p-2'>{toy.name}</td>
                    <td className='border p-2'>{toy.brand}</td>
                    <td className='border p-2'>{toy.subBrand}</td>
                    <td className='border p-2'>{item.price}</td>
                    <td className='border p-2'>
                      {!editMode ?
                        item.quantity
                        :
                        <input
                          type='number'
                          className='border rounded-md shadow-md block w-full p-3 text-xs outline-none'
                          value={item.quantity}
                          onChange={(e) => handleToyArrayChanges(index, parseInt(e.target.value))} />
                      }
                    </td>
                    <td className='border p-2'>{toy.category}</td>
                    <td className='border p-2'>{toy.level}</td>
                    <td className='border p-2'>{toy.learn}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Loading>
    </Error>
  );
};

export default OrderDetails;
