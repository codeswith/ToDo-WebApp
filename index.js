let todoRootEl = document.getElementById("todoRoot");
let todoInputEl = document.getElementById("todoInput");



function gettodofromLocalstorage(){
  let gettodoList = localStorage.getItem("mytodoList");


  if(gettodoList === null){

    return[];

  }
  else{

    let parseTodo = JSON.parse(gettodoList);
        return parseTodo;
  }
} 

let todoList = gettodofromLocalstorage();




function onStatusUpdate(titleId, checkboxId) {

  let mytitle = document.getElementById(titleId);
  let mycheckbox = document.getElementById(checkboxId);

  let findTodoid = checkboxId[checkboxId.length-1];

 for(each of todoList){

  if(each.id == findTodoid){

    if(each.isChecked === false){

        each.isChecked =true;

    }
    else{

      each.isChecked = false;
    
    }
  }
 }  


  if (mycheckbox.checked === true) {
    mytitle.classList.add("checked");
  }
  else {
    mytitle.classList.remove("checked");
  }
}


function ondeleteTodo(todoId) {

let idToDelete = parseInt(todoId[todoId.length - 1]); 

  todoList = todoList.filter(
    (todo) => todo.id !== idToDelete); 

localStorage.setItem("mytodoList", JSON.stringify(todoList));

  let myTodo = document.getElementById(todoId);
  todoRootEl.removeChild(myTodo);
}



function createAndappendTodo(todo){

  let checkboxId = "mycheckbox" + todo.id;
  let titleId = "title" + todo.id;
  let todoId = "todo" + todo.id;


  let listitemEl = document.createElement("li");
  listitemEl.classList.add("todo-list-item");
  listitemEl.id = todoId;
  todoRootEl.appendChild(listitemEl);


  let checkBoxEl = document.createElement("input");
  checkBoxEl.type = "checkbox";
  checkBoxEl.id = checkboxId;

  checkBoxEl.onclick = function(){
      onStatusUpdate(titleId, checkboxId);
  }

  if(todo.isChecked === true){
    checkBoxEl.checked = true;
  }

  listitemEl.appendChild(checkBoxEl);


  let labelEl = document.createElement("label");
  labelEl.classList.add("label-cont");
  labelEl.htmlFor = checkboxId;
  listitemEl.appendChild(labelEl);


  let titleEl = document.createElement("h5");
  titleEl.textContent = todo.title;
  titleEl.id = titleId;

  if (todo.isChecked === true) {
    titleEl.classList.add("checked");
  }

  labelEl.appendChild(titleEl);


  let deletebtnEl = document.createElement("button");
  deletebtnEl.classList.add("deletebtn");
  labelEl.appendChild(deletebtnEl);
  deletebtnEl.onclick = function(){
    ondeleteTodo(todoId);
  }


  let deleteEl = document.createElement("i");
  deleteEl.classList.add("fa-solid","fa-trash");
  deletebtnEl.appendChild(deleteEl);
  

}



for(each of todoList){

  createAndappendTodo(each);

}

function onAddnewtodo(){

  const newtodo= {
    title: todoInputEl.value,
    id: todoList.length +1,
    isChecked: false
  }
  
  createAndappendTodo(newtodo);

  todoList.push(newtodo);
  todoInputEl.value ="";

}

function onSavetodo(){

  let stringifyTodo = JSON.stringify(todoList);
  localStorage.setItem("mytodoList", stringifyTodo);

}
