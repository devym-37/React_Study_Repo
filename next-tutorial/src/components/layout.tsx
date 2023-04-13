interface Props {
    children: React.ReactElement;
}

export default function Layout({ children }: Props) {
    return (
        <>
            <main>{children}</main>
        </>
    );
}
