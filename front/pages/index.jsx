import PostForm from '../component/PostForm';
import PostCard from '../component/PostCard';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';

const Home = () => {
    const { me } = useSelector(state => state.user);
    const { mainPosts, hasMorePost } = useSelector(state => state.post);
    const dispatch = useDispatch();
    const countRef = useRef([]);

    const onScroll = () => {
        if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300){
            if(hasMorePost){
                const lastId = mainPosts[mainPosts.length - 1].id;
                if(!countRef.current.includes(lastId)){
                    dispatch({
                        type: LOAD_MAIN_POSTS_REQUEST,
                        lastId,
                    });
                    countRef.current.push(lastId);
                }
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

Home.getInitialProps = async (context) => { //넥스트에서 제공하는 생명주기로 서버사이드에서는 처음 해당 페이지가 마운트 되었을때 실행(componentDidMount와 흡사)
    context.store.dispatch({                //클라이언트 사이드에서는 componentWillMount랑 흡사
        type: LOAD_MAIN_POSTS_REQUEST,
    })
}

export default Home;
