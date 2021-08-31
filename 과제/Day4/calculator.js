function add(num){
    let inputNum = document.getElementById('resultBox');
    if(inputNum.value==0){inputNum.value='';}
    inputNum.value = inputNum.value+num;
}
function reset(){
    let inputNum = document.getElementById('resultBox');
    inputNum.value='0';
}
function cal(){
    let inputNum = document.getElementById('resultBox');
    if(isNaN(inputNum.value)){console.log('유효하지않은숫자');
    }else{
    let result = calculator(inputNum.value,tempNum1);
    inputNum.value = result;
    }
}
function calculator(num2, num1){
    if(tempOperator==='/'){
        tempNum1 = num1/num2;
        return num1/num2;
    }else if(tempOperator==='+'){
        tempNum1 = parseInt(num1)+parseInt(num2);
        return parseInt(num1)+parseInt(num2);
    }else if(tempOperator==='-'){
        tempNum1 = num1-num2;
        return num1-num2;
    }else{
        tempNum1 = num1*num2;
        return num1*num2;
    }
}
function addOper(operator){
    let inputNum = document.getElementById('resultBox');
    if(isNaN(inputNum.value)){console.log('유효하지않은숫자');
    return;
    }else{
    if(operator==='/'){
        tempOperator='/';
    }else if(operator==='*'){
        tempOperator='*';
    }else if(operator==='+'){
        tempOperator='+';
    }else{
        tempOperator='-';
    }
    tempNum1=inputNum.value;
    inputNum.value='0';
    }
}

var tempNum1;
var tempOperator