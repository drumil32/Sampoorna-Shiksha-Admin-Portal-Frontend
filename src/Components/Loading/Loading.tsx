import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { RotatingLines } from "react-loader-spinner";

interface LoadingProps {
    children: React.ReactNode;
}

const Loading: React.FC<LoadingProps> = ({ children }) => {
    const loading = useSelector((state: RootState) => state.status.loading);

    if (loading) {
        return <RotatingLines
            // height="90"
            width="90"
            // radius="9"
            // color="blue"
            ariaLabel="loading"
        />
    }

    return <>{children}</>;
};

export default Loading;
