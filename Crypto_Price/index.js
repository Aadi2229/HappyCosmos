
// const url="";
const result = document.getElementById("ans");
const btn = document.getElementById("btn");
let solve = () => {
    let inpWord=document.getElementById("name").value;
fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${inpWord}&vs_currencies=usd`)
        .then((resp) => resp.json())
        .then((data) => {
        //    let anss= ${data[inpWord].usd};
           result.innerHTML=`${data[inpWord].usd}`;
        // const myJSON = JSON.stringify(data);
        console.log(data[inpWord].usd);
        

        });}
btn.addEventListener("click",solve);        
