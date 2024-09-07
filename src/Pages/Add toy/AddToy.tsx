import { useState } from "react";
import Loading from "../../Components/Loading/Loading";
import Error from "../../Components/ErrorHandler/Error";
import { setError, setLoading } from "../../redux/slices/statusSlice";
import { useDispatch } from "react-redux";
import { ADD_TOY } from "../../utils/restEndPoints";
import { IToy, Level } from "../../types/School";
import axiosInstance from "../../utils/axiosInstance";
import { Action } from "../../types/error";
import { toast } from "react-toastify";
import { IoIosCloseCircleOutline } from "react-icons/io";

const AddToy: React.FC = () => {
  const [arr, setArray] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [toy, setToy] = useState<IToy[]>([]);
  const dispatch = useDispatch();
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setToy((prev) => ({ ...prev, [name]: value }));
  };

  const handleArray = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setArray([...arr, inputValue]);
      setInputValue(""); // Clear input after adding
    }
  };

  // Create new toy
  const createToy = async () => {
    try {
      dispatch(setLoading(true));
      await axiosInstance.post(ADD_TOY, {...toy,learn: arr});
      setArray([]);
      toast.success("Toy added successfully!"); // Show success message
    } catch (error: any) {
      if (error.response) {
        dispatch(
          setError({
            statusCode: error.response.status,
            message: error.response.data.error,
            action: Action.TOY,
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
        <div className='w-full'>
          <div className='mt-10 p-3 border bg-blue-50 shadow-xl rounded-xl max-w-2xl m-auto'>
            <h3 className='text-3xl mb-1 font-[300] ml-3'>Add Toy</h3>
            <div className='p-4 flex flex-col gap-3'>
              <div className='grid grid-cols-2 gap-3'>
                <div className="flex flex-col">
                  <label htmlFor='brand' className='text-sm'>
                    Brand
                  </label>
                  <input
                    type='text'
                    placeholder='Brand....'
                    className='border p-2 outline-none text-sm rounded-md'
                    name='brand'
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor='subBrand' className='text-sm'>
                    SubBrand
                  </label>
                  <input
                    type='text'
                    placeholder='SubBrand....'
                    className='border p-2 outline-none text-sm rounded-md'
                    name='subBrand'
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className='grid grid-cols-2 gap-3'>
                <div className="flex flex-col">
                  <label htmlFor='price' className='text-sm'>
                    Price
                  </label>
                  <input
                    type='text'
                    placeholder='Price....'
                    className='border p-2 outline-none text-sm rounded-md'
                    name='price'
                    onChange={handleChange}
                  />
                </div>

                <div className='flex flex-col gap-1'>
                  <label htmlFor='category' className='text-sm'>Category</label>
                  <input
                    name='category'
                    className='border p-2 outline-none text-sm rounded-md'
                    onChange={handleChange}
                  />
                  
                </div>
              </div>

              <div className='grid grid-cols-2 gap-3'>
                <div className="flex flex-col">
                  <label htmlFor='codeName' className='text-sm'>
                    CodeName
                  </label>
                  <input
                    type='text'
                    placeholder='CodeName....'
                    className='border p-2 outline-none text-sm rounded-md'
                    name='codeName'
                    onChange={handleChange}
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor='cataloguePgNo' className='text-sm'>
                    Catalogue Page No
                  </label>
                  <input
                    type='text'
                    placeholder='Catalogue Pg No....'
                    className='border p-2 outline-none text-sm rounded-md'
                    name='cataloguePgNo'
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className='flex flex-col gap-1'>
                <div className="flex flex-col">
                  <label htmlFor='level' className='text-sm'>Level</label>
                  <select name="level" className="text-xs p-2 rounded-md  outline-none" onChange={handleChange}>
                   {Object.keys(Level).map(level => <option value={level}>{level}</option>)}
                  </select>
                  
                </div>
              </div>

              <div className='grid grid-cols-1  w-full'>
                <label htmlFor='' className='text-sm '>
                  Learn
                </label>
                <div className='flex flex-wrap gap-2'>
                  {arr.map((item, index) => (
                    <div
                      key={index}
                      className='border bg-white p-1 relative rounded-md shadow-sm cursor-pointer'
                      onClick={() => setArray( arr.filter((_, ItemIndex) => ItemIndex !== index))}
                    >
                      <span className='text-xs'>{item}</span>
                      <IoIosCloseCircleOutline className='absolute bottom-6 right-0 text-sm' />
                    </div>
                  ))}
                  <input
                    type='text'
                    placeholder='Press enter to add learn....'
                    className='border p-2 outline-none text-sm rounded-md w-full'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    name='learn'
                    onKeyDown={handleArray}
                  />
               </div>
              </div>

              <div className='grid grid-cols-2 gap-2 items-center'>
                <div className="flex flex-col">
                  <label htmlFor='link' className='text-sm'>
                    Link
                  </label>
                  <input
                    type='url'
                    placeholder='Link...'
                    className='border p-2 outline-none text-sm rounded-md'
                    name='link'
                    onChange={handleChange}
                  />
                </div>
                  <button className='border p-2 bg-green-500 text-white rounded-md mt-5 cursor-pointer text-sm' onClick={createToy}>Add Toy</button>
              </div>
            </div>
          </div>
        </div>
      </Loading>  
    </Error>
  );
};

export default AddToy;
