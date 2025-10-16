import React from "react";
import { useAdminFunctions } from "../provider/AdminProvider";
import { useMyFunctions } from "../provider/MyAuthProvider";
import { useTranslation } from "react-i18next";

function AdminSidebar() {
  const { t } = useTranslation();
  const { activeTab, setActiveTab } = useAdminFunctions();
  const { userName } = useMyFunctions();

  const navItems = [
    { id: "add-question", label: t("Question") },
    { id: "manage-users", label: t("Manage Users") },
    { id: "settings", label: t("Settings") },
  ];

  return (
    <aside className="h-full w-64 bg-[#241a42] p-4 shadow-lg flex flex-col">
      {/* User Profile */}
      <div className="flex items-center mb-10">
        <div className="uppercase font-bold text-2xl bg-purple-500 text-white h-12 w-12 flex items-center justify-center rounded-full">
          {userName?.[0] || "U"}
        </div>
        <div className="capitalize text-white ml-4 text-xl font-semibold truncate">
          {userName || "Unknown"}
        </div>
      </div>

      {/* Navigation Buttons */}
      <nav className="flex flex-col gap-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`text-white text-lg py-2 px-4 rounded transition duration-300 text-left ${
              activeTab === item.id
                ? "bg-purple-700 shadow-inner"
                : "hover:bg-purple-600"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default AdminSidebar;
