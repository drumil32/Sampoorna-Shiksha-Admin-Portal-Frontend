import React, { useEffect } from 'react'
import axiosInstance from '../../utils/axiosInstance';
import { SCHOOL } from '../../utils/restEndPoints';

const School: React.FC = () => {
    const fetchData = async () => {
        const response = await axiosInstance.get(`${SCHOOL}?code=12&nameOfSchoolInstitution=no`);
        console.log(response.data);
    }
    useEffect(()=>{
        fetchData();
    });
    return (
        <div>School</div>
    )
}

export default School;