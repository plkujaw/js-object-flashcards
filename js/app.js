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
      ui.addQuestion(questionList, question);
      ui.clearFields(questionInput, answerInput);
    }
  });

  // edit/delete questions
  questionList.addEventListener("click", function(event) {
    event.preventDefault();

    // delete question
    if (event.target.classList.contains("delete-flashcard")) {
      let id = event.target.dataset.id;
      questionList.removeChild(event.target.parentElement.parentElement.parentElement);
      // rest of the questions
      let remainingQuestions = data.filter(function(item) {
        return item.id !== parseInt(id);
      });
      data = remainingQuestions;

    // show/hide answer
    } else if (event.target.classList.contains("show-answer")) {
      event.target.nextElementSibling.classList.toggle("showItem");

    // edit question
    } else if (event.target.classList.contains("edit-flashcard")) {
      let id = event.target.dataset.id;
      // remove question from the DOM
      questionList.removeChild(event.target.parentElement.parentElement.parentElement);
      // show the question card
      ui.showQuestion(questionCard);
      // find the question by id
      const editedQuestion = data.filter(function(item) {
        return item.id === parseInt(id);
      });
      // rest of the questions
      let remainingQuestions = data.filter(function(item) {
        return item.id !== parseInt(id);
      });
      data = remainingQuestions;
      questionInput.value = editedQuestion[0].title;
      answerInput.value = editedQuestion[0].answer;
    }
  });
};

// ui constructor
function UI() {};

// show add question form
UI.prototype.showQuestion = function(element) {
  element.classList.add("showItem");
};

// hide add question form
UI.prototype.hideQuestion = function(element) {
  element.classList.remove("showItem");
};

// add question to ui
UI.prototype.addQuestion = function(element, question) {
  const div = document.createElement("div");
  div.classList.add("col-md-4");
  div.innerHTML = `<div class="card card-body flashcard my-3">
   <h4 class="text-capitalize">${question.title}</h4>
   <a href="#" class="text-capitalize my-3 show-answer">show/hide answer</a>
   <h5 class="answer mb-3">${question.answer}</h5>
   <div class="flashcard-btn d-flex justify-content-between">
    <a href="#" id="edit-flashcard" class=" btn my-1 edit-flashcard text-uppercase" data-id="${question.id}">edit</a>
    <a href="#" id="delete-flashcard" class=" btn my-1 delete-flashcard text-uppercase" data-id="${question.id}">delete</a>
   </div>
 </div>`;
  element.appendChild(div);
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

// DOM event listener / load the app on load
document.addEventListener("DOMContentLoaded", function() {
  eventListeners();
});
