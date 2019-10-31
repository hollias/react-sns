import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Card, Button, Icon } from 'antd';
import NicknameEditForm from '../component/NicknameEditForm';
import { LOAD_FOLLOWERS_REQUEST, UNFOLLOW_USER_REQUEST, REMOVE_FOLLOWER_REQUEST, LOAD_FOLLOWINGS_REQUEST } from '../reducers/user';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../component/PostCard';

const Profile = () => {
    const { me, followingList, followerList } = useSelector(state => state.user);
    const { mainPosts } = useSelector(state => state.post);

    const onUnfollow = useCallback(userId => () =>{
        dispatch({
            type: UNFOLLOW_USER_REQUEST,
            data: userId
        });
    }, []);

    const removeFollower = useCallback(userId => () =>{
        dispatch({
            type: REMOVE_FOLLOWER_REQUEST,
            data: userId
        });
    }, []);

    return (
        <>
            <NicknameEditForm />
            <List
                style={{ marginBottom: '20px' }}
                grid={{ gutter: 4, xs: 2, md: 3 }}
                size="small"
                header={<div>팔로잉 목록</div>}
                loadMore={<Button style={{ width: '100%' }}>더 보기</Button>}
                bordered
                dataSource={followingList}
                renderItem={item => (
                <List.Item style={{ marginTop: '20px' }}>
                    <Card actions={[<Icon key="stop" type="stop" />]} onClick={onUnfollow(item.id)}>
                        <Card.Meta description={item.nickname} />
                    </Card>
                </List.Item>
                )}
            />
            <List
                style={{ marginBottom: '20px' }}
                grid={{ gutter: 4, xs: 2, md: 3 }}
                size="small"
                header={<div>팔로워 목록</div>}
                loadMore={<Button style={{ width: '100%' }}>더 보기</Button>}
                bordered
                dataSource={followerList}
                renderItem={item => (
                <List.Item style={{ marginTop: '20px' }}>
                    <Card actions={[<Icon key="stop" type="stop" />]} onClick={removeFollower(item.id)}>
                        <Card.Meta description={item.nickname} />
                    </Card>
                </List.Item>
                )}
            />
            <div>
            {mainPosts.map(c => (
                <PostCard key={c.createdAt} post={c} />
            ))}
            </div>
        </>
    );
};

Profile.getInitialProps = async (context) => {
    const me = context.store.getState();
    console.log('me!!!',me);
    if(me){
        context.store.dispatch({
            type: LOAD_FOLLOWERS_REQUEST,
            data: me.id,
        });
        context.store.dispatch({
            type: LOAD_FOLLOWINGS_REQUEST,
            data: me.id,
        });
        context.store.dispatch({
            type: LOAD_USER_POSTS_REQUEST,
            data: me.id,
        });
    }
}
export default Profile;