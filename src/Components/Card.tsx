import { IToy } from "../types/School";
import { useDispatch, useSelector } from "react-redux";
import { ShowVendorOrder } from "../types/VendorOrder";
import { removeItemToCart, setItemToCart } from "../redux/slices/cartSlice";
import { RootState } from "../redux/store";


interface MyComponentProps {
  toy: IToy
}

const Card: React.FC<MyComponentProps> = ({ toy }) => {
  const vendorCartItems: ShowVendorOrder[] = useSelector((store: RootState) => store.cart.cartItems);
  const { name, price, category, brand, learn, id, level, subBrand, link } = toy;
  const dispatch = useDispatch();


  const addToCart = (toy: IToy) => {
    const isExits = vendorCartItems.find((item) => item.toy.id === toy.id);
    if (!isExits) {
      dispatch(setItemToCart({ toy, quantity: 1 }));
    };
  }
  return (
    <div
      className='single-toy border rounded-md shadow-md sm:max-w-xs w-[80%] p-4 text-sm flex flex-col'
      key={id}
    >
      <h1 className='font-[400] text-2xl text-center mb-3'>{name}</h1>

      <div className='flex flex-col gap-2 p-2'>
        <p className='font-[300] flex justify-between'>
          <span className=''>
            <strong className='text-sm font-semibold'>Price</strong> :{" "}
            {price}
          </span>
          <span className=''>
            <strong className='text-sm font-semibold'>Category</strong> :{" "}
            {category}
          </span>
        </p>

        <p className='font-[300] flex justify-between'>
          <span className=''>
            <strong className='text-sm font-semibold'>Brand</strong> :{" "}
            {brand}
          </span>
          <span className=''>
            <strong className='text-sm font-semibold'>Level</strong> :{" "}
            {level ?? "Not Provided"}
          </span>
        </p>

        <hr />

        <p className='font-[300] flex justify-between'>
          <span className=''>
            {" "}
            <strong className='text-sm font-semibold'>ID</strong> : {id}
          </span>
        </p>
        <p className='font-[300] flex justify-between'>
          <span className='text-ellipsis'>
            <strong className='text-sm font-semibold'>subBrand</strong> :
            {subBrand}
          </span>
        </p>

        <p className='font-[300] flex '>
          <span className=''>
            <strong className='text-sm font-semibold'>Learn</strong> :{" "}
            {learn?.join(" , ")}
          </span>
        </p>

        <p className='font-[300] flex '>
          <span className=''>
            <strong className='text-sm font-semibold'>Link</strong> :
            <a href={link} className='text-blue-400' target='_blank'>
              {" "}
              Video Link
            </a>
          </span>
        </p>
      </div>

      <div className='w-[90%] m-auto flex justify-end pt-2 text-xs'>
        {vendorCartItems?.some((item) => item.toy.id == id) ? (
          <button
            onClick={() => dispatch(removeItemToCart(toy.id ?? ""))}
            className='bg-gray-200 p-2 ml rounded-md w-fit hover:bg-gray-800 hover:text-white'
          >
            Remove From Cart
          </button>
        ) : (
          <button
            onClick={() => addToCart(toy)}
            className='bg-gray-200 p-2 ml rounded-md w-fit hover:bg-gray-800 hover:text-white'
          >
            Add To Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default Card;