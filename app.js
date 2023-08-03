console.log("HOŞGELDİNİZ !");

//TÜM ELEMENTLERİ SEÇMEK 
const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch");

console.log(firstCardBody);
let todos = [];

runEvents();

function runEvents() {
    form.addEventListener("submit", addToDo);
    document.addEventListener("DOMContentLoaded",pageLoaded);
    secondCardBody.addEventListener("click",removeTodoToUI);
    clearButton.addEventListener("click",allTodosEverywhere);
    filterInput.addEventListener("keyup",filter);
}

function allTodosEverywhere() {
    const todoListesi = document.querySelectorAll(".list-group-item");
    if(todoListesi.length>0){
        //ekrandan silme
        todoListesi.forEach(function(todo){
            todo.remove();
        });

        //storageden silme 
        todos=[];
        localStorage.setItem("todos",JSON.stringify(todos));
        showAlert("success","başarılı bir şekilde silindi");
    }else{
        showAlert("warning","Silmek için en az bir todo olmalıdır.! ");
    }
}

function filter(e) {
    const filterValue = e.target.value.toLowerCase().trim();
    const todoListesi = document.querySelectorAll(".list-group-item")
    if(todoListesi.length>0){
        todoListesi.forEach(function(todo){
            if(todo.textContent.toLowerCase().trim().includes(filterValue)){
                //
                todo.setAttribute("style","display : block");
                console.log("2");
            }else{
                todo.setAttribute("style","display : none !important");
            }
        });
    }else{
        showAlert("warning","filtereleme yapmak için todo olmalıdır ! ")
    }
    
}

function removeTodoToUI(e) {
    console.log(e.target);
    if(e.target.className==="fa fa-remove"){
        //ekrandan silme
        // console.log(">>",e.target);
        // console.log("çarpıya basmıştır..");
        const todo = e.target.parentElement.parentElement;
        todo.remove();

        //storage den silme 
        removeTodoToStorage(todo.textContent);
        showAlert("success","Todo başarıyla silindi");
        // let silme = todo.remove();
        // console.log(silme);
    
}}

function removeTodoToStorage(removeTodo) {
    checkTodosFromStorage();
    todos.forEach(function (todo,index) {
        if(removeTodo===todo){
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}

function pageLoaded() {
    checkTodosFromStorage();
    todos.forEach(function (todo) {
        console.log(todo);
        addTodoUI(todo);
    });
}

function addToDo(e) {
    const inputText = addInput.value.trim();
    if (inputText == null || inputText == "") {
        // alert("Lütfen Bir Değer Giriniz.")
        showAlert("warning","Boş bırakmayınız :!");
    } else {
        //arayüze ekleme
        addTodoUI(inputText);
        addToDoStorage(inputText);
        showAlert("success","to do eklendi :!");
    }
    //storage ekleme
    //

    e.preventDefault();

}

function addTodoUI(newTodo) {
    /*
    <li class="list-group-item d-flex justify-content-between">Todo 1
        <a href="#" class="delete-item">
            <i class="fa fa-remove"></i>
        </a>
    </li>
    */
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between"
    li.textContent = newTodo;

    const a = document.createElement("a");
    a.href = "#";
    a.className = "delete-item";

    const i = document.createElement("i");
    i.className = "fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    addInput.value = "";

}

function addToDoStorage(newTodo) {
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function checkTodosFromStorage() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}
// console.log(localStorage.getItem( ));

function showAlert(type, message) {
    // <div class="alert alert-warning" role="alert">
    //     This is a warning alert—check it out!
    // </div>
    const div = document.createElement("div");
    // div.className="alert  alert-"+type;
    div.className=`alert alert-${type}`; // literal template
    div.textContent = message;

    firstCardBody.appendChild(div);
    // console.log(type,"- MESS-",message);

    setTimeout(function () {
        div.remove();
    },2500);
}
// ECMASCRİPT
// const array = [1,2,3,4,5]
// function hello() {
//     for (var i = 0; i < array.length; i++) {
//       array[i]
//     }
//     console.log(i) // Artan i değeri burada erişilebilir.
//   }
//   function world() {
//     for (let i = 0; i < array.length; i++) {
//       array[i]
//     }
//     console.log(i) // Artan i değeri burada let kullanımından dolayı erişilemez.
//   }

//   hello();
//   world();

//   var liste = [10, 100, 250, 30, 1, 45];
//   liste.sort(function(a, b){return a - b});
//   alert(liste);
