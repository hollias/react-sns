import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { Card, Icon, Button, Avatar, Form, List, Input, Comment } from 'antd';
import Meta from 'antd/lib/card/Meta';
import PropTypes from 'prop-types';
import { ADD_COMMENT_REQUEST, LOAD_COMMENTS_REQUEST, UNLIKE_POST_REQUEST, LIKE_POST_REQUEST, RETWEET_REQUEST } from '../reducers/post';
import PostImages from './PostImages';
import PostCardContent from './PostCardContent';
import { UNFOLLOW_USER_REQUEST, FOLLOW_USER_REQUEST } from '../reducers/user';

const PostCard = ({ post }) => {
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const [commentText, setCommentText] = useState('');
    const dispatch = useDispatch();
    const { isAddingComment, commentAdded } = useSelector(state => state.post);
    const { me } = useSelector(state => state.user);

    const liked = me && post.Likers && post.Likers.find(v => v.id === me.id)

    const onToggleComment = useCallback(() => {
        setCommentFormOpened(prev => !prev);
        if(!commentFormOpened){
            dispatch({
                type: LOAD_COMMENTS_REQUEST,
                data : post.id
            });
        }
    }, [commentFormOpened]);

    const onSubmitComment = useCallback((e) => {
        e.preventDefault();
        if(!me){
            return alert('로그인이 필요합니다.');
        }

        dispatch({
            type: ADD_COMMENT_REQUEST,
            data: {
                postId: post.id,
                content: commentText,
            }
        })

    }, [me && me.id, commentText]);

    const onChangeCommentText = useCallback((e) => {
        setCommentText(e.target.value);
    });

    useEffect(() => {
        if(commentAdded === true)    setCommentText('');
    }, [commentAdded]);

    const onToggleLike = useCallback(() => {
        if(!me){
            return alert('로그인이 필요합니다.');
        }

        if(liked){
            return dispatch({
                type: UNLIKE_POST_REQUEST,
                data: post.id
            })
        } else {
            return dispatch({
                type: LIKE_POST_REQUEST,
                data: post.id
            })
        }
    }, [me && me.id, post && post.id, liked]);

    const onRetweet = useCallback(() => {
        if(!me){
            console.log('retweet?', me)
            return alert('로그인이 필요합니다.');
        }

        return dispatch({
            type: RETWEET_REQUEST,
            data: post.id
        })
    }, [me && me.id, post && post.id]);

    const onUnfollow = useCallback(userId => () => {
        return dispatch({
            type: UNFOLLOW_USER_REQUEST,
            data: userId
        });
    }, []);
    const onFollow = useCallback(userId => () => {
        return dispatch({
            type: FOLLOW_USER_REQUEST,
            data: userId
        });
    }, []);

    return (
        <div>
            <Card 
                key={+post.createdAt}
                cover={post.Images && post.Images[0] && <PostImages images={post.Images} />}
                actions={[
                    <Icon key="retweet" type="retweet" onClick={onRetweet}/>,
                    <Icon key="heart" type="heart" onClick={onToggleLike} theme={liked ? 'twoTone' : 'outlined'} twoToneColor="#eb2f96"/>,
                    <Icon key="message" type="message" onClick={onToggleComment} />,
                    <Icon key="ellipsis" type="ellipsis"/>,
                ]}
                title={post.RetweetId ? `${post.User.nickname}님이 리트윗하셨습니다.` : null}
                extra={!me || post.User.id === me.id
                    ? null : me.Followings && me.Followings.find(v => {
                        return v.id === post.User.id   
                    })
                        ? <Button onClick={onUnfollow(post.User.id)}>팔로우 취소</Button> 
                        : <Button onClick={onFollow(post.User.id)}>팔로우</Button>
                }>
                {post.RetweetId && post.Retweet
                ? (
                    <Card
                        cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}
                    >
                    <Card.Meta
                        avatar={(
                        <Link
                            href={{ pathname: '/user', query: { id: post.Retweet.User.id } }}
                            as={`/user/${post.Retweet.User.id}`}
                        >
                            <a><Avatar>{post.Retweet.User.nickname[0]}</Avatar></a>
                        </Link>
                        )}
                        title={post.Retweet.User.nickname}
                        description={<PostCardContent postData={post.Retweet.content} />} // a tag x -> Link
                    />
                    </Card>
                )
                : (
                    <Card.Meta
                    avatar={(
                        <Link href={{ pathname: '/user', query: { id: post.User.id } }} as={`/user/${post.User.id}`}>
                        <a><Avatar>{post.User.nickname[0]}</Avatar></a>
                        </Link>
                    )}
                    title={post.User.nickname}
                    description={<PostCardContent postData={post.content} />} // a tag x -> Link
                    />
                )}
                
            </Card>
            {commentFormOpened && (
                <>
                    <Form onSubmit={onSubmitComment}>
                        <Form.Item>
                            <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText} />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" loading={isAddingComment}>등록</Button>
                    </Form>
                    <List
                        header={`${post.Comments ? post.Comments.length : 0} 댓글`}
                        itemLayout="horizontal"
                        dataSource={post.Comments || []}
                        renderItem={item => (
                            <li>
                            <Comment
                                author={item.User.nickname}
                                avatar={<Link href={{ pathname: '/user', query: {id:item.User.id} }} as={`/user/${item.User.id}`}><a><Avatar>{item.User.nickname[0]}</Avatar></a></Link>}
                                content={item.content}
                            />
                            </li>
                        )}
                    />
              </>
            )}
        </div>
    );
};

PostCard.propTypes = {
    post : PropTypes.shape({
        User : PropTypes.object,
        content : PropTypes.string,
        img : PropTypes.string,
        createAt : PropTypes.object,
    })
};

export default PostCard;