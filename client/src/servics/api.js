import axios from "axios";
const BASE_URL = "http://localhost:3000";

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

export const getUserDetailsById = async (_id) => {
  try {

    console.log("userId", _id)

    const res = await axios.post(
      `${BASE_URL}/api/auth/user/userById`,
      { userId : _id });
    const data = res.data;
    return data
  } catch(error){
    console.error("Failed to delete question:", error);
}
};