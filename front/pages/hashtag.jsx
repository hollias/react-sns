import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../component/PostCard';

const Hashtag = ({ tag }) => {
    const { mainPosts } = useSelector(state => state.post);
    return (
        <div>
        {mainPosts.map(c => (
            <PostCard key={c.createdAt} post={c} />
        ))}
        </div>
    );
}

Hashtag.propTypes = {
    tag: PropTypes.string.isRequired,
};

Hashtag.getInitialProps = async(context) => {
    const tag = context.query.tag;
    context.store.dispatch({
        type: LOAD_HASHTAG_POSTS_REQUEST,
        data: tag,
    });
    return {
        tag,
    }
}

export default Hashtag;