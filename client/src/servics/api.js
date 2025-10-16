import axios from "axios";
const BASE_URL = "http://localhost:5000";

export const singup = async (obj) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/auth/user/register`, obj);
    const data = await res.data;
    return data;
  } catch (error) {
    // <Alert message={'SignUp Failed'} color="red" onClose={()=>{}}/>
    console.log("axiox error singup", error);
  }
};
export const login = async (email, password) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/auth/user/login`, {
      email: email,
      password: password,
    });

    const data = res.data;
    return data;
  } catch (error) {
    console.log("axiox error login", error);
  }
};

export const dashboard = async (email) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/auth/user/dashboard`, {
      email: email,
    });
    const data = res.data;
    return data;
  } catch (error) {
    {
      /* <Alert message={`axiox error dashboard, ${error.response.data}`} color="red" onClose={()=>{}}/>  */
    }
    console.log("axiox error dashboard", error.response.data);
  }
};

export const getAllUser = async (role) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/auth/user/Allusers`, {
      role,
    });
    const data = res.data;
    return data;
  } catch (error) {
    //  <Alert message={`axiox error getAllUser, ${error.response.data.msg}`} color="red" onClose={()=>{}}/>
    console.log("axiox error getAllUser", error.response.data.msg);
  }
};

export const deleteUserById = async (id) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/auth/user/delete`, {
      _id: id,
    });
    const data = res.data;
    return data;
  } catch (error) {
    // <Alert message={`axiox error getAllUser, ${error.response.data}`} color="red" onClose={()=>{}}/>
    console.log("axiox error getAllUser", error.response.data.msg);
  }
};

// Handle adding a new question
export const handleAddQuestion = (obj) => {
  console.log("==> end");
  const QUE_OBJ = {
    Question: obj.question,
    Answers: [
      { Answer: obj.options[0] },
      { Answer: obj.options[1] },
      { Answer: obj.options[2] },
      { Answer: obj.options[3] },
    ],
    CorrectAnswerID: obj.correctOption - 1,
  };
  const res = axios.post(`${BASE_URL}/question/post/new-question`, QUE_OBJ);
  console.log(res);

  console.log("Question Submitted:", QUE_OBJ);
};

// Fetch all questions from backend

export const fetchAllQuestions = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/question/all`); // your GET all questions API
    return res.data; // assuming data is an array of questions
  } catch (error) {
    console.error("Failed to fetch questions:", error);
  }
};

// delete question by id

export const deleteQuestionById = async (QuestionID) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/question/delete-question`,
      { QuestionID }, // request body
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = res.data;
  } catch (error) {
    console.error("Failed to delete question:", error);
  }
};

//  get user by it's unique id

export const getUserDetailsById = async (_id) => {
  try {
    console.log("userId", _id);

    const res = await axios.post(`${BASE_URL}/api/auth/user/userById`, {
      userId: _id,
    });
    const data = res.data;
    return data;
  } catch (error) {
    console.error("Failed to delete question:", error);
  }
};
// delete history by email

export const deleteByEmail = async (email) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/user/deleteHistory`, {
      email,
    });

    const data = res.data;
    return data;
  } catch (error) {
    console.error("Failed to delete question:", error);
  }
};

// add subjective question

export const addSubjectiveQustion = async (question) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/question/post/subjectiveQuestion`,
      {
        Question: question
      }
    );
    const data = res.data;

    return data;
  } catch (error) {
    console.log("axios error in adding subjective question", err);
  }
};

// delet a single history

export const deleteSingleHistory = async (email, historyIndex) => {
  try {
    const res = axios.post(`${BASE_URL}/api/user/deleteSingleHistory`, {
      email,
      historyIndex,
    });
    const data = res.data;
    return data;
  } catch (error) {
    console.log(`axios error by deleting single history`);
  }
};

// delete user account by email

export const deleteUserAccountByEmail = async (email) => {
  try {
    const res = axios.post(`${BASE_URL}/api/auth/user/delectAccByEmail`, {
      email,
    });
    const data = res.data;
    return data;
  } catch (error) {
    console.log(`axios error by deleting single history`);
  }
};
