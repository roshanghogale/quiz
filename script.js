import {
  questions,
  pythons,
  htmlQuestions,
  cssQuestions,
  jsQuestions,
  cQuestions,
  cSharpQuestions,
  javaQuestions,
  cppQuestions,
} from "./questions.js";

const overlay = document.getElementById("overlay");
const question = document.getElementById("question");
const title = document.getElementById("title");
const python = document.getElementById("python");
const previos = document.getElementById("previos");
const submit = document.getElementById("submit");
const toggel = document.getElementById("toggel");

const next = document.getElementById("next");
const options = document.getElementById("options");
const originalAnswer = document.getElementById("correctAnswer");
const body = document.getElementById("body");
const usersAnswer = document.getElementById("userAnswer");
const nav = document.getElementById("nav");
const header = document.getElementById("header");
let index = 0;
let questionsSet = questions;

window.onload = function () {
  const allQuestions = [
    ...questions,
    ...pythons,
    ...htmlQuestions,
    ...cssQuestions,
    ...jsQuestions,
    ...cQuestions,
    ...cSharpQuestions,
    ...javaQuestions,
    ...cppQuestions,
  ];

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  shuffleArray(allQuestions);

  console.log(allQuestions.length);
  questionsSet = allQuestions;
  loadQuestion(index, questionsSet);
};

function loadQuestion(index, questionsSet) {
  options.innerHTML = "";
  question.innerText = questionsSet[index].question;

  questionsSet[index].options.forEach((option, optionIndex) => {
    let listItem = document.createElement("li");

    let input = document.createElement("input");
    input.type = "radio";
    input.name = "answer";
    input.value = option;
    input.id = `option${optionIndex}`;

    let label = document.createElement("label");
    label.innerText = option;
    label.setAttribute("for", `option${optionIndex}`);

    listItem.appendChild(input);
    listItem.appendChild(label);

    options.appendChild(listItem);

    listItem.addEventListener("click", function () {
      if (!input.checked) {
        input.checked = !input.checked;
      }
    });

    originalAnswer.innerHTML = "";
    usersAnswer.innerHTML = "";
  });
}

submit.addEventListener("click", () => {
  if (body.classList.contains("correct")) {
    body.classList.remove("correct");
  } else if (body.classList.contains("wrong")) {
    body.classList.remove("wrong");
  }

  if (
    originalAnswer.classList.contains("answercorrect") ||
    usersAnswer.classList.contains("answercorrect")
  ) {
    originalAnswer.classList.remove("answercorrect");
    usersAnswer.classList.remove("answercorrect");
  } else if (
    originalAnswer.classList.contains("answerwrong") ||
    usersAnswer.classList.contains("answerwrong")
  ) {
    originalAnswer.classList.remove("answerwrong");
    usersAnswer.classList.remove("answerwrong");
  }

  let selectedOption = document.querySelector("input[name='answer']:checked");
  let correctAnswer = questionsSet[index].correctAnswer;

  if (selectedOption) {
    if (selectedOption.value === correctAnswer) {
      originalAnswer.innerText = `The Correct answer is: ${correctAnswer}`;
      usersAnswer.innerText = "You are Correct";
      body.classList.add("correct");
      originalAnswer.classList.add("answercorrect");
      usersAnswer.classList.add("answercorrect");
    } else {
      originalAnswer.innerText = `The Correct answer is: ${correctAnswer}`;
      usersAnswer.innerText = "You are Wrong";
      body.classList.add("wrong");
      originalAnswer.classList.add("answerwrong");
      usersAnswer.classList.add("answerwrong");
    }
  } else {
    originalAnswer.innerHTML = "Please select an option.";
    usersAnswer.innerHTML = "";
  }
});

previos.addEventListener("click", () => {
  if (index != 0) {
    index--;
    loadQuestion(index, questionsSet);
    if (body.classList.contains("correct")) {
      body.classList.remove("correct");
    } else if (body.classList.contains("wrong")) {
      body.classList.remove("wrong");
    }
  }
});

next.addEventListener("click", () => {
  console.log("next");
  index++;
  if (index < questionsSet.length) {
    loadQuestion(index, questionsSet);
    if (body.classList.contains("correct")) {
      body.classList.remove("correct");
    } else if (body.classList.contains("wrong")) {
      body.classList.remove("wrong");
    }
  } else {
    index = questionsSet.length - 1;
  }
});

function updateButtonContent() {
  const prevButton = document.getElementById("previos");
  const nextButton = document.getElementById("next");

  if (window.innerWidth < 700) {
    prevButton.innerHTML = '<i class="fas fa-angle-left"></i>';
    nextButton.innerHTML = '<i class="fas fa-angle-right"></i>';
  } else {
    prevButton.innerHTML = "<i class='fas fa-angle-left'></i> Previous";
    nextButton.innerHTML = "Next <i class='fas fa-angle-right'></i>";
    if (nav.classList.contains("list")) {
      nav.classList.remove("list");
      header.classList.remove("header");
      overlay.classList.remove("list");
    }
  }
}

updateButtonContent();

window.addEventListener("resize", updateButtonContent);

toggel.addEventListener("click", () => {
  if (nav.classList.contains("list")) {
    nav.classList.remove("list");
    header.classList.remove("header");
    overlay.classList.remove("list");
  } else {
    nav.classList.add("list");
    header.classList.add("header");
    overlay.classList.add("list");
  }
});

document.querySelectorAll(".navOptions").forEach((button) => {
  button.addEventListener("click", function () {
    let buttonId = this.getAttribute("id");
    switch (buttonId) {
      case "python":
        title.innerText = "Python";
        questionsSet = pythons;
        break;

      case "C":
        title.innerText = "C";
        questionsSet = cQuestions;
        break;

      case "csharpe":
        title.innerText = "C#";
        questionsSet = cSharpQuestions;
        break;

      case "cpp":
        title.innerText = "C++";
        questionsSet = cppQuestions;
        break;

      case "java":
        title.innerText = "Java";
        questionsSet = javaQuestions;
        break;

      case "javascript":
        title.innerText = "Java Script";
        questionsSet = jsQuestions;
        break;

      case "css":
        title.innerText = "CSS";
        questionsSet = cssQuestions;
        break;

      case "html":
        title.innerText = "HTML";
        questionsSet = htmlQuestions;
        break;

      default:
        title.innerText = "Random";
        questionsSet = questions;
        break;
    }

    if (nav.classList.contains("list")) {
      nav.classList.remove("list");
      header.classList.remove("header");
      overlay.classList.remove("list");
    }
    index = 0;
    loadQuestion(index, questionsSet);
  });
});
