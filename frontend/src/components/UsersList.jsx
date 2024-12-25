import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsersList = () => {
    const[users, setUsers] = useState([]);

    // Fetch users
    useEffect(() => {
        axios.get('http://localhost:8080/api/users').then((response) => {
            setUsers(response.data); // Set users from the resposne
        }).catch((error) => {
            console.error("Error at fetching users!", error);
        })
    }, []);

    return (
    <div>
        <h1>Users List</h1>
        <ul>
            {users.length === 0 ? (
                <li>No users</li>
            ) : (
                users.map((user) => (
                    <li key={user.id}>{user.username}</li>
                ))    
            )}
        </ul>

    </div>
  )
}

export default UsersList;