import React, { useState } from "react";
import { ISchoolOrder } from "../../types/School";
import { IProduct } from "../../types/School"; 
import axiosInstance from "../../utils/axiosInstance";
import { SCHOOL_ORDER } from "../../utils/restEndPoints";



interface ModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  currentOrder: ISchoolOrder;
}

const Modal: React.FC<ModalProps> = ({ setShowModal, currentOrder }) => {
  const [editRowIndex, setEditRowIndex] = useState<number | null>(null);
  const [editedProducts, setEditedProducts] = useState(
    currentOrder.listOfToysSentLink
  );

  const fetchData = async () => {
    try {
      const id = currentOrder.id; 
      const updateToyDataResponse = await axiosInstance.put(
        `${SCHOOL_ORDER}/${id}`,
        { listOfToysSentLink: editedProducts }
      );
      console.log("Put response:", updateToyDataResponse.data);
    } catch (error: any) {
      if (error.response) {
        console.error("Error:", error.response.data.error);
      } else {
        console.error("Server is Down.");
      }
    }
  };



  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedProducts = [...editedProducts];
    updatedProducts[index] = {
      ...updatedProducts[index],
      toy: {
        ...updatedProducts[index].toy,
        [field]: value,
      },
    };
    setEditedProducts(updatedProducts);
    console.log(editedProducts, "editedProducts")
  };

  const handleSave = () => {
    fetchData();
    setEditRowIndex(null);
  };

  const hideScrollbar = {
    overflow: "scroll",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative h-5/6 w-[98%]">
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
          <div
            id="table"
            className="flex max-h-[280px] overflow-y-auto flex-col w-full border border-black"
          >
            <div
              id="head"
              className="flex items-center border-black border-b bg-[#97b8f9] font-semibold"
            >
              <div className="w-[5%] flex justify-center border-r border-black py-3">
                srNo
              </div>
              <div className="w-[10%] flex justify-center border-r border-black py-3">
                Category
              </div>
              <div className="w-[10%] flex justify-center border-r border-black py-3">
                Brand
              </div>
              <div className="w-[13%] flex justify-center border-r border-black py-3">
                Sub-Brand
              </div>
              <div className="w-[6%] flex justify-center border-r border-black py-3">
                Price
              </div>
              <div className="w-[10%] flex justify-center border-r border-black py-3">
                Name
              </div>
              <div className="w-[10%] flex justify-center border-r border-black py-3">
                Level
              </div>
              <div className="w-[7%] flex justify-center border-r border-black py-3">
                Quantity
              </div>
              <div className="w-[20%] flex justify-center border-r border-black py-3">
                Learn
              </div>
              <div className="w-[7%] flex justify-center border-r border-black py-3">
                Link
              </div>
            </div>

            <div id="body">
              {editedProducts?.map((product, index) => (
                <div
                  key={product.id}
                  id="row"
                  className={`flex w-full items-center ${
                    index % 2 == 0 ? "bg-[#fce99e]" : "bg-[#bef9b9]"
                  }`}
                >
                  <div className="w-[5%] px-1 flex justify-center border-r border-black py-3">
                    {editRowIndex === index ? (
                      <input
                        type="text"
                        className="w-full px-1 outline-none border-black border rounded-lg"
                        placeholder="srNo"
                        value={product.toy.srNo}
                        onChange={(e) =>
                          handleInputChange(index, "srNo", e.target.value)
                        }
                      />
                    ) : (
                      product.toy.srNo
                    )}
                  </div>
                  <div
                    style={hideScrollbar}
                    className="w-[10%] px-1 flex justify-center border-r border-black py-3"
                  >
                    {editRowIndex === index ? (
                      <input
                        type="text"
                        className="w-full px-1 outline-none border-black border rounded-lg"
                        placeholder="Category"
                        value={product.toy.category}
                        onChange={(e) =>
                          handleInputChange(index, "category", e.target.value)
                        }
                      />
                    ) : (
                      product.toy.category
                    )}
                  </div>
                  <div
                    style={hideScrollbar}
                    className="w-[10%] px-1 flex justify-center border-r border-black py-3"
                  >
                    {editRowIndex === index ? (
                      <input
                        type="text"
                        className="w-full px-1 outline-none border-black border rounded-lg"
                        placeholder="Brand"
                        value={product.toy.brand}
                        onChange={(e) =>
                          handleInputChange(index, "brand", e.target.value)
                        }
                      />
                    ) : (
                      product.toy.brand
                    )}
                  </div>
                  <div
                    style={{
                      overflowX: "scroll",
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                    className="w-[13%] px-1 flex justify-center border-r border-black py-3"
                  >
                    {editRowIndex === index ? (
                      <input
                        type="text"
                        className="w-full px-1 outline-none border-black border rounded-lg"
                        placeholder="Sub-Brand"
                        value={product.toy.subBrand}
                        onChange={(e) =>
                          handleInputChange(index, "subBrand", e.target.value)
                        }
                      />
                    ) : (
                      product.toy.subBrand
                    )}
                  </div>
                  <div
                    style={hideScrollbar}
                    className="w-[6%] px-1 flex justify-center border-r border-black py-3"
                  >
                    {editRowIndex === index ? (
                      <input
                        type="text"
                        className="w-full px-1 outline-none border-black border rounded-lg"
                        placeholder="Price"
                        value={product.toy.price}
                        onChange={(e) =>
                          handleInputChange(index, "price", e.target.value)
                        }
                      />
                    ) : (
                      product.toy.price
                    )}
                  </div>
                  <div
                    style={hideScrollbar}
                    className="w-[10%] px-1 flex justify-center border-r border-black py-3"
                  >
                    {editRowIndex === index ? (
                      <input
                        type="text"
                        className="w-full px-1 outline-none border-black border rounded-lg"
                        placeholder="Name"
                        value={product.toy.name}
                        onChange={(e) =>
                          handleInputChange(index, "name", e.target.value)
                        }
                      />
                    ) : (
                      product.toy.name
                    )}
                  </div>
                  <div
                    style={hideScrollbar}
                    className="w-[10%] px-1 flex justify-center border-r border-black py-3"
                  >
                    {editRowIndex === index ? (
                      <input
                        type="text"
                        className="w-full px-1 outline-none border-black border rounded-lg"
                        placeholder="Level"
                        value={product.toy.level}
                        onChange={(e) =>
                          handleInputChange(index, "level", e.target.value)
                        }
                      />
                    ) : (
                      product.toy.level
                    )}
                  </div>
                  <div className="w-[7%] px-1 flex justify-center border-r border-black py-3">
                    {editRowIndex === index ? (
                      <input
                        type="number"
                        className="w-full px-1 outline-none border-black border rounded-lg"
                        placeholder="Quantity"
                        value={product.quantity}
                        onChange={(e) =>
                          handleInputChange(index, "quantity", e.target.value)
                        }
                      />
                    ) : (
                      product.quantity
                    )}
                  </div>
                  <div
                    style={hideScrollbar}
                    className="w-[20%] px-1 flex justify-center border-r border-black py-3"
                  >
                    {editRowIndex === index ? (
                      <input
                        type="text"
                        className="w-full px-1 outline-none border-black border rounded-lg"
                        placeholder="Learn"
                        value={product.toy.learn.join(", ")}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "learn",
                            e.target.value.split(", ").join(", ")
                          )
                        }
                      />
                    ) : (
                      product.toy.learn?.map((learn, learnIndex) => (
                        <span key={learnIndex}>
                          {learn}
                          {learnIndex < product.toy.learn.length - 1
                            ? ", "
                            : ""}
                        </span>
                      ))
                    )}
                  </div>
                  <div className="w-[7%] px-1 flex justify-center border-r border-black py-3">
                    {editRowIndex === index ? (
                      <input
                        type="text"
                        className="w-full px-1 outline-none border-black border rounded-lg"
                        placeholder="Link"
                        value={product.link}
                        onChange={(e) =>
                          handleInputChange(index, "link", e.target.value)
                        }
                      />
                    ) : (
                      <a href={product.link}>Youtube</a>
                    )}
                  </div>
                  <div className="w-[2%] px-1 flex justify-center">
                    {editRowIndex === index ? (
                      <button onClick={handleSave}>💾</button>
                    ) : (
                      <button onClick={() => setEditRowIndex(index)}>✏️</button>
                    )}
                  </div>
                </div>
              ))}
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
          onClick={() => setShowModal(false)}
        >
          <span className="material-icons text-2xl">❌</span>
        </button>
      </div>
    </div>
  );
};

export default Modal;
