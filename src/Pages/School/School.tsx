import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { SCHOOL } from "../../utils/restEndPoints";
import { useDispatch } from "react-redux";
import { setError } from "../../redux/slices/statusSlice";
import { Action } from "../../types/error";
import Error from "../../Components/ErrorHandler/Error";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGenericSortingDesc } from "react-icons/fc";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { style } from "../../Constants/ellipsisStyle";
// import { school } from "../../Constants/schoolData";

const School: React.FC = () => {
  const dispatch = useDispatch();
  const [isSortButtonClicked, setIsSortButtonClicked] = useState<boolean>(false);
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [schoolsPerPage] = useState<number>(9); // Items per page
  const [schoolList, setSchoolList] = useState([]);


  const fetchData = async (search = "", sortAsc = isAscending) => {
    try {
      const response = await axiosInstance.get(
        `${SCHOOL}?code=${search}&nameOfSchoolInstitution=${search}&sortByAsc=${sortAsc}`
      );
      console.log("API Response:", response.data.schools); // Inspect the response data
      if (Array.isArray(response.data.schools)) {
        setSchoolList(response.data.schools);
      } else {
        console.error("Expected an array but got:", typeof response.data);
        setSchoolList([]);
      }
    } catch (error: any) {
      console.log(error.response.data.error);
      console.log(error.response.status);
      if (error.response) {
        dispatch(
          setError({
            statusCode: error.response.status,
            message: error.response.data.error,
            action: Action.SCHOOL,
          })
        );
      } else {
        alert("Server is Down");
        toast.error("Server is Down");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [isAscending]);

  const handleSubmitSearch = () => {
    // if (searchTerm.trim() === "") {
    //   toast.error("Please Enter Search Term");
    //   return;
    // }
    fetchData(searchTerm);
    setSearchTerm("");
    toast.success("Data Fetched Successfully");
  };

  // Pagination logic
  const indexOfLastSchool = currentPage * schoolsPerPage;
  const indexOfFirstSchool = indexOfLastSchool - schoolsPerPage;
  const currentSchools = schoolList.slice(indexOfFirstSchool, indexOfLastSchool);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(schoolList.length / schoolsPerPage);

  return (
    <Error>
      <ToastContainer position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored" />
      <div className="w-full flex flex-col items-center p-8 bg-[#f5f5f5]">
        <div id="table" className="w-full p-5 shadow-lg rounded-2xl bg-white overflow-hidden 2xl:text-2xl min-h-[90vh]">
          <div id="" className="mb-5 bg-[#e8e6e6] rounded-lg flex gap-5 items-center justify-between py-2 px-5 w-full">
            <div id="searchBox" className="border-black border overflow-hidden rounded-lg flex items-center bg-white">
              <input
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                name="search"
                type="text"
                placeholder="School Name or Code"
                className="w-[250px] px-2 py-1 outline-none font-normal"
              />
              <button
                onClick={handleSubmitSearch}
                type="submit"
                className="h-[33px] text-xl bg-blue-500 text-white font-semibold px-4"
              >
                Search
              </button>
            </div>
            <div id="sort" className="relative cursor-pointer">
              <div
                className="flex items-center bg-white hover:bg-[#bbbec5] duration-500 rounded-lg px-2 py-1"
                onClick={() => setIsSortButtonClicked(!isSortButtonClicked)}
              >
                <FcGenericSortingDesc className="text-lg cursor-pointer" />
                Sort
              </div>
              {isSortButtonClicked && (
                <div className="absolute shadow-xl -bottom-25 right-0 flex flex-col rounded-lg overflow-hidden w-[240px] bg-white py-2">
                  <div 
                    onClick={() => {setIsAscending(false); setIsSortButtonClicked(false); fetchData(searchTerm, false); toast.success("Normal Order")}}
                    className="hover:cursor-pointer hover:bg-[#e6e7e9] duration-500 px-5 py-2 border-b border-black">
                    Normal
                  </div>
                  <div 
                    onClick={() => {setIsAscending(true); setIsSortButtonClicked(false); fetchData(searchTerm, true); toast.success("Ascending Order")}}
                    className="hover:cursor-pointer hover:bg-[#e6e7e9] duration-500 px-5 py-2">
                    Ascending Order
                  </div>
                </div>
              )}
            </div>
          </div>
          <div id="tableHead" className="w-full flex items-center text-lg 2xl:text-2xl font-bold border border-black py-2 2xl:py-7 px-1 bg-[#e6e7e9]">
            <div className="w-1/6 pl-5">School Code</div>
            <div className="w-2/6 pl-5">School Name</div>
            <div className="w-3/6 pl-5">Address</div>
          </div>
          {/* table body */}
          {currentSchools.length > 0 && currentSchools.map((data, index) => (
            <div
              key={index}
              id="table body"
              className="w-full flex items-center border-r-[1px] border-b-[1px] border-l-[1px] border-black hover:cursor-pointer hover:shadow-lg h-[50px] 2xl:h-[100px]"
            >
              <div className="w-1/6 pl-5">{data["code"]}</div>
              <div style={style} className="w-2/6 pl-5">
                {data["nameOfSchoolInstitution"]}
              </div>
              <div style={style} className="w-3/6 px-5">
                {data["fullAddressWithPinCode"]}
              </div>
            </div>
          ))}
          {currentSchools.length === 0 && (
            <div className="w-full flex items-center justify-center h-[50px] 2xl:h-[100px]">No Data Found</div>
          )}
          {/* table body end */}

          {/* pagination */}
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100 ${
                currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              <FaArrowLeftLong />
              <span>Previous</span>
            </button>

            <div className="hidden items-center gap-x-3 md:flex">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`rounded-md px-2 py-1 text-sm  ${
                    currentPage === number ? "bg-gray-100 font-bold" : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {number}
                </button>
              ))}
            </div>

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100 ${
                currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              <span>Next</span>
              <FaArrowRightLong />
            </button>
          </div>
        </div>
      </div>
    </Error>
  );
};

export default School;
