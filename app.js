//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput = document.querySelector(".add-to-list__new-task");
var addButton = document.querySelector(".add-to-list__button");
var incompleteTaskHolder=document.querySelector(".todo__list");//ul of #todo-tasks  +
var completedTasksHolder = document.querySelector(".done__list");//done-tasks


//New task list item
var createNewTaskElement = function(taskString){

  var listItem=document.createElement("li");
  listItem.classList.add("todo__item");

  //input (checkbox)
  var checkBox=document.createElement("input");//checkbx
//   checkBox.classList.add("todo__checkbox");

  //label
  var label=document.createElement("label");//label
//   label.classList.add("todo__task-name");

  //input (text)
  var editInput = document.createElement("input");//text
//   editInput.classList.add("todo__task-name-input");

  //button.edit
  var editButton = document.createElement("button");//edit button
//   editButton.classList.add("button todo__edit-");

  //button.delete
  var deleteButton = document.createElement("button");//delete button
  var deleteButtonImg = document.createElement("img");//delete button image
  deleteButtonImg.classList.add("todo__delete-img");

  label.innerText = taskString;
  label.className = "todo__task-name";

  //Each elements, needs appending
  checkBox.type = "checkbox";
  checkBox.className = 'input todo__checkbox';

  editInput.type = "text";
  editInput.className =
    'input todo__task-name-input todo__task-name-input_hidden';

  editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
  editButton.className = "button todo__edit-btn";

  deleteButton.className = "button todo__delete-btn";
  deleteButtonImg.src="./remove.svg";
  deleteButton.appendChild(deleteButtonImg);



  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}



var addTask=function(){
  console.log("Add Task...");
  //Create a new list item with the text from the #add-new-task:
  if (!taskInput.value) return;
  var listItem=createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value="";

}

//Edit an existing task.

var editTask=function(){
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");


  var listItem=this.parentNode;

  var editInput = listItem.querySelector(".todo__task-name-input");
  var label = listItem.querySelector(".todo__task-name");
  var editBtn = listItem.querySelector(".todo__edit-btn");
  var containsClass = listItem.classList.contains("todo__item_edit-mode");
  //If class of the parent is .edit-mode
  if(containsClass){

    //switch to .todo__item_edit-mode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    label.classList.remove("todo__task-name_hidden");
    editInput.classList.add("todo__task-name-input_hidden");
    editInput.classList.remove('todo__task-name-input_active');
    editBtn.innerText = "Edit";
  }else{
      editInput.value=label.innerText;
      label.classList.add("todo__task-name_hidden");
      editInput.classList.remove("todo__task-name-input_hidden");
      editInput.classList.add('todo__task-name-input_active');
      editBtn.innerText="Save";
  }

  //toggle .edit-mode on the parent.
  listItem.classList.toggle("todo__item_edit-mode");
};


//Delete task.
var deleteTask=function(){
  console.log("Delete Task...");

  var listItem=this.parentNode;
  var ul=listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
  console.log('Complete Task...');

  //Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
    console.log(this.parentNode);
    listItem.querySelector('.todo__checkbox').checked = true;
    listItem
      .querySelector('.todo__task-name')
      .classList.add('todo__task-name_crossed-out');
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}


var taskIncomplete=function(){
  console.log("Incomplete Task...");
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  var listItem=this.parentNode;
  console.log(this.parentNode);
  listItem.querySelector('.todo__checkbox').checked = false;
  listItem
    .querySelector('.todo__task-name_crossed-out')
    .classList.remove('todo__task-name_crossed-out');
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}



var ajaxRequest=function(){
  console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
  console.log("bind list item events");
  //select ListItems children
  var editButton = taskListItem.querySelectorAll('.todo__edit-btn');
  var checkBox = taskListItem.querySelector('.todo__checkbox');
  var deleteButton = taskListItem.querySelectorAll('.todo__delete-btn');


  //Bind editTask to edit button.
  editButton.forEach(function(editBtn){
    editBtn.addEventListener("click", editTask)
  });
  //Bind deleteTask to delete button.
  deleteButton.forEach(function(deleteBtn){
  deleteBtn.addEventListener("click", deleteTask)
  });
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.