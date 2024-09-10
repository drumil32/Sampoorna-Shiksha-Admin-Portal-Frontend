import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { IToy } from '../../types/School';
import { setError, setLoading } from '../../redux/slices/statusSlice';
import axiosInstance from '../../utils/axiosInstance';
import { GET_ALL_TOYS_FROM_STOCK } from '../../utils/restEndPoints';
import { Action } from '../../types/error';
import { toast } from 'react-toastify';
import Loading from '../../Components/Loading/Loading';
import Error from '../../Components/ErrorHandler/Error';
import Card from '../../Components/Card';

const Stock: React.FC = () => {
    const [toys, setToys] = useState<{ toy: IToy, quantity: string }[]>([]);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchToys = async () => {
            try {
                dispatch(setLoading(true));
                const response = await axiosInstance.get(GET_ALL_TOYS_FROM_STOCK);
                console.log(response.data);
                setToys(
                    response.data.toys.map((item: any) => ({ quantity: item.quantity, toy: item.toy }))
                );
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
                <h1>Stocks</h1>
                {toys?.map(item => <Card toy={item.toy} quantity={item.quantity} />)};
            </Error>
        </Loading>
    );
}

export default Stock