import React, { useEffect } from 'react'
import axiosInstance from '../../utils/axiosInstance';
import { SCHOOL } from '../../utils/restEndPoints';
import { useDispatch } from 'react-redux';
import { setError } from '../../redux/slices/statusSlice';
import { Action } from '../../types/error';
import Error from '../../Components/ErrorHandler/Error';

const School: React.FC = () => {
    const dispatch = useDispatch();
    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(`${SCHOOL}?code=12&nameOfSchoolInstitution=no`);
            console.log(response.data);
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
            }
        }
    }
    useEffect(() => {
        fetchData();
    });
    return (
        <Error>
            <div>
                School
            </div>
        </Error>
    );
}

export default School;