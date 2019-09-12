import { Menu, Input, Row, Col } from 'antd';
import Link from 'next/link';
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';
import { useSelector } from 'react-redux';

const AppLayout = ({ children }) => {
    const { isLoggedIn } = useSelector(state => state.user);
    
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
                    {isLoggedIn ? 
                    <UserProfile />
                    :
                    <LoginForm />
                    }
                </Col>
                <Col xs={24} md={12}>{children}</Col>
                <Col xs={24} md={6}><Link href=""><a target="_black">아아아</a></Link></Col>
            </Row>
            
        </div>
    );
}
export default AppLayout;