import { IToy } from "../types/School";
import { useDispatch, useSelector } from "react-redux";
import { ShowVendorOrder } from "../types/VendorOrder";
import { removeItemToCart, setItemToCart } from "../redux/slices/cartSlice";
import { RootState } from "../redux/store";


interface MyComponentProps {
  toy: IToy
  quantity? : string
}

const Card: React.FC<MyComponentProps> = ({ toy , quantity }) => {
  const vendorCartItems: ShowVendorOrder[] = useSelector((store: RootState) => store.cart.cartItems);
  const { name, price, category, brand, learn, id, level, subBrand, link } = toy;
  console.log(link)
  const dispatch = useDispatch();


  const addToCart = (toy: IToy) => {
    const isExits = vendorCartItems.find((item) => item.toy.id === toy.id);
    if (!isExits) {
      dispatch(setItemToCart({ toy, quantity: 1 }));
    };
  }
  return (
    <div
      className='single-toy border rounded-md shadow-md sm:max-w-[350px]  w-[80%] p-3 text-sm flex flex-col h-[300px]'
      key={id}
    >
      <h1 className='font-[400] text-2xl text-center mb-3'>{name}</h1>

      <div className='flex flex-col gap-3 p-2'>
        <p className='font-[300] flex justify-between items-center'>
          <strong className='text-[16px] font-semibold'>
            Price : <span className='font-[300]'>{price}</span>
          </strong>
          <strong className='text-[16px] font-semibold'>
            Category : <span className='font-[300]'>{category}</span>
          </strong>
        </p>

        <p className='font-[300] flex justify-between items-center'>
          <strong className='text-[16px] font-semibold'>
            Brand : <span className='font-[300]'>{brand}</span>
          </strong>
          <strong className='text-[16px] font-semibold'>
            Level :{" "}
            <span className='font-[300] text-sm'>
              {level ?? "Not Provided"}
            </span>
          </strong>
        </p>

        <hr />

        <p className='font-[300] flex justify-between items-center'>
          <strong className='text-[16px] font-semibold'>
            Learn: <span className='font-[300]'>{learn?.join(" , ")}</span>
          </strong>
        </p>

        <p className='font-[300] flex justify-between items-center'>
          <strong
            className={`text-[16px] font-semibold ${!quantity && "hidden"}`}
          >
            Quantity: <span className='font-[300]'>{quantity}</span>
          </strong>
          <strong className='text-[16px] font-semibold'>
            subBrand : <span className='font-[300]'>{subBrand}</span>
          </strong>
        </p>
        <p className='font-[300] flex justify-between items-center'>
          <strong className='text-[16px] font-semibold'>
            ID: <span className='font-[300]'>{id}</span>
          </strong>
        </p>
      </div>

      <div className='w-[95%] m-auto flex items-center gap-2 justify-between pt-2 text-xs'>
          {(link !== "Not Provided" && link !== null) &&
           <a href={link} className='text-blue-400 border p-2 rounded-md hover:bg-gray-200 font-medium' target='_blank'>
             Video Link
          </a>
          }
          
    

        {vendorCartItems?.some((item) => item.toy.id == id) ? (
          <button
            onClick={() => dispatch(removeItemToCart(toy.id ?? ""))}
            className='bg-gray-200 p-2 ml rounded-md w-fit hover:bg-gray-800 hover:text-white font-medium'
          >
            Remove From Cart
          </button>
        ) : (
          <button
            onClick={() => addToCart(toy)}
            className='bg-gray-200 p-2 ml rounded-md w-fit hover:bg-gray-800 hover:text-white font-medium'
          >
            Add To Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default Card;