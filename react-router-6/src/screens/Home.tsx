import { Link } from "react-router-dom";
import { users } from "../dummy";
import { UserStoreType, userStore } from "../store/zustandStore";

const Home = () => {
  const userCount = userStore((state: UserStoreType) => state.userCount);
  console.log("userCount", userCount);
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
