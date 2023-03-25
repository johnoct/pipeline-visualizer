import React from 'react';
import { SvgIcon } from '@mui/material';

const ArrowIcon = (props) => {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5l-7 7-7-7z" />
            <path d="M0 0h24v24H0z" fill="none" />
        </SvgIcon>
    );
};

export default ArrowIcon;
