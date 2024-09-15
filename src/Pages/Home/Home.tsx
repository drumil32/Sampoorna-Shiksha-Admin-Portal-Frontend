import { useEffect, useState } from "react";
import { setError, setLoading } from "../../redux/slices/statusSlice";
import axiosInstance from "../../utils/axiosInstance";
import { TOYS } from "../../utils/restEndPoints";
import { IToy } from "../../types/School";
import { Action } from "../../types/error";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import Loading from "../../Components/Loading/Loading";
import Error from "../../Components/ErrorHandler/Error";
import Card from "../../Components/Card";


const Home: React.FC = () => {
  const [toys, setToys] = useState<IToy[]>([]);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchToys = async () => {
      try {
        dispatch(setLoading(true));
        const response = await axiosInstance.get(TOYS);
        setToys(response.data.toys);
      } catch (error: any) {
        if (error.response) {
          dispatch(
            setError({
              statusCode: error.response.status,
              message: error.response.data.error,
              action: Action.GET_VENDOR_ORDER,
            })
          );
        } else {
          toast.error("Server is Down.");
        }
      } finally {
        dispatch(setLoading(false));
      }
    }
    fetchToys();
  }, []);



  return (
    <Loading>
      <Error>
         <Card toys={toys} />
      </Error>
    </Loading>
  );
}

export default Home;