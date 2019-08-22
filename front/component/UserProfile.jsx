import React, { useCallback } from 'react';
import { Avatar, Card, Button } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../reducers/user';

const UserProfile = () => {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const onLogout = useCallback((e) => {
        dispatch(logoutAction);
    }, []);
    
    return (
        <div>
            <Card
                actions={[
                    <div key="twit">남슈 <br />{user.Post.length}</div>,
                    <div key="following">팔로잉 <br />{user.Followings.length}</div>,
                    <div key="follower">팔로워 <br />{user.Followers.length}</div>
                ]}>
                <Meta 
                    avatar={<Avatar>{user.nickname[0]}</Avatar>} 
                    title={user.nickname}
                />
                <Button onClick={onLogout}>로그아웃</Button>
            </Card>
        </div>
    );
};

export default UserProfile;