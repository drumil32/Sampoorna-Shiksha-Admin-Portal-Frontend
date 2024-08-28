import { useEffect, useState } from "react";
import { setError, setLoading } from "../../redux/slices/statusSlice";
import axiosInstance from "../../utils/axiosInstance";
import { TOYS, VENDOR_ORDER } from "../../utils/restEndPoints";
import { IToy } from "../../types/School";
import { Action } from "../../types/error";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Loading from "../../Components/Loading/Loading";
import Error from "../../Components/ErrorHandler/Error";
import { VendorCartItem } from "../../types/VendorOrder";

const Home: React.FC = () => {
    const [toys, setToys] = useState<IToy[]>([]);
    const [vendorOrdercart, setVendorOrderCart] = useState<VendorCartItem[]>([]);

    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(setLoading(true));
                const response = await axiosInstance.get(TOYS);
                setToys(response.data);
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
        }
        fetchData();
    }, []);
    const placeOrder = async () => {
        try {
            dispatch(setLoading(true));  // loading should be there in btn for this will add loading on btn and have id for each btn
            const response = await axiosInstance.post(VENDOR_ORDER, { cart: vendorOrdercart });
            toast.success(response.data.message);
        } catch (error: any) {
            if (error.response) {
                dispatch(
                    setError({
                        statusCode: error.response.status,
                        message: error.response.data.error,
                        action: Action.PLACE_VENDOR_ORDER,
                    })
                );
            } else {
                toast.error("Server is Down");
            }
        } finally {
            dispatch(setLoading(false));
        }
    }
    return (
        <Loading>
            <Error>
                <div>Home</div>
            </Error>
        </Loading>
    )
}

export default Home;