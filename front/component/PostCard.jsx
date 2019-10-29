import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { Card, Icon, Button, Avatar, Form, List, Input, Comment } from 'antd';
import Meta from 'antd/lib/card/Meta';
import PropTypes from 'prop-types';
import { ADD_COMMENT_REQUEST, LOAD_COMMENTS_REQUEST, UNLIKE_POST_REQUEST, LIKE_POST_REQUEST, RETWEET_REQUEST } from '../reducers/post';
import PostImages from './PostImages';

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
    }, [me && me.id]);

    return (
        <div>
            <Card 
                key={+post.createdAt}
                cover={post.Images[0] && <PostImages images={post.Images}/>}
                actions={[
                    <Icon key="retweet" type="retweet" onClick={onRetweet}/>,
                    <Icon key="heart" type="heart" onClick={onToggleLike} theme={liked ? 'twoTone' : 'outlined'} twoToneColor="#eb2f96"/>,
                    <Icon key="message" type="message" onClick={onToggleComment} />,
                    <Icon key="ellipsis" type="ellipsis"/>,
                ]}
                extra={<Button>팔로우</Button>}>
                <Meta 
                    avatar={<Link href={{ pathname: '/user', query: {id:post.User.id} }} as={`/user/${post.User.id}`}><a><Avatar>{post.User.nickname[0]}</Avatar></a></Link>}
                    title={post.User.nickname}
                    description={<div>{post.content.split(/(#[^\s]+)/g).map((v) => {
                        if(v.match(/#[^\s]+/)){
                            return (
                                <Link 
                                    href={{ pathname: '/hashtag', query:{ tag: v.slice(1)}}} 
                                    as={`/hashtag/${v.slice(1)}`} 
                                    key={v}><a>{v}</a>
                                </Link>
                            )
                        }
                        return v;
                    })}</div>}
                />
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