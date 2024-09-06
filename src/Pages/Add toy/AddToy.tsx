
import { useEffect, useState } from "react";
import Loading from "../../Components/Loading/Loading";
import Error from "../../Components/ErrorHandler/Error";
import { setError, setLoading } from "../../redux/slices/statusSlice";
import { useDispatch } from "react-redux";
import { ADD_TOY } from "../../utils/restEndPoints";
import { IToy } from "../../types/School";
import axiosInstance from "../../utils/axiosInstance";
import { Action } from "../../types/error";
import { toast } from "react-toastify";

const AddToy : React.FC = () =>{
    // const {toy , setToy} = useState<IToy>();

    const handleChange = (e) => {
        // const {name ,value} = e.target;
        // if(){

        // }else{
          
        //   setToy({...toy, [name] : value})

        // }
    }



    const dispatch = useDispatch();
      console.log("inside useEffect");

    //   create new toy
         
      const createToy = async () => {
        try {
          dispatch(setLoading(true));
          const response = await axiosInstance.post(ADD_TOY , {toy});
          console.log(response.data);
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
      };


    return (
      <Error>
        <Loading>
          <div className='gap-5  flex sm:flex-row flex-col m-auto items-center justify-center max-w-6xl '>
            <div className='form-container w-[50%] mt-10 p-3 border bg-blue-50 shadow-xl rounded-xl'>
              <h3 className='text-3xl mb-1 font-[300] ml-3'>Add Toy</h3>
              <form
                className='p-4 grid grid-cols-2 gap-3 items-center'
                onSubmit={createToy}
              >

                <div className='flex flex-col gap-1'>
                  <label htmlFor='' className='text-sm'>
                    Brand
                  </label>
                  <input
                    type='text'
                    placeholder='Brand....'
                    className='border p-2 outline-none text-sm rounded-md'
                    required
                    name='brand'
                    onChange={handleChange}
                  />
                </div>

                <div className='flex flex-col gap-1'>
                  <label htmlFor='' className='text-sm'>
                    SubBrand
                  </label>
                  <input
                    type='text'
                    placeholder='SubBrand....'
                    className='border p-2 outline-none text-sm rounded-md'
                    required
                    name='subBrand'
                    onChange={handleChange}
                  />
                </div>

                <div className='flex flex-col gap-1'>
                  <label htmlFor='' className='text-sm'>
                    Price
                  </label>
                  <input
                    type='text'
                    placeholder='Price....'
                    className='border p-2 outline-none text-sm rounded-md'
                    required
                    name='price'
                    onChange={handleChange}
                  />
                </div>

                <div className='flex flex-col gap-1'>
                  <label htmlFor='' className='text-sm'>
                    Category
                  </label>
                  <select
                    name='category'
                    id=''
                    required
                    className='border p-2 outline-none text-sm rounded-md'
                    onChange={handleChange}
                  >
                    <option value='ngo'>NGO</option>
                    <option value='school'>SCHOOL</option>
                  </select>
                </div>

                <div className='flex flex-col gap-1'>
                  <label htmlFor='' className='text-sm'>
                    CodeName
                  </label>
                  <input
                    type='text'
                    placeholder='CodeName....'
                    className='border p-2 outline-none text-sm rounded-md'
                    required
                    name='codeName'
                    onChange={handleChange}
                  />
                </div>

                <div className='flex flex-col gap-1'>
                  <label htmlFor='' className='text-sm'>
                    cataloguePgNo
                  </label>
                  <input
                    type='text'
                    placeholder='cataloguePgNo....'
                    className='border p-2 outline-none text-sm rounded-md'
                    required
                    name='cataloguePgNo'
                    onChange={handleChange}
                  />
                </div>

                <div className='flex flex-col gap-1'>
                  <label htmlFor='' className='text-sm'>
                    Level
                  </label>
                  <input
                    type='text'
                    placeholder='Level....'
                    className='border p-2 outline-none text-sm rounded-md'
                    required
                    name='level'
                    onChange={handleChange}
                  />
                </div>

                <div className='flex flex-col gap-1'>
                  <label htmlFor='' className='text-sm'>
                    Learn
                  </label>
                  <input
                    type='text'
                    placeholder='Learn....'
                    className='border p-2 outline-none text-sm rounded-md'
                    required
                    name='learn'
                    onChange={handleChange}
                  />
                </div>

                <div className='flex flex-col gap-1'>
                  <label htmlFor='' className='text-sm'>
                    Link
                  </label>
                  <input
                    type='url'
                    placeholder='Link...'
                    className='border p-2 outline-none text-sm rounded-md'
                    required
                    name='link'
                    onChange={handleChange}
                  />
                </div>

                <button
                  className='border p-2 bg-green-500 text-white rounded-md mt-3 cursor-pointer'
                  type='submit'
                >
                  Add Toy
                </button>
              </form>
            </div>
          </div>
        </Loading>
      </Error>
    );
}


export default AddToy;