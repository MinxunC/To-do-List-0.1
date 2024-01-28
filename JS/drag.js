const draggables = document.querySelectorAll(".draggable");
const containers = ducument.querySelectorAll(".container");

draggables.forEach(draggable => {
  draggable.addEventListener("dragstart",(event)=>{
    draggable.classList.add("dragging")
  }
  )
})