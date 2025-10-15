import React, { createContext, useContext, useState, useEffect } from "react";
import { useAlert } from "../servics/ApiChanger";
import {
  deleteUserById,
  getAllUser,
  handleAddQuestion,
  fetchAllQuestions,
  deleteQuestionById,
} from "../servics/api";

const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  const { showAlert } = useAlert();
  // Current logged-in user
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  // Active tab in admin panel
  const [activeTab, setActiveTab] = useState("add-question");

  // States for Add Question
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState(["", "", "", ""]);

  // States for User Management
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", role: "user" });

  // set user type
  const [userType, setUserType] = useState("user");

  // loding state

  const [loding, setLoding] = useState(true);

  // Handle option input change
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };
  const questionData = {
    question,
    options,
    correctOption,
  };

  const example = () => {
    console.log(questionData);
    handleAddQuestion(questionData);
  };
  // Handle changing a user's role
  const handleRoleChange = (id, newRole) => {
    const updated = users.map((user) =>
      user.id === id ? { ...user, role: newRole } : user
    );
    setUsers(updated);
    showAlert("user Role Updated", "#E9D502");
  };

  // Handle adding a new user
  const handleAddUser = () => {
    if (!newUser.name.trim()) return;
    const id = users.length + 1; // simple ID assignment
    setUsers([...users, { id, ...newUser }]);
    setNewUser({ name: "", role: "user" });
  };

  // Load current user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setRole(parsedUser.role);
    }
  }, [role]);

  // Fetch all users from API on mount
  const handleUserType = (v) => {
    setUserType(v);
  };

  const fetchUsers = async () => {
    try {
      const data = await getAllUser(userType);
      console.log(data);
      setUsers(data.Users);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoding(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [userType]);

  const handleUserDelete = async (otherUserId, adminId) => {
    const { showAlert } = useAlert();
    if (otherUserId == adminId) {
      showAlert("your are not deleted yourshelf", "#CE2029");
      return;
    }

    const data = await deleteUserById(otherUserId);
    showAlert("user Deletion Successfull", "#CE2029");
    console.log(data.msg);
    showAlert(data.msg, "#E9D502");
    fetchUsers();
  };

  // State to store all questions
  const [questions, setQuestions] = useState([]);
  const fetchAllQuestionForDelete = async () => {
    setQuestions(await fetchAllQuestions());
  };
  // Delete a question by QuestionID (updated endpoint)
  // const deleteQuestionById = async (QuestionID) => {
  //   try {
  //     const res = await fetch(
  //       "http://localhost:3000/delete-question",
  //       {
  //         method: "DELETE",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ QuestionID }),
  //       }
  //     );
  //     const data = await res.json();
  //     alert(data.message);
  //     // Refresh question list
  //     fetchAllQuestions();
  //   } catch (error) {
  //     console.error("Failed to delete question:", error);
  //   }
  // };
  const delete_question = async (QuestionID) => {
    await deleteQuestionById(QuestionID);
    fetchAllQuestionForDelete();
  };

  return (
    <AdminContext.Provider
      value={{
        user,
        role,
        setUser,
        setRole,
        users,
        loding,
        setUsers,
        handleOptionChange,
        handleAddQuestion,
        handleRoleChange,
        handleAddUser,
        fetchAllQuestions,
        questions,
        deleteQuestionById,
        activeTab,
        setActiveTab,
        question,
        setQuestion,
        options,
        setOptions,
        correctOption,
        setCorrectOption,
        newUser,
        setNewUser,
        userType,
        handleUserType,
        handleUserDelete,
        example,
        fetchAllQuestionForDelete,
        delete_question,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminFunctions = () => useContext(AdminContext);
