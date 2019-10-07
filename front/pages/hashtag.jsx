import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../component/PostCard';

const Hashtag = ({ tag }) => {
    const dispatch = useDispatch();
    const { mainPosts } = useSelector(state => state.post);
    useEffect(() => {
        dispatch({
            type: LOAD_HASHTAG_POSTS_REQUEST,
            data: tag,
        });
    }, []);
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
    console.log('context', context);
    return {
        tag: context.query.tag
    }
}

export default Hashtag;