import { IToy, Level } from "../types/School";
import { useDispatch, useSelector } from "react-redux";
import { ShowVendorOrder } from "../types/VendorOrder";
import { removeItemToCart, setItemToCart } from "../redux/slices/cartSlice";
import { RootState } from "../redux/store";
import { useState } from "react";


interface MyComponentProps {
  toys: { toy: IToy, quantity?: string }[];
}

const ToyTable: React.FC<MyComponentProps> = ({ toys }) => {
  console.log("indside stock", toys)
  const [selectedToy, setSelectedToy] = useState<{ toy: IToy, quantity?: string } | null>(null);
  const [showModel, setShowModel] = useState<boolean>(false);
  const vendorCartItems: ShowVendorOrder[] = useSelector((store: RootState) => store.cart.cartItems);
  const [inputValue, setInputValue] = useState<string>("");
  const [levelValue, setLevelValue] = useState<string>("all");

  // use location hook

  const dispatch = useDispatch();

  const addToCart = (toy: IToy | undefined) => {
    if (toy) {
      const isExits = vendorCartItems.find((item) => item.toy.id === toy.id);
      if (!isExits) {
        dispatch(setItemToCart({ toy, quantity: 1 }));
      }
    }
  };


  const showToyDetails = (toy: IToy, quantity?: string) => {
    setSelectedToy({ toy, quantity });
    setShowModel(true);
  };

  const filteredToys = toys?.filter((item) => {
    console.log(item.toy);
    const matchesInput =
      item.toy.brand?.toLowerCase().includes(inputValue.toLowerCase()) ||
      item.toy.name?.toLowerCase().includes(inputValue.toLowerCase()) ||
      item.toy.subBrand?.toLowerCase().includes(inputValue.toLowerCase());

    const matchesLevel = levelValue.toLowerCase() === "all" || item.toy.level?.toLowerCase() === levelValue.toLowerCase();
    return matchesInput && matchesLevel;
  });

  return (
    <>
      <div className='filters w-[90%] m-auto mt-4 border p-2 flex gap-2 items-center rounded-md'>
        <input
          type='text'
          className=' p-2 text-sm w-full outline-none'
          placeholder='Brand or SubBrand'
          onChange={(e) => setInputValue(e.target.value)}
        />
        <span>Level</span>
        <select
          name='level'
          onChange={(e) => setLevelValue(e.target.value)}
          id=''
          className='border p-2 text-sm'
        >
          {Object.keys(Level).map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>
      <div className='w-[90%] m-auto flex flex-wrap gap-5 mt-5 pb-10'>
        <table className='p-4 w-full text-sm'>
          <thead>
            <tr className='border p-3 font-[400]'>
              <th className='p-3 font-[600] border'>Toy Id</th>
              <th className='p-3 font-[600] border'>Name</th>
              <th className='p-3 font-[600] border'>Brand</th>
              <th className='p-3 font-[600] border'>subBrand</th>
              <th className='p-3 font-[600] border'>Price</th>
              <th className='p-3 font-[600] border'>Level</th>
              <th className='p-3 font-[600] border'>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {filteredToys?.map((item) => (
              <tr
                key={item.toy.id}
                className={`border text-center text-xs hover:bg-gray-200 cursor-pointer`}
                onClick={() => showToyDetails(item.toy, item.quantity)}
              >
                <td className='border p-2'>{item.toy.id}</td>
                <td className='border p-2'>{item.toy.name}</td>
                <td className='border p-2'>{item.toy.brand}</td>
                <td className='border p-2'>{item.toy.subBrand}</td>
                <td className='border p-2'>{item.toy.price}</td>
                <td className='border p-2'>{item.toy.level ? item.toy.level : "Not Provided"}</td>
                <td className='border p-2'>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* model  */}
      <div className={`fixed bg-[rgba(0,0,0,0.6)]  z-10   inset-0 p-3 flex items-center justify-center gap-2 ${showModel ? "bock" : "hidden"}`}
      >
        <div className='max-w-5xl h-auto border rounded-md relative'>
          <div className="absolute right-2 top-2 border p-1 cursor-pointer rounded-md text-xs" onClick={() => setShowModel(false)}>Close</div>
          <div
            className='single-toy border rounded-md shadow-md sm:w-[500px] p-8 bg-white  h-auto'
            key={selectedToy?.toy?.id}
          >
            <h1 className='font-[400] text-2xl text-center mb-3'>
              {selectedToy?.toy?.name}
            </h1>

            <div className='flex flex-col gap-2 p-2'>
              <p className='font-[300] flex justify-between items-center'>
                <strong className='text-[16px] font-semibold'>
                  Price :{" "}
                  <span className='font-[300]'>{selectedToy?.toy?.price}</span>
                </strong>
                <strong className='text-[16px] font-semibold'>
                  Category :{" "}
                  <span className='font-[300]'>{selectedToy?.toy?.category}</span>
                </strong>
              </p>

              <p className='font-[300] flex justify-between items-center'>
                <strong className='text-[16px] font-semibold'>
                  Brand :{" "}
                  <span className='font-[300]'>{selectedToy?.toy?.brand}</span>
                </strong>
                <strong className='text-[16px] font-semibold'>
                  Level :{" "}
                  <span className='font-[300] text-sm'>
                    {selectedToy?.toy?.level ?? "Not Provided"}
                  </span>
                </strong>
              </p>

              <hr />

              <p className='font-[300] flex justify-between items-center'>
                <strong className='text-[16px] font-semibold'>
                  Learn : {' '}
                  <span className='font-[300]'>
                    {selectedToy?.toy?.learn?.length != 0 ? selectedToy?.toy?.learn?.join(" , ") : "Not Provided"}
                  </span>
                </strong>
              </p>

              <p className='font-[300] flex justify-between items-center'>
                <strong
                  className={`text-[16px] font-semibold ${!selectedToy?.quantity && "hidden"
                    }`}
                >
                  Quantity :{" "}
                  <span className='font-[300]'>{selectedToy?.quantity}</span>
                </strong>
                <strong className='text-[16px] font-semibold'>
                  subBrand :{" "}
                  <span className='font-[300]'>{selectedToy?.toy?.subBrand}</span>
                </strong>
              </p>

              <p className='font-[300] flex justify-between items-center'>
                <strong className='text-[16px] font-semibold'>
                  ID: <span className='font-[300]'>{selectedToy?.toy?.id}</span>
                </strong>
              </p>
            </div>
            <div className='w-[95%] m-auto flex items-center gap-2 justify-between pt-2 text-xs'>
              {(selectedToy?.toy?.link !== "Not Provided" && selectedToy?.toy?.link !== null) &&
                <a href={selectedToy?.toy?.link} className='text-blue-400 border p-2 rounded-md hover:bg-gray-200 font-medium' target='_blank'>
                  Video Link
                </a>
              }
              {vendorCartItems?.some((item) => item.toy.id == selectedToy?.toy?.id) ? (
                <button
                  onClick={() => dispatch(removeItemToCart(selectedToy?.toy?.id ?? ""))}
                  className='bg-gray-200 p-2 ml rounded-md w-fit hover:bg-gray-800 hover:text-white font-medium'
                >
                  Remove From Cart
                </button>
              ) : (
                <button
                  onClick={() => addToCart(selectedToy?.toy ?? undefined)}
                  className='bg-gray-200 p-2 ml rounded-md w-fit hover:bg-gray-800 hover:text-white font-medium'
                >
                  Add To Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default ToyTable;