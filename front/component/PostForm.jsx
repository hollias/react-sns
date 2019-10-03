import React, { useCallback, useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_POST_REQUEST } from '../reducers/post';

const PostForm = () => {
    const dispatch = useDispatch();
    const { imagePaths, isAddingPost, postAdded } = useSelector(state => state.post);
    const [text, setText] = useState('');

    useEffect(() => {
        if (postAdded) {
            setText('');
        }
    }, [postAdded]);

    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        if(!text || !text.trim()){
            return alert('게시글을 작성하세요.');
        }
        dispatch({
            type : ADD_POST_REQUEST,
            data : {
                content: text,
            }
        });
    }, [text]);

    const onChangeText = useCallback((e) => {
        setText(e.target.value);
    }, []);

    return (
        <div>
            <Form encType="multipart/form-data" style={{ margin : '10px 0 20px' }} onSubmit={onSubmitForm}>
                <Input.TextArea maxLength={140} placeholder="오늘의 메뉴를 입력해주세요." value={text} onChange={onChangeText}/>
                <div>
                    <Button>이미지 업로드</Button>
                    <Button type="primary" stype={{ float : 'right' }} htmlType="submit" loading={isAddingPost}>등록</Button>    
                </div>
                <div>
                    {imagePaths.map((v, i) => {
                        return (
                            <div key={v} style={{ display: 'inline-block' }}>
                                <img src={'http://loaclhost:3065/'+v} style={{ width : '200px' }} alt={v} />
                                <div>
                                    <Button>제거</Button>
                                </div>    
                            </div>
                        );
                    })}
                </div>
            </Form>
        </div>
    );
};

export default PostForm;