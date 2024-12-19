import React, { useState, useEffect } from 'react';

function App() {
    const [User, setUser] = useState([]);

    const getUser = () => {
        fetch('http://localhost:3005/utilisateur')
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(error => console.error('Error fetching data:', error));
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div>
            <h1>User List</h1>
            {User.map((user, index) => (
                <div key={index}>
                    {JSON.stringify(user)}
                </div>
            ))}
        </div>
    );
}

export default App;
