import React, { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CustomCommentsIcon } from '../../CustomIcons/CustomIcons';
import { ColumnWrap } from '../../../layout/ColumnWrap/ColumnWrap';
import styles from './Comments.module.less';
import { commentsCallbackType } from '../../../../types/callbacks';
import { Typography } from '@mui/material';

export const Comments: FC<CommentsPropsType> = (
    { imageId, commentsCallback, isCommentSectionOpened, numberOfComments }) => {

    const handler = () => {
        commentsCallback && commentsCallback(!isCommentSectionOpened);
    };

    return (
        <div onClick={handler} >
            <ColumnWrap removePadding={true}>
                {
                    !commentsCallback ?
                        <Link to={`/post/:${imageId}/:true`}>
                            <CustomCommentsIcon width='40' />
                        </Link> :
                        <CustomCommentsIcon width='40' />
                }
                <Typography
                    sx={{
                        fontSize: "20px"
                    }}
                    variant="body2"
                >
                    {numberOfComments}
                </Typography>
            </ColumnWrap>
        </div>
    );
};

export type CommentsPropsType = {
    commentsCallback?: commentsCallbackType
    isCommentSectionOpened?: boolean
    imageId: number
    numberOfComments: string
};