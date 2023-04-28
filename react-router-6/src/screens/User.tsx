import { Link, Outlet, useParams } from "react-router-dom";
import { users } from "../dummy";
import Followers from "./Followers";

const User = () => {
    const { userId } = useParams();

    return (
        <div>
            <h1>
                User Id : {userId} name : {users[Number(userId) - 1].name}
            </h1>
            <hr />
            <Link to='followers'>See Followers</Link>
            <Outlet />
        </div>
    );
};

export default User;
