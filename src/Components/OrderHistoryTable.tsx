import React, { useEffect, useState } from 'react';
import { FaFilter } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


import { VendorOrder, VendorOrderType, VendorOrderStatus } from '../types/VendorOrder';

const OrderHistoryTable: React.FC<{ orders: VendorOrder[] }> = ({ orders }) => {

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [orderType, setOrderType] = useState<VendorOrderType | undefined>(undefined);
  const [orderStatus, setOrderStatus] = useState<VendorOrderStatus | undefined>(undefined);
  const [filterOrders, setFilterOrders] = useState<VendorOrder[]>(orders);

  useEffect(() => {
    setFilterOrders(orders);
  }, [orders]);

  const navigate = useNavigate();

  const matchOrderBrandOrSubBrand = (orderName: string) => {
    return '' == searchQuery || orderName.toLowerCase().includes(searchQuery.toLowerCase());
  };

  const handleSearch = () => {
    setFilterOrders(
      orders.filter((order) =>
        (order.type == orderType || orderType == undefined) &&
        (matchOrderBrandOrSubBrand(order.brand) || matchOrderBrandOrSubBrand(order.subBrand)) &&
        (undefined == orderStatus || (order.status.length > 0 ? order.status[order.status.length - 1].status == orderStatus : true))
      )
    );
  }

  return (
    <div>
      <div className='filters flex sm:flex-row flex-col mt-3 sm:max-w-5xl m-auto gap-2 w-[90%] justify-between'>
        <div className='pl-2 flex gap-2 '>
          <input
            type='text'
            placeholder='Brand Or SubBrand...'
            className='text-xs  outline-none border p-2 w-[300px] rounded-sm'
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className='border rounded-sm shadow-sm block  text-[12px] outline-none p-1'
            onChange={(e) =>
              setOrderType(
                e.target.value === "All"
                  ? undefined
                  : VendorOrderType[
                  e.target.value as keyof typeof VendorOrderType
                  ]
              )
            }
          >
            {["All", ...Object.keys(VendorOrderType)].map((orderType) => (
              <option value={orderType}>{orderType}</option>
            ))}
          </select>

          <select
            className='border rounded-md shadow-sm block text-[12px] outline-none p-1'
            onChange={(e) =>
              setOrderStatus(
                e.target.value === "All"
                  ? undefined
                  : VendorOrderStatus[
                  e.target.value as keyof typeof VendorOrderStatus
                  ]
              )
            }
          >
            {["All", ...Object.keys(VendorOrderStatus)].map((status) => (
              <option value={status} className=''>
                {status}
              </option>
            ))}
          </select>

          <select
            name='from'
            className='border rounded-md shadow-md block w-full p-3 text-xs outline-none'
          // value={from}
          >
            <option value='' disabled selected>From</option>
            <option value='vendor'>vendor</option>
            <option value='ngo'>ngo</option>
          </select>

          <select
            name='to'
            className='border rounded-md shadow-md block w-full p-3 text-xs outline-none'
          // value={from}
          >
            <option value='' disabled selected>To</option>
            <option value='vendor'>vendor</option>
            <option value='ngo'>ngo</option>
          </select>
        </div>

        <button
          className='border bg-green-400 p-2 text-sm rounded-sm shadow-md text-white flex items-center gap-1'
          onClick={handleSearch}
        >
          Filter <FaFilter />
        </button>
      </div>
      <div className='table-container sm:max-w-5xl m-auto mt-4 w-[90%] shadow-lg rounded-md overflow-scroll sm:overflow-hidden overflow-y-hidden'>
        <table className='p-4 w-full text-sm '>
          <thead>
            <tr className='border p-3 font-[400]'>
              <th className='p-3 font-[600] border'>Index</th>
              <th className='p-3 font-[600] border'>Brand</th>
              <th className='p-3 font-[600] border'>subBrand</th>
              <th className='p-3 font-[600] border'>From</th>
              <th className='p-3 font-[600] border'>To</th>
              <th className='p-3 font-[600] border'>Status</th>
            </tr>
          </thead>
          <tbody>
            {filterOrders.map((item, index: number) => {
              console.log(item);
              return (
                <tr
                  className={`border text-center text-xs ${index % 2 !== 0 ? "bg-gray-100" : ""
                    } hover:bg-gray-200 cursor-pointer`}
                  onClick={() => navigate(`/order-details/${item.id}`)}
                >
                  <td className='border p-2'>{index + 1}</td>
                  <td className='border p-2'>{item.brand}</td>
                  <td className='border p-2'>{item.subBrand}</td>
                  <td className='border p-2'>{item.from}</td>
                  <td className='border p-2'>{item.to}</td>
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
    </div>
  );
}

export default OrderHistoryTable