import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Icon, Button, Avatar, Form, List, Input, Comment } from 'antd';
import Meta from 'antd/lib/card/Meta';
import PropTypes from 'prop-types';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const PostCard = ({ post }) => {
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const [commentText, setCommentText] = useState('');
    const dispatch = useDispatch();
    const { isAddingComment, commentAdded } = useSelector(state => state.post);
    const { me } = useSelector(state => state.user);

    const onToggleComment = useCallback(() => {
        if(!me){
            return alert("로그인해야합니다.");
        }
        setCommentFormOpened(prev => !prev);
    }, [me && me.id]);

    const onSubmitComment = useCallback((e) => {
        e.preventDefault();
        dispatch({
            type: ADD_COMMENT_REQUEST,
            data: {
                postId: post.id,
            }
        })

    }, []);

    const onChangeCommentText = useCallback((e) => {
        setCommentText(e.target.value);
    });

    useEffect(() => {
        if(commentAdded === true)    setCommentText('');
    }, [commentAdded]);

    return (
        <div>
            <Card 
                key={+post.createdAt}
                cover={post.img && <img alt="example" src={post.img} />}
                actions={[
                    <Icon key="retweet" type="retweet"/>,
                    <Icon key="heart" type="heart"/>,
                    <Icon key="message" type="message" onClick={onToggleComment} />,
                    <Icon key="ellipsis" type="ellipsis"/>,
                ]}
                extra={<Button>팔로우</Button>}>
                <Meta 
                    avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                    title={post.User.nickname}
                    description={post.content}
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
                                avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
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