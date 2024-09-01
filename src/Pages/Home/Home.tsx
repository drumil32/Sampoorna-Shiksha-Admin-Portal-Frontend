import { useEffect, useState } from "react";
import { setError, setLoading } from "../../redux/slices/statusSlice";
import axiosInstance from "../../utils/axiosInstance";
import { TOYS, VENDOR_ORDER } from "../../utils/restEndPoints";
import { IToy } from "../../types/School";
import { Action } from "../../types/error";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../../Components/Loading/Loading";
import Error from "../../Components/ErrorHandler/Error";
import { setItemToCart } from "../../redux/slices/cartSlice";
import { RootState } from "../../redux/store";

const Home: React.FC = () => {
    const [toys, setToys] = useState<IToy[]>([]);
    
    const cartItems = useSelector((store :RootState ) => store.cart.cartItems);


    const dispatch = useDispatch();
    useEffect(() => {
        console.log('inside useEffect')
        const fetchData = async () => {
            try {
                dispatch(setLoading(true));
                const response = await axiosInstance.get(TOYS);
                console.log(response.data)
                setToys(response.data.toys);
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

    const addToCart = (toy) => {
        const isExits = cartItems.find((item) => item.id === toy.id);
        if(!isExits) {
          dispatch(setItemToCart({...toy , qty : 1}));
        };
    }
    return (
        <Loading>
            <Error>
               <div className="gap-5  mt-3 flex sm:flex-row flex-col m-auto items-center justify-center sm:max-w-6xl">
               {toys?.map(toy => {
                 const {name , price , category , brand , learn , srNo, id , level} = toy;
                 return (
                   <div
                     className='single-toy border rounded-md shadow-md sm:max-w-xs w-[80%] p-4 text-sm flex flex-col'
                     key={id}
                   >
                     <h1 className='font-[400] text-2xl text-center'>{name}</h1>

                     <div className='flex flex-col mt-4 '>
                       <p className='font-[300] flex justify-around'>
                         <span className=''>
                           <strong>Price</strong> : {price}
                         </span>
                         <span className=''>
                           <strong>Category</strong> : {category}
                         </span>
                       </p>

                       <p className='font-[300] flex justify-around'>
                         <span className=''>
                           <strong>Brand</strong> : {brand}
                         </span>
                         <span className='text-ellipsis'>
                           <strong>Learn</strong> :{learn[0]}
                         </span>
                       </p>

                       <p className='font-[300] flex justify-around'>
                         <span className=''>
                           <strong>Serial Number</strong> : {srNo}
                         </span>
                         <span className=''>
                           <strong>Level</strong> : {level}
                         </span>
                       </p>
                     </div>

                     <div className='w-[90%] m-auto flex justify-end pt-2 text-xs'>
                       {cartItems?.some((item) => item.id == id) ? (
                         <button className='bg-gray-200 p-2 ml rounded-md w-fit hover:bg-gray-800 hover:text-white'>
                           Added
                         </button>
                       ) : (
                         <button
                           onClick={() => addToCart(toy)}
                           className='bg-gray-200 p-2 ml rounded-md w-fit hover:bg-gray-800 hover:text-white'
                         >
                           Add To cart
                         </button>
                       )}
                     </div>
                   </div>
                 );
               })}
                </div>
            </Error>
        </Loading>
    )
}

export default Home;