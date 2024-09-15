import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { IToy } from '../../types/School';
import { setError, setLoading } from '../../redux/slices/statusSlice';
import axiosInstance from '../../utils/axiosInstance';
import { GET_ALL_TOYS_FROM_STOCK } from '../../utils/restEndPoints';
import { toast } from 'react-toastify';
import Loading from '../../Components/Loading/Loading';
import ToyTable from '../../Components/ToyTable';

const Stock: React.FC = () => {
    const [toys, setToys] = useState<{ toy: IToy; quantity: string }[]>([]);


    const dispatch = useDispatch();

    useEffect(() => {
        const fetchToys = async () => {
            try {
                dispatch(setLoading(true));
                const response = await axiosInstance.get(GET_ALL_TOYS_FROM_STOCK);
                // setToys(response.data.toys);
                setToys(response.data.toys.map((item: any) => ({ quantity: item.quantity, toy: item.toy })));

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
                dispatch(setLoading(false));
            }
        }
        fetchToys();
    }, []);
    return (
        <Loading>
            <ToyTable toys={toys.map(toy => ({ toy: toy.toy, quantity: toy.quantity }))} isFrom={"isStock"} />;
        </Loading>
    );
}

export default Stock