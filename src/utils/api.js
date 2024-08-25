const getSolvedQuestions = async () => {
  const response = await fetch("http://localhost:7081/solved-questions", {
    method: "GET",
  });
  const solvedQuestions = await response.json();

  return solvedQuestions;
};

const addSolvedQuestion = async (body) => {
  const response = await fetch("http://localhost:7081/solved-question", {
    method: "POST",
    body: JSON.stringify(body),
  });
  const addedQuestion = response.json();

  return addedQuestion;
};

const updateSolvedQuestion = (id, body) => {
  const response = fetch(`http://localhost:7081/solved-question/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
  const updatedQuestion = response.json();

  return updatedQuestion;
};

const getSolvedQuestionsById = async (id) => {
  const response = fetch(`http://localhost:7081/solved-questions/${id}`, {
    method: "GET",
  });
  const solvedQuestion = response.json();

  return solvedQuestion;
};

export {
  getSolvedQuestions,
  addSolvedQuestion,
  updateSolvedQuestion,
  getSolvedQuestionsById,
};
