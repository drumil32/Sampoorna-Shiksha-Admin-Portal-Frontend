import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  HOME,
  ORDER_HISTORY,
  ADD_TOY,
  UPDATE_TOY,
  STOCK,
  SCHOOL,
  CART,
} from "../utils/routes";
import { FaPlus } from "react-icons/fa6";
import { setBackdrop, setError } from "../redux/slices/statusSlice";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { CiShoppingCart } from "react-icons/ci";
import { LuSchool } from "react-icons/lu";
import { MdOutlineEdit } from "react-icons/md";
import { CiBoxes } from "react-icons/ci";

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation(); // Get current location

  const handleActive = (path: string) => {
    return location.pathname == path ? "border-2 bg-gray-400 border-black-500 text-white font-bold" : ""; // Dynamically set active class
  };

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
            message: error.response.data.error,
          })
        );
      } else {
        toast.error("Server is Down.");
      }
    } finally {
      dispatch(setBackdrop(false));
    }
  };


  return (
    <div className='bg-white sticky w-[100%]  top-0 shadow-md p-2 font-[300] text-gray-600 flex gap-1  items-center justify-between'>
      <Link
        to={HOME}
        className={`font-semibold sm:text-md text-xs text-gray-700 p-1 py-2 border rounded-md  ${handleActive(HOME)}`}
      >
        Sampooran Shiksha
      </Link>

      <div className='flex gap-2 items-center'>
        <button
          onClick={addNewSchoolData}
          className={`border flex gap-2 border-gray-400  sm:p-2   sm:text-xs items-center rounded-md  text-gray-700 font-semibold }`}
        >
          Add new Schools
          <LuSchool className='relative' />
        </button>

        <Link
          to={STOCK}
          className={`flex gap-2 border border-gray-400 sm:p-2 sm:text-xs items-center rounded-md  text-gray-700 font-medium ${handleActive(STOCK)}`}
        >
          <span>Stock</span>
          <CiBoxes className='relative' />
        </Link>

        <Link
          to={SCHOOL}
          className={`flex gap-2 border border-gray-400 sm:p-2  sm:text-xs items-center rounded-md  text-gray-700 font-medium ${handleActive(SCHOOL)}`}
        >
          <span>Schools</span>
          <LuSchool className='relative' />
        </Link>

        <Link
          to={ADD_TOY}
          className={`flex gap-2 border border-gray-400 sm:p-2  sm:text-xs items-center rounded-md  text-gray-700 font-medium ${handleActive(ADD_TOY)}`}
        >
          <span>Add Toy</span>
          <FaPlus className='relative' />
        </Link>

        <Link
          to={UPDATE_TOY}
          className={`flex gap-2 border border-gray-400 sm:p-2 sm:text-xs items-center rounded-md  text-gray-700 font-medium ${handleActive(UPDATE_TOY)}`}
        >
          <span>Update Toy</span>
          <MdOutlineEdit className='relative' />
        </Link>

        <Link
          to={ORDER_HISTORY}
          className={` border p-2  rounded-md text-xs bg-white border-gray-400 font-semibold  ${handleActive(ORDER_HISTORY)}`}
        >
          Order History
        </Link>

        <Link to={`${CART}`}>
          <CiShoppingCart className='sm:text-4xl text-sm  relative' />
        </Link>
      </div>
    </div>
  );
};

export default Header;

