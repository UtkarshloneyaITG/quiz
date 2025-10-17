import React from "react";
import { useAdminFunctions } from "../provider/AdminProvider";
<<<<<<< HEAD
import {TabButtons} from "../pages/TabButtons";
=======

>>>>>>> b48b3b4813b57b1e7887c8d0f59462d455d81ead
import { QuestionsList } from "./Questionlist";
import { AddQuestionForm } from "./AddQuestionForm";
import { TabButtons } from "./TabButtons";

export default function AdminAddQues() {
  const {
    activeTab,
    setActiveTab,
    question,
    setQuestion,
    options,
    setOptions,
    correctOption,
    setCorrectOption,
    handleOptionChange,
    example,
    questions,
    delete_question,
    fetchAllQuestionForDelete,
  } = useAdminFunctions();

  return (
    <div>
      {(activeTab === "add-question" || activeTab === "all-questions") && (
        <TabButtons
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          fetchAllQuestionForDelete={fetchAllQuestionForDelete}
        />
      )}

      {activeTab === "add-question" && (
        <AddQuestionForm
          question={question}
          setQuestion={setQuestion}
          options={options}
          setOptions={setOptions}
          correctOption={correctOption}
          setCorrectOption={setCorrectOption}
          handleOptionChange={handleOptionChange}
          example={example}
        />
      )}

      {activeTab === "all-questions" && (
        <QuestionsList
          questions={questions}
          delete_question={delete_question}
        />
      )}
    </div>
  );
}
