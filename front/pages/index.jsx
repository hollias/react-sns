import PostForm from '../component/PostForm';
import PostCard from '../component/PostCard';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';

const Home = () => {
    const dispatch = useDispatch();
    const { me } = useSelector(state => state.user);
    const { mainPosts } = useSelector(state => state.post);

    useEffect(() => {
        dispatch({
            type: LOAD_MAIN_POSTS_REQUEST
        });
    }, []);

    return (
        <>
            {me && <PostForm />}
            {mainPosts.map((c, i) => {
                return (
                    <PostCard key={i} post={c} />
                );
            })}
        </>
    );
};

export default Home;
