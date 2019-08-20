import React from 'react';
import Head from 'next/head';
import AppLayout from '../component/AppLayout';

const _app = ({ Component }) => {
    return (
        <>
            <Head>
                <title>NsWorld</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.21.4/antd.css"></link>
            </Head>  
            <AppLayout>
                <Component />
            </AppLayout>
        </>
    );
};

export default _app;