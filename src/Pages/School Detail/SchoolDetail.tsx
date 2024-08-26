import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { SCHOOL } from '../../utils/restEndPoints';

interface SchoolProfileProps {
  schoolDetails?: {
    Timestamp: string;
    nameOfSchoolInstitution: string;
    'Type of institution/school': string;
    District: string;
    State: string;
    fullAddressWithPinCode: string;
    'Name of the Principal and Management ': string;
    'Contact number of the Principal/Management': number;
    'Name of the teacher/coordinator for training and managing the library': string;
    'Contact details of the coordinator/teacher': number;
    'Is there a cupboard/place for safekeeping of the toys': string;
    'Is there a room /place to set up the library': string;
    'Number of Students - Balwadi - class 1': number;
    'Number of Students - class 2 - class 4': number;
    'Number of Students - class 5 and above': number;
    'Referred by': string;
    'Total No of Toys': number;
    'Date of despatch ': string;
    'Mode of despatch': string;
    'Tracking details': string;
    'Date of delivery': string;
    Completed: boolean;
  };
}

const SchoolDetail: React.FC<SchoolProfileProps> = ({ schoolDetails }) => {
  const [schoolData, setSchoolData] = useState<SchoolProfileProps['schoolDetails'] | null>(null);
  const { id } = useParams<{ id: string }>(); 
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (schoolDetails) {
      setSchoolData(schoolDetails);
    } else if (id) {
      const fetchData = async () => {
        try {
          const response = await axiosInstance.get(`${SCHOOL}/${id}`);
          console.log('School data:', response.data);
          setSchoolData(response.data);
        } catch (error) {
          console.error('Error fetching school data:', error);
          // navigate('/error'); 
        }
      };
      fetchData();
    }
  }, [id, schoolDetails, navigate]);

  if (!schoolData) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">{schoolData.nameOfSchoolInstitution}</h1>
        <p><strong>Timestamp:</strong> {schoolData.Timestamp}</p>
        <p><strong>Type of Institution:</strong> {schoolData['Type of institution/school']}</p>
        <p><strong>District:</strong> {schoolData.District}</p>
        <p><strong>State:</strong> {schoolData.State}</p>
        <p><strong>Full Address:</strong> {schoolData.fullAddressWithPinCode}</p>
        <p><strong>Principal:</strong> {schoolData['Name of the Principal and Management ']}</p>
        <p><strong>Principal Contact:</strong> {schoolData['Contact number of the Principal/Management']}</p>
        <p><strong>Library Coordinator:</strong> {schoolData['Name of the teacher/coordinator for training and managing the library']}</p>
        <p><strong>Coordinator Contact:</strong> {schoolData['Contact details of the coordinator/teacher']}</p>
        <p><strong>Safekeeping Cupboard:</strong> {schoolData['Is there a cupboard/place for safekeeping of the toys']}</p>
        <p><strong>Library Room:</strong> {schoolData['Is there a room /place to set up the library']}</p>
        <p><strong>Students (Balwadi - class 1):</strong> {schoolData['Number of Students - Balwadi - class 1']}</p>
        <p><strong>Students (class 2 - class 4):</strong> {schoolData['Number of Students - class 2 - class 4']}</p>
        <p><strong>Students (class 5 and above):</strong> {schoolData['Number of Students - class 5 and above']}</p>
        <p><strong>Referred by:</strong> {schoolData['Referred by']}</p>
        <p><strong>Total Toys:</strong> {schoolData['Total No of Toys']}</p>
        <p><strong>Date of Dispatch:</strong> {schoolData['Date of despatch ']}</p>
        <p><strong>Mode of Dispatch:</strong> {schoolData['Mode of despatch']}</p>
        <p><strong>Tracking Details:</strong> {schoolData['Tracking details']}</p>
        <p><strong>Date of Delivery:</strong> {schoolData['Date of delivery']}</p>
        <p><strong>Completed:</strong> {schoolData.Completed ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
};

export default SchoolDetail;
