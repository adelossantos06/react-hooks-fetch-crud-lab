import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";


function QuestionList() {

  const [questionData, setQuestionData] = useState([])



  useEffect(() => {
    fetch('http://localhost:4000/questions')

      .then((r) => r.json())
      .then((data) => setQuestionData(data))
  }, [])

  function handleDelete(id) {

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then(response => {
        if (response) {
          const newQuestionData = questionData.filter(question => question.id !== id);
          setQuestionData(newQuestionData);
          console.log("element deleted")
        } else {
          console.log("error")
        }
      })
      .catch(error => {
        console.log("error deleting", error)
      })


  }


  const questionItems = questionData.map((question) => <QuestionItem key={question.id} question={question} handleDelete={handleDelete} />)

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
