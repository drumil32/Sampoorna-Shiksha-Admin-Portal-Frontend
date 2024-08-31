import React from "react";
import { ISchoolOrder } from "../../types/School";


interface ModalProps {
  setShowModal:React.Dispatch<React.SetStateAction<boolean>> ;
  currentOrder : ISchoolOrder;
  product : IProduct;
}

const Modal: React.FC<ModalProps> = ({ setShowModal, currentOrder }) => {
  console.log(currentOrder, "currentOrder");

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
      <div className="bg-white p-6 rounded-lg shadow-lg relative h-5/6 w-5/6">
        <div className="flex flex-col justify-between h-full items-center py-10 px-5">
          <div className="flex justify-between w-full">
            
            <span className="flex flex-col bg-[#f3f3f3] rounded-lg py-2 px-4">
              <span>Date of Dispatch :</span>
              <span>{currentOrder.dateOfDispatch}</span>
            </span>
            <span className="flex flex-col bg-[#f3f3f3] rounded-lg py-2 px-4">
              <span>Mode of Dispatch :</span>
              <span>{currentOrder.modeOfDispatch}</span>
            </span>
            
          </div>

{/* table */}
          <div id="table" className="flex max-h-[280px] overflow-y-auto flex-col w-full border border-black">
            <div id="head" className="flex items-center border-black border-b bg-[#97b8f9] font-semibold">
              <div className="w-[5%] flex justify-center border-r border-black py-3">srNo</div>
              <div className="w-[10%] flex justify-center border-r border-black py-3">Category</div>
              <div className="w-[10%] flex justify-center border-r border-black py-3">Brand</div>
              <div className="w-[15%] flex justify-center border-r border-black py-3">Sub-Brand</div>
              <div className="w-[11%] flex justify-center border-r border-black py-3">Name</div>
              <div className="w-[10%] flex justify-center border-r border-black py-3">Level</div>
              <div className="w-[7%] flex justify-center border-r border-black py-3">Quantity</div>
              <div className="w-[20%] flex justify-center border-r border-black py-3">Learn</div>
              <div className="w-[10%] flex justify-center border-r border-black py-3">Link</div>

            </div>
            <div id="body">
              {currentOrder?.listOfToysSentLink?.map((product, index) => 
              <div key={product.id} id="row" className={`flex w-full items-center ${index % 2==0 ? 'bg-[#fce99e]' : 'bg-[#bef9b9]'}`}>
                <div className="w-[5%]  flex justify-center border-r border-black py-3">{product.toy.srNo}</div>
                <div className="w-[10%]  flex justify-center border-r border-black py-3">{product.toy.category}</div>
                <div className="w-[10%]  flex justify-center border-r border-black py-3">{product.toy.brand}</div>
                <div className="w-[15%]  flex justify-center border-r border-black py-3">{product.toy.subBrand}</div>
                <div className="w-[11%]  flex justify-center border-r border-black py-3">{product.toy.name}</div>
                <div className="w-[10%]  flex justify-center border-r border-black py-3">{product.toy.level}</div>
                <div className="w-[7%]  flex justify-center border-r border-black py-3">{product.quantity}</div>
                <div className="w-[20%]  flex justify-center border-r border-black py-3">
                    {product.toy?.learn?.map((learn, learnIndex) => (
                      <span key={learnIndex}>
                        {learn}
                        {learnIndex < product.toy.learn.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </div>
                <div className="w-[10%] flex justify-center border-r border-black py-3"><a href={product.link}>Youtube</a></div> 
                <div className="w-[2%] flex justify-center "><button>✏️</button></div>
              </div>)}
            </div>
          </div>

          <div className="flex justify-between w-full">
            
            <span className="flex flex-col bg-[#f3f3f3] rounded-lg py-2 px-4">
              <span>Tracking Details :</span>
              <span>{currentOrder.trackingDetails}</span>
            </span>
            <span className="flex flex-col bg-[#f3f3f3] rounded-lg py-2 px-4">
              <span>Date of Delivery :</span>
              <span>{currentOrder.dateOfDelivery}</span>
            </span>
          </div>
        </div>

        {/* button */}
        <button
          className="text-gray-600 hover:text-gray-800 absolute top-4 right-5"
          onClick={() => {
            setShowModal(false);
          }}
        >
          ❌
        </button>
      </div>
    </div>
  );
};

export default Modal;
