import React, { useEffect, useState } from "react";
import Error from "../../Components/ErrorHandler/Error";
import Loading from "../../Components/Loading/Loading";
import axiosInstance from "../../utils/axiosInstance";
import { GET_ALL_VENDOR_ORDER } from "../../utils/restEndPoints";
import { setLoading, setError } from "../../redux/slices/statusSlice";
import { toast } from "react-toastify";
import { Action } from "../../types/error";
import { CiSearch } from "react-icons/ci";


const UpdateToy: React.FC = () => {
    useEffect(() => {
      const fetchData = async () => {
        try {
          dispatch(setLoading(true));
          const response = await axiosInstance.get(GET_ALL_VENDOR_ORDER);
          console.log(response.data);
          setOrders(response.data);
          setFilterOrders(response.data);
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
      };
    //   fetchData();
    }, []);


  return (
    <Error>
      <Loading>
        <div className="w-full calc-height flex items-center justify-center">
          <div className="w-[50%] flex items-center border bg-white justify-between p-2 rounded-md shadow-lg focus:bg-red-300 ">
             <input type="search" placeholder="Find Toy By Id..." className="p-3 w-[80%]  outline-none"/>
             <CiSearch className="text-3xl"/>
          </div>
        </div>
        
      </Loading>
    </Error>
  );
};

export default UpdateToy;
