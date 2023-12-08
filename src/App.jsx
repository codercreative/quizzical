import React from "react";
import Quiz from "./components/Quiz.jsx";

export default function App() {
  const [quizzicalGame, setQuizzicalGame] = React.useState(false);

  return (
    <main>
      {quizzicalGame ? (
        <Quiz />
      ) : (
        <>
          <img
            src="./assets/yellow-blob.png"
            alt=""
            className="blob yellow-blob"
          />
          <img src="./assets/blue-blob.png" alt="" className="blob blue-blob" />
          <h1>Quizzical</h1>
          <p className="subtitle">Test your knowledge across diverse topics</p>
          <button className="cta-btn" onClick={() => setQuizzicalGame(true)}>
            Start quiz
          </button>
        </>
      )}
    </main>
  );
}
