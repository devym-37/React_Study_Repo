import React from "react";
import { useGetUsersQuery } from "./usersApiSlice";
import { Link } from "react-router-dom";

const UsersList = () => {
    const { data: users, isLoading, isSuccess, isError, error } = useGetUsersQuery(undefined);

    if (isLoading) {
        return <p>"Loading..."</p>;
    }

    if (isError) {
        return <p>{JSON.stringify(error)}</p>;
    }

    if (isSuccess) {
        return (
            <section className='users'>
                <h1>Users List</h1>
                <ul>
                    {users.map((user, i) => {
                        return <li key={i}>{user.username}</li>;
                    })}
                </ul>
                <Link to='/welcome'>Back to Welcome</Link>
            </section>
        );
    }

    return null;
};

export default UsersList;
