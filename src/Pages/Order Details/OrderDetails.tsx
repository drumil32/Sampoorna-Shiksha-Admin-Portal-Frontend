import { useParams } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import { VendorOrder, VendorOrderStatus, VendorOrderStatusInfo } from "../../types/VendorOrder";
import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { GET_VENDOR_ORDER_BY_ID, UPDATE_VENDOR_ORDER, STOCK, REMOVE_FROM_STOCK, CHECK_AVAILABLE_STOCK } from "../../utils/restEndPoints";
import { setError, setBackdrop } from "../../redux/slices/statusSlice";
import { useNavigate } from "react-router-dom";
import _ from 'loadsh';

const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [orderDetails, setOrderDetails] = useState<VendorOrder | null>(null);
  const [newStatus, setNewStatus] = useState<VendorOrderStatusInfo>({ timestamps: '', personName: '', contactNumber: '', status: VendorOrderStatus.PENDING });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderRef = useRef<VendorOrder | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(`${GET_VENDOR_ORDER_BY_ID}/${id}`);
      const clonedData = _.cloneDeep(response.data);
      console.log(response.data);
      setOrderDetails(response.data);
      orderRef.current = clonedData;
    }
    fetchData();
  }, []);

  const updateToy = async () => {
    try {
      dispatch(setBackdrop(true));
      if (orderDetails?.from == 'ngo') {
        await axiosInstance.post(CHECK_AVAILABLE_STOCK, {
          cart: orderDetails.listOfToysSentLink.map(toy => ({ toyId: toy.toy.id, quantity: toy.quantity }))
        });
      }
      const response = await axiosInstance.put(`${UPDATE_VENDOR_ORDER}/${id}`, {
        order: orderDetails
      });
      setOrderDetails(response.data.order);
      orderRef.current = _.cloneDeep(response.data.order)
      console.log(response.data.order)
      toast.success(response.data.message);
    } catch (error: any) {
      if (error.response) {
        dispatch(
          setError({
            statusCode: error.response.status,
            message: error.response.data.error
          })
        );
      } else {
        toast.error("Server is Down.");
      }
      setOrderDetails(orderRef.current);
    } finally {
      setEditMode(false);
      dispatch(setBackdrop(false));
    }
  };


  const addNewStatus = async () => {
    try {
      dispatch(setBackdrop(true));
      const response = await axiosInstance.put(`${UPDATE_VENDOR_ORDER}/${id}`, {
        order: { ...orderDetails, status: [...(orderDetails?.status ?? []), newStatus] }
      });
      setOrderDetails(response.data.order);
      console.log(response.data.order)
      toast.success(response.data.message);
      setNewStatus({ timestamps: '', personName: '', contactNumber: '', status: VendorOrderStatus.PENDING });
    } catch (error: any) {
      if (error.response) {
        dispatch(
          setError({
            statusCode: error.response.status,
            message: error.response.data.error
          })
        );
      } else {
        toast.error("Server is Down.");
      }
    } finally {
      setEditMode(false);
      dispatch(setBackdrop(false));
    }
  }

  const addToStock = async () => {
    try {
      dispatch(setBackdrop(true));
      const response = await axiosInstance.post(STOCK, {
        toys: orderDetails?.listOfToysSentLink.map(toy => ({ toy: toy.toy.id, quantity: toy.quantity })),
        orderId: id
      });
      toast.success(response.data.message);
    } catch (error: any) {
      if (error.response) {
        dispatch(
          setError({
            statusCode: error.response.status,
            message: error.response.data.error
          })
        );
      } else {
        toast.error("Server is Down.");
      }
    } finally {
      dispatch(setBackdrop(false));
    }
  }

  const removeToStock = async () => {
    if (orderDetails?.to == 'ngo' && orderDetails.isAddedOrRemovedFromTheStock == false) {
      try {
        dispatch(setBackdrop(true));
        const response = await axiosInstance.post(REMOVE_FROM_STOCK, {
          toys: orderDetails?.listOfToysSentLink.map(toy => ({ toy: toy.toy.id, quantity: toy.quantity })),
          orderId: id
        });
        toast.success(response.data.message);
        setOrderDetails(response.data.order);
      } catch (error: any) {
        if (error.response) {
          dispatch(
            setError({
              statusCode: error.response.status,
              message: error.response.data.error
            })
          );
        } else {
          toast.error("Server is Down.");
        }
      } finally {
        dispatch(setBackdrop(false));
      }
    }
  }

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

      if (fieldName == 'quantity') {
        listOfToysSentLink[index].quantity = value;
      } else {
        listOfToysSentLink[index].price = value;
      }

      return { ...prevValue, listOfToysSentLink };
    });
  }

  return (
    <Loading>
      <div className='toys-details-container grid grid-cols-1 mt-4 max-w-[90%] gap-4 m-auto'>
        <div className=' shadow-lg rounded-md border p-8 bg-blue-50 max-w-xl'>
          <div className='flex justify-between items-center'>
            <h2 className='text-xl mb-3'>Order Details</h2>
            {orderDetails?.isAddedOrRemovedFromTheStock == false && (
              <button
                className='bg-green-500 text-xs rounded-md p-2 text-white font-medium mb-3'
                onClick={() =>
                  editMode ? updateToy() : setEditMode(!editMode)
                }
              >
                {editMode ? "Save Details" : "Update Details"}
              </button>
            )}
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

            <p className='p-1 font-[300] flex flex-col items-start'>
            
              {orderDetails?.to == "ngo" && (
                <button
                  onClick={() => addToStock()}
                  className={`text-xs border bg-green-500 flex items-start t p-2 text-white rounded-md  }`}
                  disabled={orderDetails?.isAddedOrRemovedFromTheStock}
                >
                  {orderDetails?.isAddedOrRemovedFromTheStock
                    ? "Added"
                    : "Add To stock"}
                </button>
              )}

              {orderDetails?.to == "school" && (
                <>
                  <strong>School</strong>
                  <button
                    onClick={() => navigate(`/school/${orderDetails?.school}`)}
                    className={`text-xs border bg-green-500 flex items-start t p-2 text-white rounded-md  }`}
                    disabled={orderDetails?.isAddedOrRemovedFromTheStock}
                  >
                    Visit to school
                  </button>
                </>
              )}
              {orderDetails?.from == "ngo" && (
                <button
                  onClick={() => removeToStock()}
                  className={`text-xs border bg-green-500 flex items-start t p-2 text-white rounded-md  }`}
                  disabled={orderDetails?.isAddedOrRemovedFromTheStock}
                >
                  {orderDetails?.isAddedOrRemovedFromTheStock
                    ? "Removed"
                    : "Remove From stock"}
                </button>
              )}
            </p>

            {orderDetails?.to == "school" && (
              <p className='p-1 font-[300] flex flex-col'>
                <strong>School Id </strong>
                {!editMode ? (
                  <span className='text-sm'>{orderDetails?.id}</span>
                ) : (
                  <input
                    type='text'
                    placeholder='School id'
                    name='id'
                    className='border outline-none rounded-md text-sm p-2'
                    onChange={(e) =>
                      setOrderDetails((prev) =>
                        prev ? { ...prev, id: e.target.value } : prev
                      )
                    }
                  />
                )}
              </p>
            )}
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
                    <td className='border p-2'>
                      {!editMode ? (
                        <span>{item.timestamps}</span>
                      ) : (
                        <input
                          type='datetime-local'
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

            <tfoot>
              <tr>
                <td>
                  <input
                    className='border border-gray-300 w-full  rounded-sm p-3 text-sm outline-none'
                    type='datetime-local'
                    placeholder='TimeStamps'
                    name='timestamps'
                    value={newStatus.timestamps}
                    onChange={(e) =>
                      setNewStatus((prev) => ({
                        ...prev,
                        timestamps: e.target.value,
                      }))
                    }
                  />
                </td>
                <td>
                  <input
                    className='border border-gray-300 w-full  rounded-sm p-3 text-sm outline-none'
                    type='text'
                    placeholder='Person name'
                    name='personName'
                    value={newStatus.personName}
                    onChange={(e) =>
                      setNewStatus((prev) => ({
                        ...prev,
                        personName: e.target.value,
                      }))
                    }
                  />
                </td>
                <td>
                  <input
                    className='border border-gray-300 w-full  rounded-sm p-3  text-sm outline-none'
                    type='number'
                    placeholder='Contact number'
                    name='contactNumber'
                    value={newStatus.contactNumber}
                    onChange={(e) =>
                      setNewStatus((prev) => ({
                        ...prev,
                        contactNumber: e.target.value,
                      }))
                    }
                  />
                </td>
                <td>
                  <select
                    name='status'
                    className='text-sm border border-gray-300 w-full p-3'
                    value={newStatus.status}
                    onChange={(e) =>
                      setNewStatus((prev) => ({
                        ...prev,
                        status:
                          VendorOrderStatus[
                            e.target.value as keyof typeof VendorOrderStatus
                          ],
                      }))
                    }
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
                <td colSpan={4} className='text-center'>
                  <button
                    className='bg-green-400 text-sm text-white rounded-md p-2 font-[300] hover:bg-green-700 ml-auto mt-3 mb-3'
                    onClick={addNewStatus}
                  >
                    Add Status
                  </button>
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
                            isNaN(parseInt(e.target.value))
                              ? 0
                              : parseInt(e.target.value),
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
                            isNaN(parseInt(e.target.value))
                              ? 0
                              : parseInt(e.target.value),
                            "quantity"
                          )
                        }
                      />
                    )}
                  </td>
                  <td className='border p-2'>{toy.category}</td>
                  <td className='border p-2'>
                    {toy.level ? toy.level : "Not Provided"}
                  </td>
                  <td className='border p-2'>
                    {toy.learn?.length !== 0
                      ? toy.learn?.join(" , ")
                      : "Not Provided"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Loading>
  );
};

export default OrderDetails;
