import React from "react";
import { useAdminFunctions } from "../provider/AdminProvider";
import { useMyFunctions } from "../provider/MyAuthProvider";
import { useTranslation } from "react-i18next";

function AdminSidebar() {
  const { t } = useTranslation();
  const { activeTab, setActiveTab } = useAdminFunctions();
  const { userName } = useMyFunctions();
  return (
    <aside className="h-full w-64 bg-[#241a42] p-4">
      <div className="profile flex items-center mb-10">
        <div className="user-box uppercase font-bold text-2xl bg-purple-400 text-white h-12 w-12 flex items-center justify-center rounded-full">
          {userName[0]}
        </div>
        <div className="admin-name capitalize text-white ml-4 text-xl font-semibold">
          {userName}
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <button
          onClick={() => setActiveTab("add-question")}
          className={`${
            activeTab == "add-question"
              ? "bg-purple-700"
              : activeTab == "all-questions"
              ? "bg-purple-700"
              : ""
          } text-white text-lg py-2 hover:bg-purple-700 rounded  cursor-pointer transition duration-300`}
        >
          {t("Question")}
        </button>
        <button
          onClick={() => setActiveTab("manage-users")}
          className={`${
            activeTab == "manage-users" ? "bg-purple-700" : ""
          } text-white text-lg py-2 hover:bg-purple-700 rounded  cursor-pointer transition duration-300`}
        >
          {t("Manage Users")}
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`${
            activeTab == "settings" ? "bg-purple-700" : ""
          } text-white text-lg py-2 hover:bg-purple-700 rounded  cursor-pointer transition duration-300`}
        >
          {t("Settings")}
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;
