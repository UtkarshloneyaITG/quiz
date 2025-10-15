import React from "react";
import { useAdminFunctions } from "../provider/AdminProvider";

function AdminSettingPage() {
  const { activeTab } = useAdminFunctions();

  return (
    <>
      {activeTab === "settings" && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Settings</h2>
          <p>
            Settings page content will go here (e.g. password reset, theme,
            etc.)
          </p>
        </div>
      )}
    </>
  );
}

export default AdminSettingPage;
