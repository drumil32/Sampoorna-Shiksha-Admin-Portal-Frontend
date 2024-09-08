import React, { useEffect, useState } from "react";
import Error from "../../Components/ErrorHandler/Error";
import Loading from "../../Components/Loading/Loading";
import axiosInstance from "../../utils/axiosInstance";
import { GET_ALL_VENDOR_ORDER } from "../../utils/restEndPoints";
import { setLoading, setError } from "../../redux/slices/statusSlice";
import { toast } from "react-toastify";
import { Action } from "../../types/error";
import { CiSearch } from "react-icons/ci";
import AddToy from "../AddToy/AddToy";
import { useDispatch } from "react-redux";
import { IToy } from "../../types/School";
import { GET_TOY_BY_ID } from "../../utils/restEndPoints";



const UpdateToy: React.FC = () => {

    const [toyId , setToyId] = useState<string>("");
    const [toy , setToy] = useState<IToy>();
    const dispatch = useDispatch();
    console.log(toy)


      const findToy = async () => {
        try {
          dispatch(setLoading(true));
          const response = await axiosInstance.get(`${GET_TOY_BY_ID}/${toyId}`);
          setToy(response.data.toy);
          console.log(response.data.toy)
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
          dispatch(setLoading(false));
        }
      }


  return (
    <Error>
      <Loading>
        <div className='w-full flex items-center justify-center mt-3'>
          <div className='w-[48%] flex items-center border bg-white justify-between p-2 rounded-md shadow-lg focus:bg-red-300 '>
            <input
              type='search'
              placeholder='Find Toy By Id...'
              className='p-2 w-[90%]  outline-none'
              onChange={(e) => setToyId(e.target.value)}
            />
            <button className="border p-2 bg-green-500 text-white flex items-center text-sm gap-1" onClick={findToy}>
             <span>Search</span>
              <CiSearch className="mt-1"/>
            </button>
          </div>
        </div>
        <AddToy title="Update Toy" toyData={toy}/>
      </Loading>
    </Error>
  );
};

export default UpdateToy;