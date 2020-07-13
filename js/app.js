


// even listeners
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

// question constructor
function Question() {

};

// DOM event listener
document.addEventListener("DOMContentLoaded", function() {
  eventListeners();

});
