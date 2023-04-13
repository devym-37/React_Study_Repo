import React from "react";

const DUMMY_DATA = [
    {
        id: 1,
        title: "first data",
    },
    {
        id: 2,
        title: "second data",
    },
];

const StaticPage = (props: { data: { id: number; title: string }[] }) => {
    return (
        <>
            {props.data.map((data) => (
                <h1 key={data.id}>{data.title}</h1>
            ))}
        </>
    );
};

export async function getStaticProps() {
    return {
        props: {
            data: DUMMY_DATA,
        },
        // revalidate: 10,
    };
}

export default StaticPage;
