import React from 'react';
import { Form, Input, Button } from 'antd';
import { useSelector } from 'react-redux';

const PostForm = () => {
    const imagePaths = useSelector(state => state.post.imagePaths)
    return (
        <div>
            <Form encType="multipart/form-data" style={{ margin : '10px 0 20px' }}>
                <Input.TextArea maxLength={140} placeholder="오늘의 메뉴를 입력해주세요." />
                <div>
                    <Button>이미지 업로드</Button>
                    <Button type="primary" stype={{ float : 'right' }} htmlType="submit">찰칵</Button>                    
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