import { useRouter } from "next/router";
import Link from "next/link";

const Post = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <>
            <p>Post: {id}</p>
            <ul>
                <li>
                    <Link href={`/posts/${id}/first-comment`}>First comment</Link>
                </li>
                <li>
                    <Link
                        href={{
                            pathname: `/posts/${id}/second`,
                            query: { postDetail: "test" },
                        }}
                    >
                        Second comment
                    </Link>
                </li>
            </ul>
        </>
    );
};

export default Post;
