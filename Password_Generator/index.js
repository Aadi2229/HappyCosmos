const inputSlider=document.querySelector('.slider');
const length=document.querySelector('.count');
const passwordDisplay=document.querySelector('.display');
const copyBtn=document.querySelector('.copy-btn');
const copyMsg=document.querySelector('.data-copyMsg');
const uppercaseCheck=document.querySelector('#uppercase');
const lowercaseCheck=document.querySelector('#lowercase');
const numberCheck=document.querySelector('#numbers');
const symbolCheck=document.querySelector('#symbol');
const indicator=document.querySelector('.data-indicator');
const generateBtn=document.querySelector('.generatepass');
const allCheckBox=document.querySelectorAll("input[type=checkbox]");
const symbols="~!@#$%^&*()_+-={}[];',.<>:?/";

let password="";
let passwordLength=10;
uppercaseCheck.checked=true;
let checkCount=1;
setIndicator("#ccc");
handleSlider();
function handleSlider(){
    inputSlider.value=passwordLength;
    length.innerText=passwordLength;
    const mini=inputSlider.min;
    const maxi=inputSlider.max;
    inputSlider.style.backgroundSize=((passwordLength-mini)*100/(maxi-mini) + "% 100%")
}
function setIndicator(color){
    indicator.style.backgroundColor=color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}
function getRandomInteger(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}
function generateRandomNumber(){
    return getRandomInteger(0,9)
}
function generateLowerCase(){
    return String.fromCharCode(getRandomInteger(97,123));
}
function generateUpperCase(){
    return String.fromCharCode(getRandomInteger(65,91));
}
function generateSymbol(){
    const random=getRandomInteger(0,symbols.length);
    return symbols.charAt(random);
}
 

function calcStrength()
{
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSym=false;
    if(uppercaseCheck.checked)hasUpper=true;
    if(lowercaseCheck.checked)hasLower=true;
    if(numberCheck.checked)hasNum=true;
    if(symbolCheck.checked)hasSym=true;
    if(hasUpper && hasLower && hasSym && hasNum && passwordLength>=8)
    {
        setIndicator("#0f0");
    }
    else if((hasLower || hasUpper) && (hasSym || hasNum) && passwordLength>=6)
    {
        setIndicator("#ff0");
    }
    else
    {
        setIndicator("#00f");
    }
}

async function copyContent()
{
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText='Copied';
    }
    catch(e){
        copyMsg.innerText='Copy Failed';
    }

    //make span visible
    copyMsg.classList.add("active");
    setTimeout(function(){
        copyMsg.classList.remove("active");
    },2000);
}
function shuffle(array){
    for(let i=array.length-1;i>0;i--)
    {
        const j=Math.floor(Math.random()*(i+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let s="";
    array.forEach((el)=>(s+=el));
    return s;
}
function handleCheckBoxChange(){
    password="";
    checkCount=0;
    allCheckBox.forEach(function(checkbox){
        if(checkbox.checked)checkCount++;
    });
    if(passwordLength<checkCount)
    {
        passwordLength=checkCount;
        handleSlider();
    }
}
allCheckBox.forEach(function(checkbox){
    checkbox.addEventListener('change',handleCheckBoxChange);
})

inputSlider.addEventListener('input',function(e){
    passwordLength=e.target.value;
    handleSlider();
});
copyBtn.addEventListener('click',function(){
    if(passwordDisplay.value)copyContent(); 

});



function generatepassword(){
    if(checkCount==0)return;
    if(checkCount>passwordLength){
        passwordLength=checkCount;
        handleSlider();
    }
    password="";
    let funcArr=[];
    if(uppercaseCheck.checked)
    {
        funcArr.push(generateUpperCase);
    }
    if(lowercaseCheck.checked)
    {
        funcArr.push(generateLowerCase);
    }
    if(numberCheck.checked)
    {
        funcArr.push(generateRandomNumber);
    }
    if(symbolCheck.checked)
    {
        funcArr.push(generateSymbol);
    }
    for(let i=0;i<funcArr.length;i++)
    {
        password+=funcArr[i]();
    }
    for(let i=0;i<passwordLength-funcArr.length;i++)
    {
        let randIdx=getRandomInteger(0,funcArr.length);
        password+=funcArr[randIdx]();
    }

    //shuffle
    password=shuffle(Array.from(password));

    passwordDisplay.value=password;
    calcStrength();
};
generateBtn.addEventListener('click',generatepassword);
