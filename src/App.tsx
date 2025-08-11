import { useState } from "react";
import "./App.css"

interface User {
	id: number;
	name: string;
	email: string;
}

function App() {
	const [users, setUsers] = useState<User[]>([
		{ id: 1, name: "John Doe", email: "john@example.com" },
		{ id: 2, name: "Jane Smith", email: "jane@example.com" }
	]);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [editId, setEditId] = useState<number | null>(null);

	// Tambah user baru
	const handleAddUser = (e: React.FormEvent) => {
		e.preventDefault();
		if (!name || !email) return;

		if (editId !== null) {
			// Update user
			setUsers(users.map(user =>
				user.id === editId ? { ...user, name, email } : user
			));
			setEditId(null);
		} else {
			// Tambah user baru
			const newUser: User = {
				id: users.length + 1,
				name,
				email
			};
			setUsers([...users, newUser]);
		}

		setName("");
		setEmail("");
	};

	// Hapus user
	const handleDelete = (id: number) => {
		setUsers(users.filter(user => user.id !== id));
	};

	// Edit user
	const handleEdit = (user: User) => {
		setEditId(user.id);
		setName(user.name);
		setEmail(user.email);
	};

	return (
		<div className="min-h-screen bg-gray-100 p-6">
			<h1 className="text-3xl font-bold mb-4">User Management</h1>

			{/* Form Tambah / Edit User */}
			<form onSubmit={handleAddUser} className="mb-6 bg-white p-4 rounded-lg shadow-md">
				<h2 className="text-xl font-semibold mb-3">
					{editId !== null ? "Edit User" : "Add New User"}
				</h2>
				<div className="flex gap-4 mb-3">
					<input
						type="text"
						placeholder="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="border p-2 rounded w-1/3"
					/>
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="border p-2 rounded w-1/3"
					/>
					<button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
						{editId !== null ? "Update" : "Add"}
					</button>
				</div>
			</form>

			{/* Tabel User */}
			<table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
				<thead className="bg-gray-200">
				<tr>
					<th className="py-2 px-4 border">ID</th>
					<th className="py-2 px-4 border">Name</th>
					<th className="py-2 px-4 border">Email</th>
					<th className="py-2 px-4 border">Actions</th>
				</tr>
				</thead>
				<tbody>
				{users.map(user => (
					<tr key={user.id} className="text-center">
						<td className="py-2 px-4 border">{user.id}</td>
						<td className="py-2 px-4 border">{user.name}</td>
						<td className="py-2 px-4 border">{user.email}</td>
						<td className="py-2 px-4 border">
							<button
								onClick={() => handleEdit(user)}
								className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
							>
								Edit
							</button>
							<button
								onClick={() => handleDelete(user.id)}
								className="bg-red-500 text-white px-3 py-1 rounded"
							>
								Delete
							</button>
						</td>
					</tr>
				))}
				</tbody>
			</table>
		</div>
	);
}

export default App;
