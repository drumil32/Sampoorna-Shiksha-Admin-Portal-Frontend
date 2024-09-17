import { Link, } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HOME, ORDER_HISTORY, ADD_TOY, UPDATE_TOY, STOCK } from '../utils/routes';
import { FaPlus } from "react-icons/fa6";
import { setBackdrop, setError } from "../redux/slices/statusSlice";
import axiosInstance from "../utils/axiosInstance";
import { SCHOOL } from "../utils/restEndPoints";
import { toast } from "react-toastify";

const Header = () => {
  const dispatch = useDispatch();
  const addNewSchoolData = async () => {
    try {
      dispatch(setBackdrop(true));
      const response = await axiosInstance.post(SCHOOL);
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

  return (
    <div className='bg-gray-200 shadow-md p-3 font-[300] text-gray-600 flex items-center justify-between'>
      <Link
        to={HOME}
        className='font-semibold text-md text-gray-700 border-r-5 p-1 border-gray-900'
      >
        Sampooran Shiksha
      </Link>

      <button onClick={addNewSchoolData}>
        add new Schools
      </button>

      <div className='flex gap-4 items-center'>
        <Link
          to={STOCK}
          className='flex gap-1 border border-gray-400 p-2 text-xs items-center rounded-md bg-green-500 text-white font-medium'
        >
          <span>Stock</span>
        </Link>
        <Link
          to={ADD_TOY}
          className='flex gap-1 border border-gray-400 p-2 text-xs items-center rounded-md bg-green-500 text-white font-medium'
        >
          <span>Add Toy</span>
          <FaPlus className=' relative' />
        </Link>

        <Link
          to={UPDATE_TOY}
          className='flex gap-1 border border-gray-400 p-2 text-xs items-center rounded-md bg-green-500 text-white font-medium'
        >
          <span>Update Toy</span>
        </Link>
        <Link
          to={ORDER_HISTORY}
          className='border p-2 border-orange-500 rounded-md text-xs bg-white'
        >
          Order History
        </Link>


        {/*  */}
      </div>
    </div>
  );
}

export default Header