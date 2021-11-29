const resultEl=document.getElementById('result');
const lengthEl=document.getElementById('length');
const upperEl=document.getElementById('uppercase');
const lowerEl=document.getElementById('lowercase');
const numberEl=document.getElementById('number');
const symbolEl=document.getElementById('symbol');
const generateEl=document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomfunc={
upper:getRandomUpper,
lower:getRandomLower,
number:getRandomNumber,
symbol:getRandomSymbol
};

generateEl.addEventListener('click', () => {
let length=+lengthEl.value;  
let hasupper=upperEl.checked;
let haslower=lowerEl.checked;
let hasnumber=numberEl.checked;
let hassymbol=symbolEl.checked;
resultEl.innerText=generatePassword(hasupper,haslower,hasnumber,hassymbol,length); // it generate password as per checked

});

function generatePassword(upper,lower,number,symbol,length){
   let generatedpw= '';
   const typesCount=upper+lower+number+symbol; 

let typesArray=[{upper},{lower},{number},{symbol}].filter(  
 item=>Object.values(item)[0]
); 

if(typesCount === 0) {
  return '';
}

for(let i=0; i<length; i+=typesCount) {
  typesArray.forEach(typ => {
     const funcName = Object.keys(typ)[0];
     console.log("functin name :",i, funcName);

     generatedpw += randomfunc[funcName]();
     console.log(generatedpw);
  });
}

const finalPassword = generatedpw.slice(0, length);
return finalPassword;

}

  clipboardEl.addEventListener('click',() => {
     const textarea=document.createElement('textarea');
     const psw=resultEl.innerText;
 
     if(!psw){
        return;
     }

     textarea.value=psw;
     document.body.appendChild(textarea);
     textarea.select();
     document.execCommand('copy');
     document.body.removeChild(textarea);
     alert("Password Copied to Clipboard");

  });


function getRandomUpper(){
 return String.fromCharCode( Math.floor(Math.random()*26)+ 65);  
}

function getRandomLower(){
return String.fromCharCode( Math.floor(Math.random()*26)+ 97);  
}

function getRandomNumber(){
return String.fromCharCode( Math.floor(Math.random()*10)+ 48);  
}

function getRandomSymbol(){
const symbols="!@#$%^&*()<>?/{}.,'" 
return symbols[Math.floor(Math.random()*symbols.length)];

}

