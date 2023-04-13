import { GetServerSidePropsContext } from "next";

const DUMMY_DATA = [
    {
        id: 1,
        title: "SSR first data",
    },
    {
        id: 2,
        title: "SSR second data",
    },
];

const SSRTest = (props: { data: { id: number; title: string }[] }) => {
    return (
        <>
            {props.data.map((data) => (
                <h1 key={data.id}>{data.title}</h1>
            ))}
        </>
    );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const req = context.req;
    const res = context.res;

    return {
        props: {
            data: DUMMY_DATA,
        },
    };
}

export default SSRTest;
