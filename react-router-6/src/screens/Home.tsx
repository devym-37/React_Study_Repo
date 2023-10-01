import { Link } from "react-router-dom";
import { users } from "../dummy";
import {
  UserStoreType,
  usePersonState,
  userStore,
} from "../store/zustandStore";

const Home = () => {
  const userCount = userStore((state: UserStoreType) => state.userCount);

  const firstName = usePersonState((state) => state.firstName);
  const updateFirstName = usePersonState((state) => state.updateFirstName);

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
      <input
        onChange={(e) => updateFirstName(e.target.value)}
        value={firstName}
      />
    </div>
  );
};

export default Home;
