import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../component/PostCard';

const Hashtag = ({ tag }) => {
    const { mainPosts, hasMorePost } = useSelector(state => state.post);
    const dispatch = useDispatch();

    const onScroll = () => {
        if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300){
            if(hasMorePost){
                dispatch({
                    type: LOAD_HASHTAG_POSTS_REQUEST,
                    lastId: mainPosts[mainPosts.length - 1].id,
                    data: tag,
                })
            }
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, [mainPosts.length]);

    return (
        <div>
        {mainPosts.map(c => (
            <PostCard key={+c.id} post={c} />
        ))}
        </div>
    );
}

Hashtag.propTypes = {
    tag: PropTypes.string.isRequired,
};

//front 서버에서 보내온 호출을 받아서 쓰기도함. 서버사이드랜더링할때도 쓰고
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