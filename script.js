const question = document.getElementById("question");
const options = document.getElementById("options");
const originalAnswer = document.getElementById("correctAnswer");
const body = document.getElementById("body");
const usersAnswer = document.getElementById("userAnswer");
let index = 0;

window.onload = function () {
  loadQuestion(index);
};

function loadQuestion(index) {
  options.innerHTML = "";
  question.innerHTML = questions[index].question;

  questions[index].options.forEach((option, optionIndex) => {
    let listItem = document.createElement("li");

    let input = document.createElement("input");
    input.type = "radio";
    input.name = "answer";
    input.value = option;
    input.id = `option${optionIndex}`;

    let label = document.createElement("label");
    label.innerHTML = option;
    label.setAttribute("for", `option${optionIndex}`);

    label.addEventListener("click", function () {
      input.checked = !input.checked;
    });

    listItem.appendChild(input);
    listItem.appendChild(label);

    options.appendChild(listItem);

    originalAnswer.innerHTML = "";
    usersAnswer.innerHTML = "";
  });
}

function submit() {
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
  let correctAnswer = questions[index].correctAnswer;

  if (selectedOption) {
    if (selectedOption.value === correctAnswer) {
      originalAnswer.innerHTML = `The Correct answer is: ${correctAnswer}`;
      usersAnswer.innerHTML = "You are Correct";
      body.classList.add("correct");
      originalAnswer.classList.add("answercorrect");
      usersAnswer.classList.add("answercorrect");
    } else {
      originalAnswer.innerHTML = `The Correct answer is: ${correctAnswer}`;
      usersAnswer.innerHTML = "You are Wrong";
      body.classList.add("wrong");
      originalAnswer.classList.add("answerwrong");
      usersAnswer.classList.add("answerwrong");
    }
  } else {
    originalAnswer.innerHTML = "Please select an option.";
    usersAnswer.innerHTML = "";
  }
}

function prevQuestion() {
  if (index != 0) {
    index--;
    loadQuestion(index);
    if (body.classList.contains("correct")) {
      body.classList.remove("correct");
    } else if (body.classList.contains("wrong")) {
      body.classList.remove("wrong");
    }
  }
}

function nextQuestion() {
  index++;
  if (index < questions.length) {
    loadQuestion(index);
    if (body.classList.contains("correct")) {
      body.classList.remove("correct");
    } else if (body.classList.contains("wrong")) {
      body.classList.remove("wrong");
    }
  }
}
