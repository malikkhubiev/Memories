import React, { FC, memo } from 'react';
import { CustomAccountCircle } from '../CustomIcons/CustomIcons';

export const CustomAvatar: FC<CustomAvatarPropsType> = memo(({ src, width }) => {
    return <>
        {
            src ?
                <img
                    style={{
                        marginLeft: "5px",
                        width: width ? `${width}px` : "25px",
                        borderRadius: "50%",
                    }}
                    src={process.env.REACT_APP_API_URL + src}
                />
                :
                <CustomAccountCircle
                    width={`${width+10}px` || null}
                />
        }
    </>
});

type CustomAvatarPropsType = {
    src: string,
    width?: number
};