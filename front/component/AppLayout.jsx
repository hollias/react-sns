import { Menu, Input, Row, Col, Card, Avatar, Form, Button } from 'antd';
import Link from 'next/link';
import Meta from 'antd/lib/card/Meta';
import LoginForm from './LoginForm';

const dummy = {
    nickname : '이남수',
    Post : [],
    Followings : [],
    Followers : [],
    isLoggedIn : false
}

const AppLayout = ({ children }) => {
    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item key="home"><Link href="/"><a>홈</a></Link></Menu.Item>
                <Menu.Item key="profile"><Link href="/profile"><a>프로필</a></Link></Menu.Item>
                <Menu.Item key="mail">
                <Input.Search
                    placeholder="input search text"
                    onSearch={value => console.log(value)}
                    style={{ width: 200 }}
                    />
                </Menu.Item>
            </Menu>
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    {dummy.isLoggedIn ? 
                    
                    <Card
                        actions={[
                            <div key="twit">남슈 <br />{dummy.Post.length}</div>,
                            <div key="following">팔로잉 <br />{dummy.Followings.length}</div>,
                            <div key="follower">팔로워 <br />{dummy.Followers.length}</div>
                        ]}>
                        <Meta avatar={<Avatar>{dummy.nickname[0]}</Avatar>} title={dummy.nickname}/>
                    </Card>
                    :
                    <LoginForm />
                    }
                </Col>
                <Col xs={24} md={12}>{children}</Col>
                <Col xs={24} md={6}>세번째</Col>
            </Row>
            
        </div>
    );
}
export default AppLayout;