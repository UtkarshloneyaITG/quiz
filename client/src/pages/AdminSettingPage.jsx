import React, { useState } from "react";
import { useAdminFunctions } from "../provider/AdminProvider";

function AdminSettingPage() {
  const { activeTab } = useAdminFunctions();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {activeTab === "settings" && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Settings</h2>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className=" inline-block  py-2 outline-none px-4 rounded ease-in cursor-pointer hover:bg-red-500 transition-all bg-indigo-500"
          >
            Delete Account
          </button>

          {isOpen && <div>hello</div>}
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
