import React from "react";

interface ModalProps {
  setShowModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ setShowModal, currentOrder }) => {
  console.log(currentOrder, "currentOrder");
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
      <div className="bg-white p-6 rounded-lg shadow-lg relative h-3/4 w-5/6">
        <div className="flex flex-col justify-between h-full items-center py-10 px-5">
          <div className="flex justify-between w-full">
            <span className="flex flex-col bg-[#f3f3f3] rounded-lg py-2 px-4">
              <span>Order Created At :</span>
              <span>{currentOrder.createdAtIST}</span>
            </span>
            <span className="flex flex-col bg-[#f3f3f3] rounded-lg py-2 px-4">
              <span>Date of Delivery :</span>
              <span>{currentOrder.dateOfDelivery}</span>
            </span>
            <span className="flex flex-col bg-[#f3f3f3] rounded-lg py-2 px-4">
              <span>Date of Dispatch :</span>
              <span>{currentOrder.dateOfDispatch}</span>
            </span>
          </div>

{/* table */}
          <div id="table" className="flex max-h-[280px] overflow-y-auto flex-col w-full border border-black">
            <div id="head" className="flex h-[45px] items-center border-black border-b bg-[#97b8f9] font-semibold">
              <div className="w-[5%]">srNo</div>
              <div className="w-[10%]">Category</div>
              <div className="w-[10%]">Brand</div>
              <div className="w-[15%]">Sub-Brand</div>
              <div className="w-[11%]">Name</div>
              <div className="w-[10%]">Link</div>
              <div className="w-[10%]">Level</div>
              <div className="w-[7%]">Quantity</div>
              <div className="w-[20%]">Learn width double</div>

            </div>
            <div id="body">
              {currentOrder.listOfToysSentLink.map((toy, index) => 
              <div key={toy.id} id="row" className={`flex w-full items-center ${index % 2==0 ? 'bg-[#fce99e]' : 'bg-[#bef9b9]'}`}>
                <div className="w-[5%]">{toy.toy.srNo}</div>
                <div className="w-[10%]">{toy.toy.category}</div>
                <div className="w-[10%]">{toy.toy.brand}</div>
                <div className="w-[15%]">{toy.toy.subBrand}</div>
                <div className="w-[11%]">{toy.toy.name}</div>
                <div className="w-[10%]"><a href={toy.toy.link}>Link</a></div>
                <div className="w-[10%]">Level</div>
                <div className="w-[7%]">{toy.quantity}</div>
                <div className="w-[20%]">{toy.toy.learn.map(learn => <span>{learn}{", "}</span>)}</div>
              </div>)}
            </div>
          </div>

          <div className="flex justify-between w-full">
            <span className="flex flex-col bg-[#f3f3f3] rounded-lg py-2 px-4">
              <span>Mode of Dispatch :</span>
              <span>{currentOrder.modeOfDispatch}</span>
            </span>
            <span className="flex flex-col bg-[#f3f3f3] rounded-lg py-2 px-4">
              <span>Tracking Details :</span>
              <span>{currentOrder.trackingDetails}</span>
            </span>
            <span className="flex flex-col bg-[#f3f3f3] rounded-lg py-2 px-4">
              <span>Updated At :</span>
              <span>{currentOrder.updatedAtIST}</span>
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
