import { useSelector } from 'react-redux';
import propTypes from 'prop-types';
import { LOAD_POST_REQUEST } from '../reducers/post';

const Post = ({ id }) =>{
    const { singlePost } = useSelector(state => state.post);
    return (
        <>
            <div>{singlePost.context}</div>
            <div>{singlePost.user.nickname}</div>
            <div>{singlePost.Images[0] && <img src={`http://loaclhost:3030/${singlePost.Images[0].src}`}></img>}</div>
        </>
    );
}

Post.getInitialProps = async (context) => {
    context.store.dispatch({
        type: LOAD_POST_REQUEST,
        data: context.query.id,
    });
    return { id: parseInt(context.query.id, 10) };
}

Post.propTypes = {
    id: propTypes.number.isRequired,
}

export default Post;