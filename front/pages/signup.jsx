import React, { useState, useCallback, useEffect } from 'react';
import { Input, Form, Checkbox, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_UP_REQUEST } from '../reducers/user';
import Router from 'next/router';

export const useInput = (initValue = null) =>{
    const [value, setter] = useState(initValue);
    const handler = useCallback((e) => {
        setter(e.target.value);
    }, []);

    return [value, handler];
}

const Signup = () => {
    const [passwordCheck, setPasswordCheck] = useState('');
    const [term, setTerm] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [termError, setTermError] = useState(false);

    const [id, onChangeId] = useInput('');
    const [nickname, onChangeNickname] = useInput('');
    const [password, onChangePassword] = useInput('');

    const dispatch = useDispatch();
    const { isSigningUp, me } = useSelector(state => state.user);

    useEffect(() => {
        if(me){
            Router.push('/');
        }
    },[me && me.id])
    
    const onSubmit = useCallback((e) => {
        e.preventDefault();

        if(password !== passwordCheck){
            return setPasswordError(true);
        }
        if(!term){
            return setTermError(true);
        }

        dispatch({
            type : SIGN_UP_REQUEST,
            data: {
                userId: id,
                password,
                nickname: nickname
            }
        });

    }, [id, nickname, password, passwordCheck, term]);

    const onChangePasswordCheck = useCallback((e) => {
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
    }, [password]);

    const onChangeTerm = useCallback((e) => {
        setTermError(false);
        setTerm(e.target.checked)
    }, []);

    if(me){
        return false;
    }
    
    return (
        <>
            <Form onSubmit={onSubmit} style={{padding : 10}}>
                <div>
                    <label htmlFor="user-id">아이디</label>
                    <br />
                    <Input name="user-id" value={id} required onChange={onChangeId}></Input>
                </div>
                <div>
                    <label htmlFor="user-nick">닉네임</label>
                    <br />
                    <Input name="user-nick" value={nickname} required onChange={onChangeNickname}></Input>
                </div>
                <div>
                    <label htmlFor="user-password">비밀번호</label>
                    <br />
                    <Input name="user-password" type="password" value={password} required onChange={onChangePassword}></Input>
                </div>
                <div>
                    <label htmlFor="user-password-chk">비밀번호체크</label>
                    <br />
                    <Input name="user-password-check" type="password" value={passwordCheck} required onChange={onChangePasswordCheck}></Input>
                    {passwordError && <div style={{ color : 'red' }}>비밀번호가 일치하지 않습니다.</div>}
                </div>
                <div>
                    <Checkbox name="user-term" value={term} onChange={onChangeTerm}>동의합니다.</Checkbox>
                    {termError && <div style={{ color : 'red' }}>약관에 동의하셔야 합니다.</div>}
                </div>
                <div style={{marginTop: 10}}>
                    <Button type="primary" htmlType="submit" loading={isSigningUp}>가입하기</Button>
                </div>
            </Form>
        </>
    );
};

export default Signup;