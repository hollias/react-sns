import { Button, Form, Input, Card, Icon, Avatar } from 'antd';
import Meta from 'antd/lib/card/Meta';

const dummy = {
    isLoggedIn : true,
    imagePaths : [],
    mainPosts : [{
        User : {
            id : 1,
            nickname : '이남수',
        },
        content : '첫게시물',    
        img : '../img/190622_0467.jpg',
        createdAt : 1,
    },
    {
        User : {
            id : 2,
            nickname : '이남수',
        },
        content : '첫게시물',    
        img : '../img/190622_0467.jpg',
        createdAt : 1,
    }],
    
}

const Home = () => {
    return (
        <>
            {dummy.isLoggedIn && <Form encType="multipart/form-data">
                <Input.TextArea maxLength={140} placeholder="오늘의 메뉴를 입력해주세요." />
                <div>
                    <Button>이미지 업로드</Button>
                    <Button type="primary" stype={{ float : 'right' }} htmlType="submit">찰칵</Button>                    
                </div>
                <div>
                    {dummy.imagePaths.map((v, i) => {
                        return (
                            <div key={v} style={{ display: 'inline-block' }}>
                                <img src={'http://loaclhost:3065/'+v} stype={{ width : '200px' }} alt={v} />
                                <div>
                                    <Button>제거</Button>
                                </div>    
                            </div>
                        );
                    })}
                </div>
            </Form>}
            {dummy.mainPosts.map((c) => {
                return (
                    <Card 
                        key={+c.createdAt}
                        cover={c.img && <img alt="example" src={c.img} />}
                        actions={[
                            <Icon key="retweet" type="retweet"/>,
                            <Icon key="heart" type="heart"/>,
                            <Icon key="message" type="message"/>,
                            <Icon key="ellipsis" type="ellipsis"/>,
                        ]}
                        extra={<Button>팔로우</Button>}>
                        <Meta 
                            avatar={<Avatar>{c.User.nickname[0]}</Avatar>}
                            title={c.User.nickname}
                            description={c.content}
                        />
                    </Card>
                );
            })}
        </>
    );
};

export default Home;
