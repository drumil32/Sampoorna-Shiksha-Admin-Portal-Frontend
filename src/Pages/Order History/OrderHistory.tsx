import React, { useEffect, useState } from "react";
import Error from "../../Components/ErrorHandler/Error";
import Loading from "../../Components/Loading/Loading";
import axiosInstance from "../../utils/axiosInstance";
import { GET_ALL_VENDOR_ORDER } from "../../utils/restEndPoints";
import { useDispatch} from "react-redux";
import { setLoading, setError } from "../../redux/slices/statusSlice";
import { toast } from "react-toastify";
import { Action } from "../../types/error";
import {
  VendorOrder,
  VendorOrderType,
  VendorOrderStatus,
} from "../../types/VendorOrder";


import { useNavigate } from "react-router-dom";

const OrderHistory: React.FC = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState<VendorOrder[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [orderType , setOrderType] = useState<string>("");
  const [orderStatus , setOrderStatus] = useState<string>("");

  const navigate = useNavigate();

  const matchOrder = (orderName: string) => {
    return orderName.toLowerCase().includes(inputValue.toLowerCase());
  };

  const filterOrder = (data: VendorOrder[]) => {
    return data.filter((order) => matchOrder(order.brand) || matchOrder(order.subBrand));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {

        // let queryParams = `${SCHOOL}?sortByAsc=${sortAsc}`;

        // if (searchType === "School Name") {
        //   queryParams += `&nameOfSchoolInstitution=${search}`;
        // } else if (searchType === "School Code") {
        //   queryParams += `&code=${search}`;
        // }

        dispatch(setLoading(true));
        const response = await axiosInstance.get(GET_ALL_VENDOR_ORDER);
        console.log(response.data);
        setOrders(response.data);
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
        dispatch(setLoading(false));
      }
    };
    fetchData();
  }, []);

  return (
    <Error>
      <Loading>
        <div className='filters flex sm:flex-row flex-col mt-3 sm:max-w-5xl m-auto gap-2 w-[90%]'>
          <div className='border pl-2 flex gap-2  rounded-md shadow-sm'>
            <input
              type='text'
              placeholder='Brand or subBrand'
              className='text-xs  outline-none'
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button className='border bg-green-400 p-2 text-sm rounded-l-t-none rounded-l-b-none shadow-sm text-white'>
              Search
            </button>
          </div>
          <select
            name=''
            id=''
            className='border rounded-sm shadow-sm block  text-[12px] outline-none'
            onChange={(e) => setOrderType(e.target.value)}
          >
            {["All", ...Object.keys(VendorOrderType)].map((orderType) => (
              <option value={orderType}>{orderType}</option>
            ))}
          </select>

          <select
            name=''
            id=''
            className='border rounded-md shadow-sm block text-[12px] outline-none'
            onChange={(e) => setOrderStatus(e.target.value)}
          >
            {Object.keys(VendorOrderStatus).map((status) => (
              <option value={status} className=''>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className='table-container sm:max-w-5xl m-auto mt-4 w-[90%] shadow-lg rounded-md overflow-scroll sm:overflow-hidden overflow-y-hidden'>
          <table className='p-4 w-full text-sm '>
            <thead>
              <tr className='border p-3 font-[400]'>
                <th className='p-3 font-[600] border'>Index</th>
                <th className='p-3 font-[600] border'>Brand</th>
                <th className='p-3 font-[600] border'>subBrand</th>
                <th className='p-3 font-[600] border'>Type</th>
                <th className='p-3 font-[600] border'>Status</th>
              </tr>
            </thead>
            <tbody>
              {filterOrder(orders)?.map((item: VendorOrder, index: number) => {
                return (
                  <tr
                    className={`border text-center text-xs ${
                      index % 2 !== 0 ? "bg-gray-100" : ""
                    } hover:bg-gray-200 cursor-pointer`}
                    onClick={() =>
                      navigate(`/order-details/${item.id}`, {
                        state: { data: item },
                      })
                    }
                  >
                    <td className='border p-2'>{index + 1}</td>
                    <td className='border p-2'>{item.brand}</td>
                    <td className='border p-2'>{item.subBrand}</td>
                    <td className='border p-2'>{item.type}</td>
                    <td className='border p-2 flex gap-2 items-center justify-center'>
                      {item.status.length <= 0
                        ? "Not Provided"
                        : item.status[item.status.length - 1].status}
                    </td>
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

export default OrderHistory;
