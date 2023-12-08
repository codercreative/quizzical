import React from "react";
import he from "he";

export default function Quiz() {
  //useState hooks:
  //An array to store trivia questions and answers feteched from the API
  const [trivia, setTrivia] = React.useState([]);
  //An array to store the user's answers to the questions
  const [userAnswers, setUserAnswers] = React.useState([]);
  //A boolean variable to track whether the user has checked their answers
  const [result, setResult] = React.useState(false);
  //A 2D array used to manage the background color of answer choices
  const [answerStates, setAnswerStates] = React.useState(
    Array(5)
      .fill([])
      .map(() => Array(5).fill("white"))
  );

  const [loading, setLoading] = React.useState(true);

  // UseEffect hook fetching trivia questions from the opentdb.com API
  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) => {
        const triviaWithShuffledAnswers = data.results.map((question) => ({
          ...question,
          answers: shuffleAnswers(
            question.incorrect_answers,
            question.correct_answer
          ),
        }));
        setTrivia(triviaWithShuffledAnswers);
        setLoading(false);
      });
  }, []);

  //Function to shuffle correct and incorrect answers to provide randomized answer choices
  function shuffleAnswers(incorrect, correct) {
    const allAnswers = [...incorrect, correct];
    return allAnswers.sort(() => Math.random() - 0.5);
  }

  //Updates answerStates to change the background color of selected answer to blue and it adds the user's response to the userAnswer's array
  function handleAnswerClick(
    answer,
    question,
    correctAnswer,
    questionIndex,
    answerIndex
  ) {
    const userResponse = {
      question,
      selectedAnswer: answer,
      correctAnswer,
    };

    // console.log(answer, correctAnswer, question)
    if (!result) {
      const newAnswerStates = answerStates.map((item, i) =>
        i === questionIndex
          ? item.map((_, selection) =>
              selection === answerIndex ? "blue" : "white"
            )
          : item
      );
      setAnswerStates(newAnswerStates);
      setUserAnswers([...userAnswers, userResponse]);
    }
  }

  // Checks the user's answers and updates answerStates accordingly
  // It sets the background color to "green" for correct answers and "pink" for incorrect answers
  function checkAnswers() {
    const newAnswerStates = answerStates.map((item, index) =>
      item.map((state, answerIndex) => {
        const userResponse = userAnswers[index];
        const isCorrect =
          userResponse && userResponse.correctAnswer === item[answerIndex];
        const isSelected = state === "blue";

        if (isCorrect) {
          return "green";
        } else if (isSelected) {
          return "pink";
        } else {
          return "white";
        }
      })
    );

    setAnswerStates(newAnswerStates);
    setResult(true);

    trivia.forEach((item, index) => {
      const correctAnswerIndex = item.answers.indexOf(item.correct_answer);
      newAnswerStates[index][correctAnswerIndex] = "green";
    });
  }

  //Fetches new trivia questions so I can include in resetQuiz function
  function fetchTriviaQuestions() {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) => {
        const triviaWithShuffledAnswers = data.results.map((question) => ({
          ...question,
          answers: shuffleAnswers(
            question.incorrect_answers,
            question.correct_answer
          ),
        }));
        setTrivia(triviaWithShuffledAnswers);
      });
  }

  //Resets the quiz by clearing userAnswers, resetting the result, and fetching new trivia questions
  function resetQuiz() {
    setUserAnswers([]);
    setResult(false);
    setAnswerStates(
      Array(5)
        .fill([])
        .map(() => Array(5).fill("white"))
    );
    fetchTriviaQuestions();
  }

  //Calculates the user's score by filtering userAnswers to find where the selected answers matches the correct answer and then counting the length of the filtered array
  const score = userAnswers.filter(
    (ua) => ua.correctAnswer === ua.selectedAnswer
  ).length;

  // Display questions and answers
  return (
    <div className="quiz-container">
      <img
        src="./assets/yellow-blob.png"
        alt="top right yellow blob"
        className=" blob yellow-blob"
      />
      <img
        src="./assets/blue-blob.png"
        alt="bottom left blue blob"
        className="blob blue-blob"
      />
      {loading ? (
        <h1 className="quiz-title">Loading...</h1>
      ) : (
        <>
          <h1 className="quiz-title">
            {result ? "Quiz Answers" : "Quiz Questions"}
          </h1>
          {trivia.map((item, index) => (
            <div key={index}>
              <h3>{he.decode(item.question)}</h3>
              <ul className="answer-container">
                {item.answers.map((answer, answerIndex) => {
                  const isUserSelected = userAnswers.find(
                    (ua) =>
                      ua.question === item.question &&
                      ua.selectedAnswer === answer
                  );
                  return (
                    <li
                      key={answerIndex}
                      className={`answer ${answerStates[index][answerIndex]}`}
                      onClick={() =>
                        handleAnswerClick(
                          answer,
                          item.question,
                          item.correct_answer,
                          index,
                          answerIndex
                        )
                      }
                    >
                      {he.decode(answer)}
                    </li>
                  );
                })}
              </ul>
              <div className="divider"></div>
            </div>
          ))}
          {result ? (
            <div className="score-container">
              <p className="score-tally">
                You scored {score} / 5 correct answers
              </p>
              <button className="cta-btn" onClick={resetQuiz}>
                Play again
              </button>
            </div>
          ) : (
            <button className="cta-btn" onClick={checkAnswers}>
              Check answers
            </button>
          )}
        </>
      )}
    </div>
  );
}
