// event listeners/main functionality
function eventListeners() {
  const showBtn = document.getElementById("show-btn");
  const questionCard = document.querySelector(".question-card");
  const closeBtn = document.querySelector(".close-btn");
  const form = document.getElementById("question-form");
  const feedback = document.querySelector(".feedback");
  const questionInput = document.getElementById("question-input");
  const answerInput = document.getElementById("answer-input");
  const questionList = document.getElementById("questions-list");
  let data = [];
  let id = 1;

  // new UI instance
  const ui = new UI();

  // show add question form (add question)
  showBtn.addEventListener("click", function() {
    ui.showQuestion(questionCard);
  });

  // hide add question form (add question)
  closeBtn.addEventListener("click", function() {
    ui.hideQuestion(questionCard);
  });

  // add question
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    const questionValue = questionInput.value;
    const answerValue = answerInput.value;

    if (!questionValue || !answerValue) {
      feedback.classList.add("showItem", "alert-danger");
      feedback.textContent = "cannot add empty values";

      setTimeout(function() {
        feedback.classList.remove("showItem", "alert-danger");
      }, 2000);
    } else {
      question = new Question(id, questionValue, answerValue);
      data.push(question);
      id++;
      ui.clearFields(questionInput, answerInput);
    }
  });

};

// ui constructor
function UI() {

};

// show add question form
UI.prototype.showQuestion = function(element) {
  element.classList.add("showItem");
};

// hide add question form
UI.prototype.hideQuestion = function(element) {
  element.classList.remove("showItem");
};

// clear fields
UI.prototype.clearFields = function(questionInput, answerInput) {
  questionInput.value = "";
  answerInput.value = "";
};


// question constructor
function Question(id, title, answer) {
  this.id = id;
  this.title = title;
  this.answer = answer;
};

// DOM event listener
document.addEventListener("DOMContentLoaded", function() {
  eventListeners();
});
