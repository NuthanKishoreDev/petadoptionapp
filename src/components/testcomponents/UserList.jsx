import { useState, useEffect } from 'react';

// Named export (correct)
export function UserList() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    })
      .then(res => res.json())
      .then(newUser => {
        setUsers([...users, newUser]);
        setName('');
        setEmail('');
      });
  };

  const handleDelete = (id) => {
    fetch(`/api/users/${id}`, { method: 'DELETE' })
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
      });
  };

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>Add New User</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

// Alternative: Default export (also works)
// export default UserList;