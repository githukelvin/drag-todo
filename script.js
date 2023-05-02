const draggable = document.querySelectorAll(".draggable");
const conatiner = document.querySelectorAll(".container");


draggable.forEach((draggable,index)=>{
    draggable.addEventListener("dragstart",()=>{
       draggable.classList.add("dragging")
    })
    draggable.addEventListener("dragend",()=>{
        draggable.classList.remove("dragging")
    })
})

conatiner.forEach((container)=>{
    container.addEventListener("dragover", (e) => {
      e.preventDefault();
      const afterElement = getDragAfterElement(container,e.clientY)
      const draggable = document.querySelector(".dragging");
      if(afterElement ==null){
        container.appendChild(draggable);
      } 
      else{
        container.insertBefore(draggable ,afterElement)
      }
      
      
    });
})


function getDragAfterElement(container ,y){
   const draggableElements =[...container.querySelectorAll(".draggable:not(.dragging)")]
 return   draggableElements.reduce((closest,child)=>{
       const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height /2
       if(offset < 0 && offset >closest.offset){
        return{offset:offset, element:child}

       }
       else{
        return closest
       }
    },{offset : Number.NEGATIVE_INFINITY}).element
}

const input = document.querySelector("input");
const btn = document.querySelector("button");
const ul = document.querySelector("ul");
const tick = document.querySelector(".tick");
const list = document.querySelector("li");




btn.addEventListener("click",(e)=>{
    e.preventDefault();
    const li = document.createElement("li")
    if(!input.value == " "){
        li.textContent = input.value;
            const tic = document.createElement("div");
            tic.classList.add("tick");
            li.appendChild(tic);
            ul.appendChild(li);
    }
    else{
       alert("Sorry i am unable to create an empty TODO task");
    }
    


    input.value="";

})



function check(e){
   const item =e.target;
     if(item.classList.contains("tick")){
         let list = item.parentElement;
         list.classList.toggle("completed");
     }
}

ul.addEventListener("click",check)
// test  1c
// function test1(){
//     const listItems = document.querySelectorAll("li");
//     // let completed = [];
//     listItems.forEach((inde) => {
//       const info = inde.textContent;
//       if (inde.classList.contains("completed")) {
//         completed.push({ item: info, isCompleted: true });
//       } else {
//         completed.push({ item: info, isCompleted: false });
//       }
//     });

//     console.log(completed);

//     localStorage.setItem("todo", JSON.stringify(completed));
// }


// c
function saveLocal() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const listItems = document.querySelectorAll("li");
  listItems.forEach((inde) => {
    const info = inde.textContent;
    let isCompleted = false;
    if (inde.classList.contains("completed")) {
      isCompleted = true;
    }
    // check if element already exists in todos array
    const existingItemIndex = todos.findIndex((item) => item.item === info);

    if (existingItemIndex === -1) {
      todos.push({ item: info, isCompleted: isCompleted });
    } else {
      // if element exists, update isCompleted value
      todos[existingItemIndex].isCompleted = isCompleted;
    }

    // check if element already exists in UI
    const existingListItem = document.querySelector(`li`);
    if (!existingListItem) {
      // add the element to the UI
      let listItem;
      if (isCompleted) {
        listItem = `<li class="completed">${info}<div class="tick"></div></li>`;
      } else {
        listItem = `<li>${info}<div class="tick"></div></li>`;
      }
      ul.innerHTML += listItem;
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

setInterval(saveLocal, 1000);

function getData() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(({ isCompleted, item }) => {
    let listItem;
    if (isCompleted) {
      listItem = `<li class="completed">${item}<div class="tick"></div></li>`;
    } else {
      listItem = `<li>${item}<div class="tick"></div></li>`;
    }
    ul.innerHTML += listItem;
  });
}

document.addEventListener("DOMContentLoaded", getData);