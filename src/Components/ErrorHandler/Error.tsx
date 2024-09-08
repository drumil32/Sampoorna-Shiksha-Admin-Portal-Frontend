import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Action, IBackEndError } from '../../types/error';
import { clearError } from '../../redux/slices/statusSlice';
import { SIGNIN } from '../../utils/routes';

interface ErrorProps {
    children: React.ReactNode;
}

const Error: React.FC<ErrorProps> = ({ children }) => {
    const error: IBackEndError = useSelector((state: RootState) => state.status.error);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (error) {
            toast.error(error.message);
            if (401 == error.statusCode) {
                navigate(SIGNIN)
            }else if ( error.action==Action.SCHOOL_DETAILS ){
                if( error.statusCode == 404 ){
                    toast.error('School with given id not found.');
                }
            }
            dispatch(clearError());
        }
    }, [error]);

    return <>{children}</>;
};

export default Error;
