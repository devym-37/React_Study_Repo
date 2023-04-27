import { useParams } from "react-router-dom";
import { users } from "../dummy";

const User = () => {
    const { userId } = useParams();

    return (
        <h1>
            User Id : {userId} name : {users[Number(userId) - 1].name}
        </h1>
    );
};

export default User;
