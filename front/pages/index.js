import Link from 'next/link';

const Home = () => {
    return (
        <>
            <Link href="./user/create"><a>create</a></Link>
            <div>Hello, Next!</div>
        </>
    );
};

export default Home;
