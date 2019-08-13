import Link from 'next/link';
import Head from 'next/head';
import AppLayout from '../component/AppLayout';

const Home = () => {
    return (
        <>
            <Head>
                <title>NsWorld</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.21.4/antd.css"></link>
            </Head>
            <AppLayout>
                <Link href="./user/create"><a>create</a></Link>
                <div>Hello, Next!</div>
            </AppLayout>
        </>
    );
};

export default Home;
