import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { SCHOOL } from "../../utils/restEndPoints";
import { useDispatch } from "react-redux";
import { setError, setLoading } from "../../redux/slices/statusSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGenericSortingAsc } from "react-icons/fc";
import Select from "../../Components/atoms/Select/Select";
import Pagination from "../../Components/atoms/Pagination/Pagination";
import ToggleSwitch from "../../Components/atoms/ToggleSwitch/ToggleSwitch";
import SearchBox from "../../Components/atoms/SearchBox/SearchBox";
import { useNavigate } from "react-router-dom";
import './School.css'
import Loading from "../../Components/Loading/Loading";
import './School.css'


const School: React.FC = () => {
  const dispatch = useDispatch();
  const [isAscending, setIsAscending] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [schoolsPerPage] = useState<number>(9);
  const [schoolList, setSchoolList] = useState([]);
  const [searchType, setSearchType] = useState<string>("School Name");

  const navigate = useNavigate();

  const fetchData = async (search = "", sortAsc = isAscending) => {
    try {
      let queryParams = `${SCHOOL}?sortByAsc=${sortAsc}`;

      if (searchType === "School Name") {
        queryParams += `&nameOfSchoolInstitution=${search}`;
      } else if (searchType === "School Code") {
        queryParams += `&code=${search}`;
      }
      dispatch(setLoading(true));
      const response = await axiosInstance.get(queryParams);
      console.log("API Response:", response.data.schools);


      if (Array.isArray(response.data.schools)) {
        setSchoolList(response.data.schools);
        setCurrentPage(1);
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
            message: error.response.data.error
          })
        );
      } else {
        toast.error("Server is Down");
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchData();
  }, [isAscending]);

  const handleSubmitSearch = () => {
    fetchData(searchTerm, isAscending);
    toast.success("Data Fetched Successfully");
  };

  // Pagination logic
  const indexOfLastSchool = currentPage * schoolsPerPage;
  const indexOfFirstSchool = indexOfLastSchool - schoolsPerPage;
  const currentSchools = schoolList.slice(indexOfFirstSchool, indexOfLastSchool);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(schoolList.length / schoolsPerPage);

  return (
    <Loading>
      <div className="w-full flex flex-col items-center p-8 bg-[#f5f5f5]">
        <div id="table" className="w-full p-5 shadow-lg rounded-2xl bg-white overflow-hidden 2xl:text-2xl min-h-[90vh]">
          <div id="tableFunctionalityBox" className="mb-5 bg-[#e8e6e6] rounded-lg flex gap-5 items-center justify-between py-2 px-5 w-full">

            <div className="flex gap-6">
              <SearchBox
                searchTerm={searchTerm}
                searchType={searchType}
                setSearchTerm={setSearchTerm}
                handleSubmitSearch={handleSubmitSearch}
              />
              <Select options={[{ value: "School Name", label: "School Name" }, { value: "School Code", label: "School Code" }]} defaultValue={searchType} onChange={setSearchType} />
            </div>

            <div id="sort" className="relative cursor-pointer">
              <div
                className="flex gap-3 items-center bg-white duration-500 rounded-lg px-2 py-1"
              >
                <div className="flex gap-1 items-center">
                  <FcGenericSortingAsc className="text-lg cursor-pointer" />
                  Sort
                </div>
                <ToggleSwitch isChecked={isAscending} onChange={() => { setIsAscending(!isAscending) }} />
              </div>
            </div>
          </div>
          <div id="tableHead" className="w-full flex items-center text-lg 2xl:text-2xl font-bold border border-black py-2 2xl:py-7 px-1 bg-[#1E487C] text-white">
            <div className="w-1/6 pl-5">School Code</div>
            <div className="w-2/6 pl-5">School Name</div>
            <div className="w-3/6 pl-5">Address</div>
          </div>

          {/* table body */}
          {currentSchools.length > 0 && currentSchools.map((data, index) => (
            <div
              key={index}
              onClick={() => navigate(`/school/${data["_id"]}`)}
              id="table body"
              className={`w-full flex items-center border-r-[1px] border-b-[1px] border-l-[1px] border-black py-2 2xl:py-7 px-1 hover:bg-[#e6e7e9] hover:cursor-pointer text-sm 2xl:text-2xl ${index % 2 === 0 ? "bg-white" : "bg-[#DAE2F4]"}`}
            >
              <div className="w-1/6 pl-5 ellipsisStyle">{data["code"]}</div>
              <div className="w-2/6 pl-5 ellipsisStyle">{data["nameOfSchoolInstitution"]}</div>
              <div className="w-3/6 pl-5 ellipsisStyle ">{data["fullAddressWithPinCode"]}</div>
            </div>
          ))}
          {currentSchools.length === 0 && <div className="w-full flex items-center justify-center h-[50px] 2xl:h-[100px">No Data Found</div>}

          {/* Pagination */}
          <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
        </div>
      </div>
    </Loading>
  );
};

export default School;
