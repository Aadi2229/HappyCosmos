const boxes=document.querySelectorAll(".box");
let info=document.querySelector(".game-info");
const btn=document.querySelector(".btn");

let curr;
let grid;
const winpos=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function init(){
    curr="X";
    grid=["","","","","","","","",""];
    boxes.forEach(function(box,index)
    {
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        box.classList=`box box${index+1}`;
    });
    btn.classList.remove("active");
    info.innerText=`Current Player - ${curr}`;
}
init();
function swapplayer(){
    if(curr==="X")
    {
        curr="0";
    }
    else curr="X"
    info.innerText=`Current Player - ${curr}`;
}
function checkresult(){
    let winner="";
     winpos.forEach(function(position){
        if((grid[position[0]]!=="" || grid[position[2]]!=="" || grid[position[2]]!=="" )
        &&(grid[position[0]]===grid[position[1]]) && (grid[position[1]] === grid[position[2]])){
            if(grid[position[0]]==="X")
            {
                winner="X";
            }
            else
            {
                winner="0";
            }
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
            info.innerText=`Winner Player - ${winner}`;
            btn.classList.add("active");
            return;
        }
     });
     let cnt=0;
     grid.forEach(function(box)
     {
        if(box!=="")cnt++;
     });
     if(cnt==9)
     {
        info.innerText=`Match Tied`;
        btn.classList.add("active");
        return;
     }

};
function handle(index){
    if(grid[index]==="")
    {
        boxes[index].innerText=curr;
        grid[index]=curr;
        boxes[index].style.pointerEvents="none";
        swapplayer();
        checkresult();
    }
};
boxes.forEach(function(box,index)
{
    box.addEventListener("click",function(){
        handle(index);
    })
});
btn.addEventListener("click",init);