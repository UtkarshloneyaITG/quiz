import React from "react";
import { useAdminFunctions } from "../provider/AdminProvider";
import { memo } from "react";
import { Link } from "react-router-dom";
import Loading from "../sharedComponents/Loding";

function AdminMangeUser() {
  const {
    users,
    user,
    handleAddUser,
    activeTab,
    userType,
    handleUserType,
    handleUserDelete,
    loding,
  } = useAdminFunctions();

  return (
    <>
      {activeTab === "manage-users" && (
        <div className="min-h-screen p-6 text-white rounded-lg">
          <h2 className="text-2xl font-bold mb-6">User Management</h2>

          {/* Add New User */}
          <div className="mb-8">
            <h3 className="text-lg mb-3 font-semibold">Add Admin/User</h3>
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="text"
                placeholder="Name"
                value={user.fullName}
                className="p-2 bg-zinc-800 text-white border border-gray-600 rounded"
                readOnly
              />
              <select
                value={userType}
                onChange={(e) => handleUserType(e.target.value)}
                className="p-2 bg-zinc-800 text-white border border-gray-600 rounded"
              >
                <option className="text-black" value="user">
                  User
                </option>
                <option className="text-black" value="admin">
                  Admin
                </option>
              </select>
              <Link
                to={"/admin/dasbord/addentitys"}
                onClick={handleAddUser}
                className="bg-purple-600 px-4 py-2 rounded-md hover:bg-purple-800 transition-all text-white font-semibold"
              >
                Add {userType}
              </Link>
            </div>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-700">
            <table className="min-w-full text-left text-sm font-medium text-white">
              <thead className="bg-purple-700 text-white">
                <tr>
                  <th className="px-6 py-3  ">ID</th>
                  <th className="px-6 py-3 ">Name</th>
                  <th className="px-6 py-3 ">Role</th>
                  <th className="px-6 py-3 ">View</th>
                  <th className="px-6 py-3 text-center">Delete</th>
                </tr>
              </thead>
              <tbody className="bg-zinc-800 divide-y divide-gray-700">
                {loding ? (
                  <Loading />
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-400">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((v) => (
                    <tr
                      key={v._id}
                      className={`transition-all ${
                        v._id === user._id
                          ? "bg-green-800 font-semibold"
                          : "hover:bg-zinc-700"
                      }`}
                    >
                      <td className="px-6 py-3 break-words">{v._id}</td>
                      <td className="px-6 py-3">{v.fullName}</td>
                      <td className="px-6 py-3 capitalize">{v.role}</td>
                      <td className="px-6 py-3">
                        <Link
                          to={`/admin/dasbord/user-detail/${v._id}`}
                          className="text-purple-400 hover:underline"
                        >
                          View
                        </Link>
                      </td>
                      <td
                        onClick={() => handleUserDelete(v._id, user._id)}
                        className={`px-6 py-3 text-center cursor-pointer rounded-md transition-all duration-200 font-bold ${
                          v._id === user._id
                            ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                            : "bg-red-600 hover:bg-red-700 text-white"
                        }`}
                      >
                        Delete
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(AdminMangeUser);
