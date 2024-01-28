import { motivationQuotes } from "./motivation.js";

document.querySelector("#refreshBtn").addEventListener("click",function(){
  const length = motivationQuotes.length;
  const randomNumber = Math.floor(Math.random() * length);
  const quote = motivationQuotes[randomNumber];
  document.querySelector("#quotes").innerHTML = quote;
})