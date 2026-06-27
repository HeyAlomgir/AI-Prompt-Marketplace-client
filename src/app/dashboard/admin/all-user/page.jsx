"use client";

import { Avatar } from "@heroui/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";


export default function AdminAllUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // all user load funcation
    const loadUsers = () => {
        fetch("http://localhost:5000/api/admin/users")
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        loadUsers();
    }, []);


    const handleRoleChange = async (id, newRole) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/role/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role: newRole }),
            });
            const data = await response.json();

            if (data.modifiedCount > 0) {
                toast.success(`Role updated to ${newRole.toUpperCase()}!`);
                loadUsers();
            }
        } catch (error) {
            toast.error("Failed to update role");
        }
    };

    const handleDeleteUseer = async(id)=>{
        try{
            const res = await fetch(`http://localhost:5000/api/admin/users/${id}`,{
                method:"DELETE",
            })
            const data = await res.json();
            if(data.deletedCount>0){
                toast.success("user deletd successfully!");
                loadUsers();
            }
        }catch(error)
        {
            toast.error("Faild to delte user!")
        }
    }

    if (loading) {
        return <div className="text-center p-10 text-slate-400">Loading Users...</div>;
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-white tracking-wide">All Users</h1>
                <p className="text-sm text-slate-400">Platform user management list.</p>
            </div>

            <div className="overflow-x-auto bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 text-xs uppercase font-semibold">
                            <th className="p-4">User</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Current Role / Change</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-sm text-slate-200">
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-slate-800/20 transition-colors">
                                <td className="p-4 flex items-center space-x-3">
                                    <Avatar>
                                        <Avatar.Image
                                            alt="Blue"
                                            src={user.image}
                                        />
                                        <Avatar.Fallback>B</Avatar.Fallback>
                                    </Avatar>

                                    <span className="font-medium">{user.name || "Anonymous User"}</span>
                                </td>
                                <td className="p-4 text-slate-400">{user.email}</td>

                                {/*role dropdown*/}
                                <td className="p-4">
                                    <select
                                        value={user.role || "user"}
                                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                        className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-purple-500 transition-colors cursor-pointer uppercase font-semibold"
                                    >
                                        <option value="user">User</option>
                                        <option value="creator">Creator</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>

                                <td className="p-4 text-center">
                                    <button
                                    onClick={()=>handleDeleteUseer(user._id)}
                                    className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl transition-colors">
                                        <FaTrashAlt size={14} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}