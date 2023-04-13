import { useRouter } from "next/router";

export default function PostDetailPage() {
    const router = useRouter();
    const id = router.query.id as string;
    const postDetail = router.query.postDetail as string;

    return (
        <>
            <h1>Post: {id}</h1>
            <h1>postDetail: {postDetail}</h1>
        </>
    );
}
