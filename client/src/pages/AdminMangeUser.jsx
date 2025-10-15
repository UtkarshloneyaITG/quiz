import React from "react";
import { useAdminFunctions } from "../provider/AdminProvider";

import { memo } from "react";
import { Link } from "react-router-dom";

function AdminMangeUser() {
  const {
    users,
    user,
    handleAddUser,
    activeTab,
    userType,
    handleUserType,
    handleUserDelete,
  } = useAdminFunctions();

  //console.log(users.length);

  return (
    <>
      {" "}
      {activeTab === "manage-users" && (
        <div>
          <h2 className="text-2xl font-bold mb-4">User Management</h2>

          {/* Add New User */}
          <div className="mb-6">
            <h3 className="text-lg mb-2">Admin</h3>
            <input
              type="text"
              placeholder="Name"
              value={user.fullName}
              className="p-2 mr-2 text-white"
            />
            <select
              value={userType}
              onChange={(e) => handleUserType(e.target.value)}
              className="p-2 text-white"
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
              className="ml-2 bg-purple-600 px-4 py-2 rounded hover:bg-purple-800"
            >
              Add {userType}
            </Link>
          </div>

          {/* Users Table */}
          <table className="w-full text-left border-collapse border border-white ">
            <thead>
              <tr>
                <th className="border border-white px-4 py-2">ID</th>
                <th className="border border-white px-4 py-2">Name</th>
                <th className="border border-white px-4 py-2">Role</th>
                <th className="border border-white px-4 py-2">View</th>
              </tr>
            </thead>
            <tbody>
              {users.length == 0 ? (
                <tr>
                  <th className="border border-white px-4 py-2">--</th>
                  <th className="border border-white px-4 py-2">--</th>
                  <th className="border border-white px-4 py-2">--</th>
                  <th className="border border-white px-4 py-2">--</th>
                </tr>
              ) : (
                users.map((v) => (
                  <tr
                    className={`${v._id == user._id ? "bg-green-500" : ""}`}
                    key={v.id}
                  >
                    <td className="border border-white px-4 py-2">{v._id}</td>
                    <td className="border border-white px-4 py-2">
                      {v.fullName}
                    </td>
                    <td className="border border-white px-4 py-2">{v.role}</td>
                    <td className="border border-white px-4 py-2">
                      <Link to={`/admin/dasbord/user-detail/${v._id}`}>
                        view
                      </Link>
                    </td>
                    <td
                      onClick={() => handleUserDelete(v._id, user._id)}
                      className={` ${
                        v._id == user._id
                          ? "cursor-not-allowed  bg-green-900 hover:bg-green-500 "
                          : "cursor-pointer bg-purple-900 hover:bg-red-600"
                      }   border  text-center  font-bold  border-white px-4 py-2`}
                    >
                      Delete
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default memo(AdminMangeUser);
