import React, { FC } from 'react';
import styles from './Avatar.module.less';

export const Avatar: FC<{avatar: string}> = ({ avatar }) => {
    if (avatar) return <img className={styles.avatar} src={process.env.REACT_APP_API_URL + avatar} />
    else return <div className={styles.plug}></div>
};