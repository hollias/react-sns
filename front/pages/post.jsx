import { useSelector } from 'react-redux';
import propTypes from 'prop-types';
import { LOAD_POST_REQUEST } from '../reducers/post';
import Helmet from 'react-helmet';

const Post = ({ id }) =>{
    const { singlePost } = useSelector(state => state.post);
    return (
        <>
            <Helmet //메타정보
                title={`${singlePost.User.nickname}님의 글`}
                description={singlePost.content}
                meta={[{
                    name: 'description',
                    content: singlePost.content
                }, {
                    property: 'og:title',   //카카오톡메세지같은곳에서 주소보내면 이미지와 title, description 뜨는거는 다 meta정보에 있다.
                    content: `${singlePost.User.nickname}님의 글`
                }, {
                    property: 'og:description',
                    content: singlePost.content,
                }, {
                    property: 'og:image',
                    content: singlePost.Images[0] && `http://localhost:3030/${singlePost.Images[0].scr}`
                }, {
                    property: 'og:url',
                    content: `http://loaclhost:3000/post/${id}`
                }]}
            />
            <div itemScope="content">{singlePost.context}</div>
            <div itemScope="author">{singlePost.User.nickname}</div>
            <div>{singlePost.Images[0] && <img src={`http://localhost:3030/${singlePost.Images[0].src}`} />}</div>
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