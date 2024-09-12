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
import Backdrop from "../../Components/Backdrop/Backdrop";
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
        <div className=" mt-3 flex m-auto gap-5 flex-wrap items-center justify-start max-w-6xl pb-20">
          {toys?.map(toy => <Card key={toy.id} toy={toy} />)};
          {/* <Backdrop/> */}
        </div>
      </Error>
    </Loading>
  )
}

export default Home;