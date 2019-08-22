import PostForm from '../component/PostForm';
import PostCard from '../component/PostCard';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction, logoutAction } from '../reducers/user';

const Home = () => {
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector(state => state.user);
    const { mainPosts } = useSelector(state => state.post);

    useEffect(() => {
        // dispatch(loginAction);
    }, []);

    return (
        <>
            {isLoggedIn && <PostForm />}
            {mainPosts.map((c, i) => {
                return (
                    <PostCard key={i} post={c} />
                );
            })}
        </>
    );
};

export default Home;
