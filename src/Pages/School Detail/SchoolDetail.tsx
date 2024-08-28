import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useParams } from "react-router-dom";
import { SCHOOL, SCHOOL_ORDER } from "../../utils/restEndPoints";
import { ISchoolDetails, ISchoolOrder } from "../../types/School";
import Error from "../../Components/ErrorHandler/Error";
import { toast } from "react-toastify";
import { Action } from "../../types/error";
import { setError, setLoading } from "../../redux/slices/statusSlice";
import { useDispatch } from "react-redux";
import Loading from "../../Components/Loading/Loading";

const SchoolDetail: React.FC = () => {
  const [schoolData, setSchoolData] = useState<ISchoolDetails >({});
  const [schoolOrders, setSchoolOrder] = useState<ISchoolOrder[]>([]);
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));
        const response = await axiosInstance.get(`${SCHOOL}/${id}`);
        console.log("School data:", response.data);
        setSchoolData(response.data.school);
        const orderResponse = await axiosInstance.get(`${SCHOOL_ORDER}/${id}`);
        console.log("School orders:", orderResponse.data);
        setSchoolOrder(orderResponse.data);
      } catch (error: any) {
        if (error.response) {
          dispatch(
            setError({
              statusCode: error.response.status,
              message: error.response.data.error,
              action: Action.SCHOOL_DETILS,
            })
          );
        } else {
          toast.error("Server is Down.");
        }
      } finally {
        dispatch(setLoading(false));
      }
    }
    !schoolData && fetchData();
  }, [id]);

  return (
    <Loading>
      <Error>
        <div className="p-8 bg-[#f5f5f5] h-[100vh]">
          <div className="bg-white p-6 rounded-lg shadow-lg  ">
            {/* Basic Information Section */}
            <h1 className="text-2xl font-bold mb-4">
              {schoolData.nameOfSchoolInstitution}
            </h1>
            <div className="flex gap-10">
              <div className="rounded-xl shadow-lg p-5 w-1/2">
                <p className="mb-2">
                  <strong>Timestamp:</strong> {schoolData.createdAtIST}
                </p>
                <p className="mb-2">
                  <strong>Type of Institution:</strong>{" "}
                  {schoolData.typeOfInstitutionSchool}
                </p>
                <p className="mb-2">
                  <strong>District:</strong> {schoolData.district}
                </p>
                <p className="mb-2">
                  <strong>State:</strong> {schoolData.state}
                </p>
                <p className="mb-2">
                  <strong>Full Address:</strong> {schoolData.fullAddressWithPinCode}
                </p>
                <p className="mb-2">
                  <strong>Principal:</strong>{" "}
                  {schoolData.nameOfPrincipalAndManagement}
                </p>
                <p className="mb-2">
                  <strong>Principal Contact:</strong>{" "}
                  {schoolData.contactNumberOfPrincipalManagement}
                </p>
                <p className="mb-2">
                  <strong>Students (Balwadi - class 1):</strong>{" "}
                  {schoolData.numberOfStudentsBalwadiClass1}
                </p>
                <p className="mb-2">
                  <strong>Students (class 2 - class 4):</strong>{" "}
                  {schoolData.numberOfStudentsClass2To4}
                </p>
                <p className="mb-2">
                  <strong>Students (class 5 and above):</strong>{" "}
                  {schoolData.numberOfStudentsClass5AndAbove}
                </p>
                <p className="mb-2">
                  <strong>Referred by:</strong> {schoolData.referredBy}
                </p>
                <p className="mb-2">
                  <strong>Library Coordinator:</strong>{" "}
                  {schoolData.nameOfCoordinatorForLibrary}
                </p>
              </div>

              {/* Additional Details Section */}
              <div className=" rounded-es-xl shadow-lg p-5 w-1/2">
                <p className="mb-2">
                  <strong>Coordinator Contact:</strong>{" "}
                  {schoolData.contactDetailsOfCoordinatorTeacher}
                </p>
                <p className="mb-2">
                  <strong>Safekeeping Cupboard:</strong>{" "}
                  {schoolData.isThereCupboardForSafekeeping}
                </p>
                <p className="mb-2">
                  <strong>Library Room:</strong> {schoolData.isThereRoomForLibrary}
                </p>

                <p className="mb-2">
                  <strong>Village Name:</strong> {schoolData.villageNameIfAny}
                </p>

                {/* <p className="mb-2"><strong>Total Toys:</strong> {schoolData.totalNoOfToys}</p> */}
                {/* 
              <p className="mb-2">
                <strong>Date of Dispatch:</strong> {"N/A"}
              </p>

              <p className="mb-2">
                <strong>Mode of Dispatch:</strong> {"N/A"}
              </p>

              <p className="mb-2">
                <strong>Tracking Details:</strong> {"N/A"}
              </p>

              <p className="mb-2">
                <strong>Date of Delivery:</strong> {"N/A"}
              </p> */}
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg  ">
              <h2 className="text-lg font-bold mb-4">Order Details</h2>
              <div>

              </div>
            </div>
            <div></div>
          </div>
        </div>
      </Error>
    </Loading>
  );
};

export default SchoolDetail;
