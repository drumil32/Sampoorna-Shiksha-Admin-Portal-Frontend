import { useLocation, useParams } from "react-router-dom";
import Error from "../../Components/ErrorHandler/Error";
import Loading from "../../Components/Loading/Loading";
import { VendorOrder, VendorOrderStatus, VendorOrderStatusInfo } from "../../types/VendorOrder";
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import axiosInstance from "../../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Action } from "../../types/error";
import { UPDATE_VENDOR_ORDER } from "../../utils/restEndPoints";
import { setLoading, setError } from "../../redux/slices/statusSlice";

const OrderDetails: React.FC = () => {
  const location = useLocation();
  const { id } = useParams<{id : string}>();
  const [showModel, setShowModel] = useState<boolean>(false);
  const { data } = location.state || {};
  const { listOfToysSentLink } = data;
  const dispatch = useDispatch();

  const [address, setAddress] = useState<string>(data.address || "");
  const [quantity, setQuantity] = useState<number>(1); 
  const [status, setStatus] = useState<VendorOrderStatusInfo[]>([]);
  const updateToy = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axiosInstance.put(`${UPDATE_VENDOR_ORDER}/${id}`, {
        order: {
          address,
          quantity,
          status,
        },
      });
      console.log(response.data);
      toast.success("Updated Details successfully");
      setShowModel(false);
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

  return (
    <Error>
      <Loading>
        <div className='sm:max-w-xl m-auto mt-4 w-[90%] shadow-lg rounded-md border p-8 bg-blue-50'>
          <div className='flex justify-between items-center'>
            <h2 className='text-xl mb-3'>Order Details</h2>
            <button
              className='bg-green-500 text-xs rounded-md p-2 text-white font-medium mb-3'
              onClick={() => setShowModel(!showModel)}
            >
              Update Details
            </button>
          </div>

          <div className='card grid grid-cols-2 bg-white border p-4'>
            <p className='p-1 font-[300] flex gap-3 items-center'>
              <strong>Brand :</strong>
              <span className='text-sm'>{data.brand}</span>
            </p>
            <p className='p-1 font-[300] flex gap-3 items-center'>
              <strong>subBrand :</strong>
              <span className='text-sm'>{data.subBrand}</span>
            </p>
            <p className='p-1 font-[300] flex gap-3 items-center'>
              <strong>Type :</strong>
              <span className='text-sm'>{data.type}</span>
            </p>
            <p className='p-1 font-[300] flex gap-3 items-center'>
              <strong>Status :</strong>
              <span className='text-sm'>
                {data.status.length <= 0
                  ? "Not Provided"
                  : data.status[data.status.length - 1].status}
              </span>
            </p>
            <p className='p-1 font-[300] flex gap-3 text-sm'>
              <strong>Address :</strong>
              {data.address ? data.address : "Not Provided"}
            </p>
            <p className='p-1 font-[300] flex gap-3 text-sm'>
              <strong>Quantity :</strong>
              <span>{quantity}</span>
            </p>
          </div>
        </div>

        <div className='table-container-details sm:max-w-5xl m-auto mt-9 w-[90%] shadow-lg rounded-md border p-8 bg-blue-50'>
          <h2 className='text-xl mb-3'>Toys Details</h2>
          <table className='p-4 w-full text-sm bg-white'>
            <thead>
              <tr>
                <th className='p-3 font-[500] border'>SrNo</th>
                <th className='p-3 font-[500] border'>Toy Name</th>
                <th className='p-3 font-[500] border'>Brand</th>
                <th className='p-3 font-[500] border'>subBrand</th>
                <th className='p-3 font-[500] border'>Price</th>
                <th className='p-3 font-[500] border'>Category</th>
                <th className='p-3 font-[500] border'>Level</th>
                <th className='p-3 font-[500] border'>Learn</th>
              </tr>
            </thead>
            <tbody>
              {listOfToysSentLink?.map((item: VendorOrder, index: number) => {
                const { toy} = item;
                return (
                  <tr
                    key={toy.srNo}
                    className={`border text-center text-xs ${
                      index % 2 !== 0 ? "bg-gray-100" : ""
                    } hover:bg-gray-200 cursor-pointer`}
                  >
                    <td className='border p-2'>{toy.srNo}</td>
                    <td className='border p-2'>{toy.name}</td>
                    <td className='border p-2'>{toy.brand}</td>
                    <td className='border p-2'>{toy.subBrand}</td>
                    <td className='border p-2'>{toy.price}</td>
                    <td className='border p-2'>{toy.category}</td>
                    <td className='border p-2'>{toy.level}</td>
                    <td className='border p-2'>{toy.learn}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* popup model*/}
        <div
          className={`fixed bg-[rgba(0,0,0,0.8)] z-10 inset-0 p-3 flex items-center justify-center ${
            !showModel && "hidden"
          }`}
          id='nav-dialog'
        >
          <div className='card grid grid-cols-2 bg-white border p-12 rounded-md gap-3 shadow-2xl relative'>
            <div
              className='absolute right-1 p-1 border text-xs rounded-md top-2 cursor-pointer hover:bg-black hover:text-white'
              onClick={() => setShowModel(false)}
            >
              <IoCloseSharp />
            </div>

            <p className='p-1 font-[300] flex justify-between'>
              <strong>Brand :</strong>
              <input
                type='text'
                value={data.brand}
                className='border p-1 text-sm outline-none cursor-not-allowed disabled:opacity-85 rounded-sm'
                disabled
              />
            </p>

            <p className='p-1 font-[300] flex justify-between gap-2'>
              <strong>subBrand :</strong>
              <input
                type='text'
                value={data.subBrand}
                className='border p-1 text-sm outline-none disabled:opacity-85 cursor-not-allowed rounded-sm'
                disabled
              />
            </p>

            <p className='p-1 font-[300] flex justify-between items-center'>
              <strong>Type :</strong>
              <input
                type='text'
                value={data.type}
                className='border p-1 text-sm outline-none disabled:opacity-85 cursor-not-allowed rounded-sm'
                disabled
              />
            </p>

            <p className='p-1 font-[300] flex justify-between items-center'>
              <strong>Status :</strong>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)} 
                className='border shadow-sm block text-xs outline-none p-1 pr-16 rounded-sm'
              >
                {Object.keys(VendorOrderStatus).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </p>

            <p className='p-1 font-[300] flex justify-between'>
              <strong>Address :</strong>
              <input
                type='text'
                value={address}
                onChange={(e) => setAddress(e.target.value)} // Handle address change
                className='border p-1 text-sm outline-none rounded-sm'
              />
            </p>

            <p className='p-1 font-[300] flex justify-between'>
              <strong>Quantity :</strong>
              <input
                type='number'
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))} // Handle quantity change
                className='border p-1 text-sm outline-none rounded-sm'
              />
            </p>

            <p className='p-1 font-[300] flex '>
              <input
                type='button'
                className='border p-2 px-4 rounded-md text-sm outline-none bg-green-500 text-white cursor-pointer'
                value={"Save"}
                onClick={updateToy} 
              />
            </p>
          </div>
        </div>
      </Loading>
    </Error>
  );
};

export default OrderDetails;
