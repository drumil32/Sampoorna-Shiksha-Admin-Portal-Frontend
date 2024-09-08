import { useState } from "react";
import Loading from "../../Components/Loading/Loading";
import Error from "../../Components/ErrorHandler/Error";
import { setError, setLoading } from "../../redux/slices/statusSlice";
import { useDispatch } from "react-redux";
import { ADD_TOY, UPDATE_TOY_BY_ID } from "../../utils/restEndPoints";
import { IToy, Level } from "../../types/School";
import axiosInstance from "../../utils/axiosInstance";
import { Action } from "../../types/error";
import { toast } from "react-toastify";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface MyComponentProps {
  title: string;
  toyData: IToy;
}

const AddToy: React.FC<MyComponentProps> = ({ title, toyData }) => {

  const [inputValue, setInputValue] = useState<string>("");
  const [toy, setToy] = useState<IToy | null>(toyData ? toyData : null);

  const dispatch = useDispatch();

  console.log(title)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // setToy((prev) => prev ? ({ ...prev, [name]: value }) : prev);
    setToy((prev) => {
      if (!prev) {
        return ({ [name]: value });
      } else {
        return ({ ...prev, [name]: value });
      }
    })
  };

  const handleArray = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setToy(prev => prev ? ({ ...prev, learn: [...prev.learn, inputValue] }) : prev);

      setInputValue(""); // Clear input after adding
    }
  };


  const createToy = async () => {
    try {
      dispatch(setLoading(true));
      await axiosInstance.post(ADD_TOY, { toy });
      toast.success("Toy added successfully!");
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

  const removeLearnTopic = (givenIndex: number) => {
    setToy(prev => {
      if (!prev) return prev;
      const learn = prev.learn.filter((_, index) => index != givenIndex)
      return {
        ...prev,
        learn: [...learn]
      };
    })
  }

  //  update toy by id
  const updateToy = async () => {
    try {
      dispatch(setLoading(true));
      await axiosInstance.put(`${UPDATE_TOY_BY_ID}`, { toy: { ...toy } });
      toast.success("Toy updated successfully!");
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
          <div
            className={`${title === "Add Toy" ? "mt-10" : "mt-3"
              } p-3 border bg-blue-50 shadow-xl rounded-xl max-w-2xl m-auto`}
          >
            <h3 className='text-3xl mb-1 font-[300] ml-3'>{title}</h3>
            <div className='p-4 flex flex-col gap-3'>
              {/* Input fields */}
              <div className='grid grid-cols-2 gap-3'>
                <div className='flex flex-col'>
                  <label htmlFor='brand' className='text-sm'>
                    Brand
                  </label>
                  <input
                    type='text'
                    placeholder='Brand....'
                    className='border p-2 outline-none text-sm rounded-md'
                    name='brand'
                    onChange={handleChange}
                    value={toy?.brand || ""}
                  />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor='subBrand' className='text-sm'>
                    SubBrand
                  </label>
                  <input
                    type='text'
                    placeholder='SubBrand....'
                    className='border p-2 outline-none text-sm rounded-md'
                    name='subBrand'
                    onChange={handleChange}
                    value={toy?.subBrand || ""}
                  />
                </div>
              </div>
              <div className='grid grid-cols-2 gap-3'>
                <div className='flex flex-col'>
                  <label htmlFor='price' className='text-sm'>
                    Price
                  </label>
                  <input
                    type='number'
                    placeholder='Price....'
                    className='border p-2 outline-none text-sm rounded-md'
                    name='price'
                    onChange={handleChange}
                    value={toy?.price || 0}
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor='category' className='text-sm'>
                    Category
                  </label>
                  <input
                    type="text"
                    name='category'
                    className='border p-2 outline-none text-sm rounded-md'
                    onChange={handleChange}
                    value={toy?.category || ""}
                  />
                </div>
              </div>
              <div className='grid grid-cols-2 gap-3'>
                <div className='flex flex-col'>
                  <label htmlFor='codeName' className='text-sm'>
                    CodeName
                  </label>
                  <input
                    type='text'
                    placeholder='CodeName....'
                    className='border p-2 outline-none text-sm rounded-md'
                    name='codeName'
                    onChange={handleChange}
                    value={toy?.codeName || ""}
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
                    value={toy?.cataloguePgNo || ""}
                  />
                </div>
              </div>
              <div className='flex flex-col gap-1'>
                <div className='flex flex-col'>
                  <label htmlFor='level' className='text-sm'>
                    Level
                  </label>
                  <select
                    name='level'
                    className='text-xs p-2 rounded-md outline-none'
                    onChange={handleChange}
                    value={toy?.level || ""}
                  >
                    {Object.keys(Level).map((level) => (
                      <option value={level} key={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className='grid grid-cols-1 w-full'>
                <label htmlFor='' className='text-sm'>
                  Learn
                </label>
                <div className='flex flex-wrap gap-2'>
                  {toy?.learn?.map((item, index) => (
                    <div
                      key={index}
                      className='border bg-white p-1 relative rounded-md shadow-sm cursor-pointer'
                      onClick={() => removeLearnTopic(index)}
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
                <div className='flex flex-col'>
                  <label htmlFor='link' className='text-sm'>
                    Link
                  </label>
                  <input
                    type='url'
                    placeholder='Link...'
                    className='border p-2 outline-none text-sm rounded-md'
                    name='link'
                    onChange={handleChange}
                    value={toy?.link || ""}
                  />
                </div>
                <button
                  className='border p-2 bg-green-500 text-white rounded-md mt-5 cursor-pointer text-sm'
                  onClick={title === "Add Toy" ? createToy : updateToy}
                >
                  {title.split(" ")[0]}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Loading>
    </Error >
  );
};

export default AddToy;
