import { useParams } from "react-router-dom";
import Error from "../../Components/ErrorHandler/Error";
import Loading from "../../Components/Loading/Loading";
import { VendorOrder, VendorOrderType, VendorOrderStatus } from "../../types/VendorOrder";
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
            action: Action.VENDOR_ORDER_HISTORY,
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

  const handleStatusUpdate = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const { name, value } = e.target;
    setOrderDetails(prevValue => {
      if (!prevValue) return prevValue;
      const status = prevValue?.status ?? [];
      status[index] = { ...status[index], [name]: value };
      return { ...prevValue, status };
    });
  }
  const handleToyArrayChanges = (index: number, value: number, fieldName: string) => {
    setOrderDetails(prevValue => {
      if (!prevValue) return prevValue;
      const listOfToysSentLink = prevValue?.listOfToysSentLink ?? [];
      if (fieldName == 'quantity' && value == 0) {
        listOfToysSentLink.splice(index, 1);
      } else {
        if (fieldName == 'quantity') {
          listOfToysSentLink[index].quantity = value;
        } else {
          listOfToysSentLink[index].price = value;
        }
      }
      return { ...prevValue, listOfToysSentLink };
    });
  }

  return (
    <Error>
      <Loading>
        <div className='toys-details-container grid grid-cols-1 mt-4 max-w-[90%] gap-4 m-auto'>
          <div className=' shadow-lg rounded-md border p-8 bg-blue-50 max-w-xl'>
            <div className='flex justify-between items-center'>
              <h2 className='text-xl mb-3'>Order Details</h2>
              <button
                className='bg-green-500 text-xs rounded-md p-2 text-white font-medium mb-3'
                onClick={() =>
                  editMode ? updateToy() : setEditMode(!editMode)
                }
              >
                {editMode ? "Save Details" : "Update Details"}
              </button>
            </div>

            <div className='card grid grid-cols-2 bg-white border p-2'>
              <p className='p-1 font-[300] flex flex-col'>
                <strong>Brand </strong>
                <span className='text-sm'>{orderDetails?.brand}</span>
              </p>

              <p className='p-1 font-[300] flex flex-col'>
                <strong>subBrand </strong>
                <span className='text-sm'>{orderDetails?.subBrand}</span>
              </p>

              <p className='p-1 font-[300] flex flex-col gap-1 '>
                <strong>Order Type </strong>
                {!editMode ? (
                  <span className='text-sm'>{orderDetails?.type}</span>
                ) : (
                  <select
                    name='order-type'
                    className='border rounded-md shadow-md block w-full p-2 text-sm outline-none'
                    onChange={(e) =>
                      setOrderDetails((prevValue) =>
                        prevValue
                          ? {
                              ...prevValue,
                              type: VendorOrderType[
                                e.target.value as keyof typeof VendorOrderType
                              ],
                            }
                          : prevValue
                      )
                    }
                    value={orderDetails?.type}
                  >
                    {Object.keys(VendorOrderType).map((orderType) => (
                      <option key={orderType} value={orderType}>
                        {orderType}
                      </option>
                    ))}
                  </select>
                )}
              </p>

              <p className='p-1 font-[300] flex flex-col'>
                <strong>Address </strong>
                {!editMode ? (
                  orderDetails?.address ? (
                    orderDetails?.address
                  ) : (
                    "Not Provided"
                  )
                ) : (
                  <input
                    type='text'
                    className='border rounded-md shadow-md block w-full p-2 text-sm mt-1 outline-none'
                    value={orderDetails?.address}
                    onChange={(e) =>
                      setOrderDetails((prevValue) =>
                        prevValue
                          ? { ...prevValue, address: e.target.value }
                          : prevValue
                      )
                    }
                  />
                )}
              </p>
            </div>
          </div>

          <div className='status-container shadow-lg rounded-md border p-8 bg-blue-50'>
            <h2 className='text-xl mb-3'>Order Status</h2>
            <table className='p-4 w-full text-sm bg-white'>
              <thead>
                <tr>
                  <th className='p-3 font-[500] border'>TimeStamps</th>
                  <th className='p-3 font-[500] border'>Person Name</th>
                  <th className='p-3 font-[500] border'>Contact Number</th>
                  <th className='p-3 font-[500] border'>Status</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails?.status?.map((item, index: number) => {
                  return (
                    <tr
                      className={`border text-center text-sm ${
                        index % 2 !== 0 ? "bg-gray-100" : ""
                      } hover:bg-gray-200 cursor-pointer`}
                    >
                      <td className='border p-1'>
                        {!editMode ? (
                          <span>{item.timestamps}</span>
                        ) : (
                          <input
                            type='text'
                            name='timestamps'
                            className='border rounded-md shadow-md block w-full p-2 text-sm mt-1 outline-none'
                            value={item.timestamps}
                            onChange={(e) => handleStatusUpdate(e, index)}
                          />
                        )}
                      </td>

                      <td className='border p-1'>
                        {!editMode ? (
                          <span>{item.personName}</span>
                        ) : (
                          <input
                            type='text'
                            name='personName'
                            className='border rounded-md shadow-md block w-full p-2 text-sm mt-1 outline-none'
                            value={item.personName}
                            onChange={(e) => handleStatusUpdate(e, index)}
                          />
                        )}
                      </td>

                      <td className='border p-1'>
                        {!editMode ? (
                          <span>{item.contactNumber}</span>
                        ) : (
                          <input
                            type='text'
                            name='contactNumber'
                            className='border rounded-md shadow-md block w-full p-2 text-sm mt-1 outline-none'
                            value={item.contactNumber}
                            onChange={(e) => handleStatusUpdate(e, index)}
                          />
                        )}
                      </td>

                      <td className='border p-1'>
                        {!editMode ? (
                          <span>{item.status}</span>
                        ) : (
                          <select
                            value={item.status}
                            className='outline-none p-1 rounded-md'
                            name='status'
                            onChange={(e) => handleStatusUpdate(e, index)}
                          >
                            {Object.keys(VendorOrderStatus).map((ele) => (
                              <option value={ele}>{ele}</option>
                            ))}
                          </select>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>

              <tfoot className="">
                <tr className="mt-3">
                  <td>
                    <input
                      className='border border-gray-300 w-full  rounded-sm p-3 text-sm outline-none'
                      type='text'
                      placeholder='TimeStamps'
                    />
                  </td>
                  <td>
                    <input
                      className='border border-gray-300 w-full  rounded-sm p-3 text-sm outline-none'
                      type='text'
                      placeholder='Person name'
                    />
                  </td>
                  <td>
                    <input
                      className='border border-gray-300 w-full  rounded-sm p-3  text-sm outline-none'
                      type='number'
                      placeholder='Contact number'
                    />
                  </td>
                  <td>
                    <select
                      name='status'
                      className='text-sm border border-gray-300 w-full p-3'
                    >
                      {Object.keys(VendorOrderStatus).map((orderType) => (
                        <option key={orderType} value={orderType}>
                          {orderType}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>

                <tr>
                  <td colSpan={4} className="text-center">
                    <button className='bg-green-400 text-sm text-white rounded-md p-2 font-bold ml-auto'>Add Status</button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div className='table-container-details sm:max-w-8xl m-auto mt-9 w-[90%] shadow-lg rounded-md border p-8 bg-blue-50'>
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
                    className={`border text-center text-sm ${
                      index % 2 !== 0 ? "bg-gray-100" : ""
                    } hover:bg-gray-200 cursor-pointer`}
                  >
                    <td className='border p-1'>{toy.id}</td>
                    <td className='border p-1'>{toy.name}</td>
                    <td className='border p-1'>{toy.brand}</td>
                    <td className='border p-1'>{toy.subBrand}</td>
                    <td className='border p-1'>
                      {!editMode ? (
                        item.price
                      ) : (
                        <input
                          type='number'
                          className='border rounded-md shadow-md block w-full p-2 text-xs outline-none'
                          value={item.price}
                          onChange={(e) =>
                            handleToyArrayChanges(
                              index,
                              parseInt(e.target.value),
                              "price"
                            )
                          }
                        />
                      )}
                    </td>
                    <td className='border p-1'>
                      {!editMode ? (
                        item.quantity
                      ) : (
                        <input
                          type='number'
                          className='border rounded-md shadow-md block w-full p-2 text-xs outline-none'
                          value={item.quantity}
                          onChange={(e) =>
                            handleToyArrayChanges(
                              index,
                              parseInt(e.target.value),
                              "quantity"
                            )
                          }
                        />
                      )}
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
