import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Card, Button, Icon } from 'antd';
import NicknameEditForm from '../component/NicknameEditForm';
import { LOAD_FOLLOWERS_REQUEST, UNFOLLOW_USER_REQUEST, REMOVE_FOLLOWER_REQUEST, LOAD_FOLLOWINGS_REQUEST } from '../reducers/user';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../component/PostCard';

const Profile = () => {
    const { me, followingList, followerList, hasMoreFollower, hasMoreFollowing } = useSelector(state => state.user);
    const { mainPosts } = useSelector(state => state.post);
    const dispatch = useDispatch();

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

    const loadMoreFollowing = useCallback(() => {
        return dispatch({
            type: LOAD_FOLLOWINGS_REQUEST,
            offset: followingList.length,
        });
    }, []);
    const loadMoreFollower = useCallback(() => {
        return dispatch({
            type: LOAD_FOLLOWERS_REQUEST,
            offset: followerList.length,
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
                loadMore={hasMoreFollowing && <Button style={{ width: '100%' }} onClick={loadMoreFollowing}>더 보기</Button>}
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
                loadMore={hasMoreFollower &&<Button style={{ width: '100%' }} onClick={loadMoreFollower}>더 보기</Button>}
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
                <PostCard key={c.id} post={c} />
            ))}
            </div>
        </>
    );
};

Profile.getInitialProps = async (context) => {
    const me = context.store.getState().user.me;
    //이부분에서 _app 에서 dispatch한 LOAD_USER_REQUEST 실행
    context.store.dispatch({
        type: LOAD_FOLLOWERS_REQUEST,
        data: me && me.id,
    });
    context.store.dispatch({
        type: LOAD_FOLLOWINGS_REQUEST,
        data: me && me.id,
    });
    context.store.dispatch({
        type: LOAD_USER_POSTS_REQUEST,
        data: me && me.id,
    });

    //이부분에서 LOAD_USER_SUCCESS 가 실행되기때문에 me가 null 인상태
}
export default Profile;