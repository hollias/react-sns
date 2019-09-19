import React, { useCallback } from 'react';
import { Avatar, Card, Button } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_OUT_REQUEST } from '../reducers/user';

const UserProfile = () => {
    const { me } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const onLogout = useCallback((e) => {
        dispatch({
            type : LOG_OUT_REQUEST
        });
    }, []);
    
    return (
        <div>
            <Card
                actions={[
                    <div key="twit">남슈 <br />{me.Posts.length}</div>,
                    <div key="following">팔로잉 <br />{me.Followings.length}</div>,
                    <div key="follower">팔로워 <br />{me.Followers.length}</div>
                ]}>
                <Meta 
                    avatar={<Avatar>{me.nickname[0]}</Avatar>} 
                    title={me.nickname}
                />
                <Button onClick={onLogout}>로그아웃</Button>
            </Card>
        </div>
    );
};

export default UserProfile;