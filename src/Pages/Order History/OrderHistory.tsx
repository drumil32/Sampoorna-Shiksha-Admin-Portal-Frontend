import Error from "../../Components/ErrorHandler/Error";
import Loading from "../../Components/Loading/Loading";
import OrderHistoryTable from "../../Components/OrderHistoryTable";
import axiosInstance from '../../utils/axiosInstance';
import { GET_ALL_VENDOR_ORDER } from '../../utils/restEndPoints';
import { setLoading, setError } from '../../redux/slices/statusSlice';
import { toast } from "react-toastify";
import { Action } from '../../types/error';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { VendorOrder } from "../../types/VendorOrder";

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<VendorOrder[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));
        const response = await axiosInstance.get(GET_ALL_VENDOR_ORDER);
        console.log(response.data)
        setOrders(response.data);
        //   setFilterOrders(response.data);
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

    fetchData();
  }, []);

  return (
    <Error>
      <Loading>
        <div>
          <OrderHistoryTable orders={orders}/>
        </div>
      </Loading>
    </Error>
  );
};

export default OrderHistory;
