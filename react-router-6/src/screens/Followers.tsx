import { useOutletContext } from "react-router-dom";

interface FollowersContext {
    name: string;
}

const Followers = () => {
    const { name } = useOutletContext<FollowersContext>();
    return <h1>name : {name}</h1>;
};

export default Followers;
