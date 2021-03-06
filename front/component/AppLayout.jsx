import React, { useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Col, Input, Menu, Row } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';
import { LOAD_USER_REQUEST } from '../reducers/user';

const AppLayout = ({ children }) => {
    const { me } = useSelector(state => state.user);
    const onSearch = (value) => {
        Router.push({ pathname: '/hashtag', query: { tag: value }}, `/hashtag/${value}`);
    }
    return (
        <div>
            <Menu mode="horizontal">
            <Menu.Item key="home"><Link href="/"><a>홈</a></Link></Menu.Item>
            <Menu.Item key="profile"><Link href="/profile" prefetch><a>프로필</a></Link></Menu.Item>
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
            {me ? 
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
};

AppLayout.propTypes = {
    children: PropTypes.node,
};

export default AppLayout;