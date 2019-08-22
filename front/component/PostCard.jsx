import React from 'react';
import { Card, Icon, Button, Avatar } from 'antd';
import Meta from 'antd/lib/card/Meta';
import PropTypes from 'prop-types';

const PostCard = ({ post }) => {
    return (
        <div>
            <Card 
                key={+post.createdAt}
                cover={post.img && <img alt="example" src={post.img} />}
                actions={[
                    <Icon key="retweet" type="retweet"/>,
                    <Icon key="heart" type="heart"/>,
                    <Icon key="message" type="message"/>,
                    <Icon key="ellipsis" type="ellipsis"/>,
                ]}
                extra={<Button>팔로우</Button>}>
                <Meta 
                    avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                    title={post.User.nickname}
                    description={post.content}
                />
            </Card>
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