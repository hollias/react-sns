import { Menu, Input, Button } from 'antd';
import Link from 'next/link';

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
            {children}
            <Link href="/signup"><a><Button>회원가입</Button></a></Link>
        </div>
    );
}
export default AppLayout;