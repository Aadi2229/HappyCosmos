let content=document.getElementById("content");
let author=document.getElementById("author");
let btn=document.getElementById("btn");
const url="https://api.quotable.io/random";
let generate=()=>{
    fetch(url)
    .then((data)=>data.json())
    .then((item)=>{
        content.innerText=item.content;
        author.innerText=item.author;
    });
};
btn.addEventListener("click",generate);