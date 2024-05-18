const joke=document.getElementById("content")
const btn=document.getElementById("btn");
const url="https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single";
// const url="https://backend-omega-seven.vercel.app/api/getjoke";

let jokes=()=>{
    fetch(url)
    .then(data=>data.json())
    .then(item=>{
        joke.textContent=`${item.joke}`;
    });
    // .then(item=>console.log(item))
}
btn.addEventListener("click",jokes);