import React from 'react';
import Head from 'next/head';
import AppLayout from '../component/AppLayout';

const Profile = () => {
    
    return (
        <>
            <Head>
                <title>NsWorld</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.21.4/antd.css"></link>
            </Head>
            <AppLayout>
                <div>
                    프로필
                </div>
            </AppLayout>
        </>
    );
};

export default Profile;