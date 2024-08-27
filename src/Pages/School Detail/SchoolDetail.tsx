import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { SCHOOL } from "../../utils/restEndPoints";

interface SchoolProfileProps {
  schoolDetails?: {
    boardAffiliatedAndMediumOfInstruction?: string;
    code?: string;
    contactDetailsOfCoordinatorTeacher?: string; // done
    contactNumberOfPrincipalManagement?: string; // done
    createdAtIST?: string;
    cupboardPictures?: string;
    district?: string; // done
    fullAddressWithPinCode?: string; // done
    id?: string;
    isThereCupboardForSafekeeping?: string; // done
    isThereRoomForLibrary?: string; // done
    nameOfCoordinatorForLibrary?: string; // done
    nameOfPrincipalAndManagement?: string; // done
    nameOfSchoolInstitution?: string;
    numberOfStudentsBalwadiClass1?: string; // done
    numberOfStudentsClass2To4?: string; // done
    numberOfStudentsClass5AndAbove?: string; // done
    picturesOfLibraryRoomAndCupboard?: string;
    referredBy?: string; // done
    state?: string; // done
    timestamp?: string; // done
    typeOfInstitutionSchool?: string; // done
    updatedAtIST?: string;
    villageNameIfAny?: string;
    __v?: number; // done
    _id?: string; // done
  };
}

const SchoolDetail: React.FC<SchoolProfileProps> = ({ schoolDetails }) => {
  const [schoolData, setSchoolData] = useState<
    SchoolProfileProps["schoolDetails"] | null
  >(null);
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (schoolDetails) {
      setSchoolData(schoolDetails);
    } else if (id) {
      console.log(id)
      const fetchData = async () => {
        try {
          const response = await axiosInstance.get(`${SCHOOL}/${id}`);
          console.log("School data:", response.data);
          setSchoolData(response.data.school);
        } catch (error) {
          console.error("Error fetching school data:", error);
          // navigate('/error');
        }
      };
      fetchData();
    }
  }, [id, schoolDetails, navigate]);

  if (!schoolData) return <div>Loading...</div>;

  return (
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
            </p>

            <p className="mb-2">
              <strong>Completed:</strong> {"No"}
            </p>
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
  );
};

export default SchoolDetail;
