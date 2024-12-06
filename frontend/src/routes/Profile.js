import React, { useState } from "react";

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 123 456 7890",
        address: "123 Energy Street, Solar City",
    });

    const [formData, setFormData] = useState({ ...user });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = (e) => {
        e.preventDefault();
        setUser({ ...formData });
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-green-600 text-white py-4 shadow-md">
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Voltkon Energy Trading</h1>
                    <nav className="flex space-x-4">
                        <a href="/dashboard" className="hover:underline">Dashboard</a>
                        <a href="/trades" className="hover:underline">Trades</a>
                        <a href="/logout" className="hover:underline">Logout</a>
                    </nav>
                </div>
            </header>
            <main className="container mx-auto px-4 py-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Profile</h2>
                    {isEditing ? (
                        <form onSubmit={handleSave}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                    rows="3"
                                    required
                                ></textarea>
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={handleEditToggle}
                                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div>
                            <div className="mb-4">
                                <p className="text-sm text-gray-600">Name</p>
                                <p className="text-lg font-medium">{user.name}</p>
                            </div>
                            <div className="mb-4">
                                <p className="text-sm text-gray-600">Email</p>
                                <p className="text-lg font-medium">{user.email}</p>
                            </div>
                            <div className="mb-4">
                                <p className="text-sm text-gray-600">Phone</p>
                                <p className="text-lg font-medium">{user.phone}</p>
                            </div>
                            <div className="mb-4">
                                <p className="text-sm text-gray-600">Address</p>
                                <p className="text-lg font-medium">{user.address}</p>
                            </div>
                            <button
                                onClick={handleEditToggle}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                            >
                                Edit Profile
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Profile;
