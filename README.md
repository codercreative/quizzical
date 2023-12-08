## Quizzical Game

![screenshot](/public/assets/quizzical.png)
![screenshot](/public/assets/requirements.png)

### Project overview

This is a React web application trivia game. It is the final solo project as part of Scrimba's Front End Developer course.

### Overview of steps

- Consult Figma design files
- Create files/components
- Main CSS styles
- Import Google Font - Karla and Inter
- Figure out how to click on button and get a brand new page
- Import OTDB API with fetch and React.useEffect()
- React.useState()
- Display 5 questions with possible answers
- Make sure the correct answer is shuffled among the incorrect answers
- Decode HTML entities with https://cdnjs.com/libraries/he
- Highlight the user's guessed answer in blue
- Display results: The correct and incorrect answers in green and pink, respectively
- Display how many answers are correct
- Display a play again button
- Add yellow and blue "blobs" to the background

### Resources:

Building a simple Quiz App:
https://medium.com/geekculture/building-a-simple-quiz-app-using-a-rest-api-react-and-redux-5c8a85a9447f

Shuffling an Array in JavaScript:
https://medium.com/@apestruy/shuffling-an-array-in-javascript-8fcbc5ff12c7#:~:text=So%20when%20%E2%80%9CMath.,sort%20the%20elements%20being%20compared.

### Example of console.log from Trivia API

{response_code: 0, results: [{category: "Entertainment: Music", type: "multiple", difficulty: "medium", question: "Who is the artist of the recent new album the Uncanny Valley?", correct_answer: "Perturbator", incorrect_answers: ["Carpenter Brut", "GOST", "Dan Terminus "]}, {category: "Entertainment: Books", type: "multiple", difficulty: "easy", question: "Which famous book is sub-titled &#039;The Modern Prometheus&#039;?", correct_answer: "Frankenstein", incorrect_answers: ["Dracula", "The Strange Case of Dr. Jekyll and Mr. Hyde ", "The Legend of Sleepy Hollow"]}, {category: "Geography", type: "multiple", difficulty: "medium", question: "In which English county is Stonehenge?", correct_answer: "Wiltshire", incorrect_answers: ["Somerset", "Cumbria", "Herefordshire"]}, {category: "Entertainment: Music", type: "multiple", difficulty: "medium", question: "Which one of these Pink Floyd albums were also a movie?", correct_answer: "The Wall", incorrect_answers: ["The Dark Side of the Moon", "Wish You Were Here", "Animals"]}, {category: "Entertainment: Video Games", type: "multiple", difficulty: "easy", question: "In &quot;Pheonix Wright: Ace Attorney&quot; which character is the District Chief of Police?", correct_answer: "Damon Gant", incorrect_answers: ["Miles Edgeworth", "Lana Skye", "Mike Meekins"]}]}
