let cat= document.getElementById("cat");
let diff=document.getElementById("diff");
const nextBtn=document.getElementById("nextBtn");
let correct_count=0;
let incorrect_count=0;
let unattempted=0;
var category;
var questions=[];
let next_count=0;
const p=document.getElementById('p-js');
// p.innerHTML=`Correct Score:0<br/> Unattempted:0`

let category_obj={
    "film":11,
    "music":12,
    "computers":18
}
//action performed after clicking start
function submitForm(){
    category=cat.options[cat.selectedIndex].value;
    difficulty=diff.options[diff.selectedIndex].value;
    if(category!="computers"){
        url=`https://opentdb.com/api.php?amount=40&category=${category_obj[category]}&difficulty=${difficulty}&type=multiple`;
    }
    else{
        url=`https://opentdb.com/api.php?amount=40&category=${category_obj[category]}&difficulty=${difficulty}`;
    }
    document.getElementById("u-name").blur();
    document.getElementById("use-in").innerText=document.getElementById("u-name").value;
    document.getElementById("use-in").style.color="black";
    document.getElementById("use-in").style.fontWeight="600";
    // console.log(url);
    fetchdata();
    document.getElementById("intro").innerHTML = `<div id="quest-body">
            <h1>Simple Quiz</h1>
            <div class="q-con" id="con-q">
            <p id="q-no"></p>
            <p id="quest-js" ></p>
            </div>
        <div id="opt-body">
            <span class="opts" id="ops1" onclick="()=>{const radio = document.getElementById('opt-1-js');
                if (radio) {
                  radio.checked = true;
                }};">

            <input type="radio" name="options" id="opt-1-js" class="opt-css" value="">
            <label for="opt-1-js"></label><br>
            </span>
            
            <span class="opts" id="ops2" onclick="()=>{const radio = document.getElementById('opt-2-js');
                if (radio) {
                  radio.checked = true;
                }};">
            <input type="radio" name="options" id="opt-2-js" class="opt-css" value="">
            <label for="opt-2-js"></label><br>
            </span>
            <span class="opts" id="ops3" onclick="()=>{const radio = document.getElementById('opt-3-js');
                if (radio) {
                  radio.checked = true;
                }};">
            <input type="radio" name="options" id="opt-3-js" class="opt-css" value="">
            <label for="opt-3-js"></label><br>
            </span>
            <span class="opts" id="ops4" onclick="()=>{const radio = document.getElementById('opt-4-js');
                if (radio) {
                  radio.checked = true;
                }};">
            <input type="radio" name="options" id="opt-4-js" class="opt-css" value="">
            <label for="opt-4-js"></label><br>
            </span>
            <div id="nxt-sub"><input type="button" value="Next" id="nextBtn" onclick="validateAnswers();"></div>
        </div>
        </div>`
        document.getElementById("intro").style.paddingLeft="25px";
        // document.getElementById('con-q').parentNode.insertBefore(document.createElement('br'), document.getElementById('con-q').nextSibling);
        document.querySelector('h1').parentNode.insertBefore(document.createElement('hr'), document.querySelector('h1').nextSibling);
        document.getElementById("intro").style.height="530px";
        document.querySelector('h1').style.marginLeft="0";
        
}
async function fetchdata(){
    try{
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data);
        updateQuestions(data.results);
        
    }
    catch(err){

        console.log("An Error occured:\n",err);
    }
}

//add 10 random questions to "questions" array
function updateQuestions(objs){
    while(questions.length<=10){
        index=Math.floor(Math.random() * objs.length);
        if(!(objs[index] in questions)){
            questions.push(objs[index]);
        }
    }
    // console.log(questions.length);
    validateAnswers();
}

//change questions and options when clicked next button
function displayQuestions(questions1)
{
    shuffled_ans=shuffle(questions1[next_count].incorrect_answers.concat(questions1[next_count].correct_answer));
    mcq_question=[questions1[next_count].question].concat(shuffled_ans);
    // console.log(mcq_question);
    // console.log(questions1[next_count].correct_answer);
    q1=document.getElementById('quest-js');
    o1=document.getElementById('opt-1-js');
    ol1=document.querySelector("label[for='opt-1-js']");
    o2=document.getElementById('opt-2-js');
    ol2=document.querySelector("label[for='opt-2-js']");
    o3=document.getElementById("opt-3-js");
    ol3=document.querySelector("label[for='opt-3-js']");
    o4=document.getElementById("opt-4-js");
    ol4= document.querySelector("label[for='opt-4-js']");
    qno=document.getElementById("q-no");

    qno.innerText=next_count+".";
    q1.innerText=mcq_question[0];
    o1.value=mcq_question[1];
    ol1.innerText=mcq_question[1];
    o2.value=mcq_question[2];
    ol2.innerText=mcq_question[2];
    if(questions1[next_count].incorrect_answers.length == 1){
        o3.style.display="none";
        ol3.style.display="none";
        o4.style.display="none";
        ol4.style.display="none";
    }else{
        o3.style.display="inline";
        ol3.style.display="inline";
        o4.style.display="inline";
        ol4.style.display="inline";
    o3.value=mcq_question[3];
    ol3.innerText=mcq_question[3];
    o4.value=mcq_question[4];
    ol4.innerText=mcq_question[4];
    }
}

//shuffle options in the array
function shuffle(array){
    let curIndex=array.length;
    while(curIndex--){
        let randInd=Math.floor(Math.random()*array.length);
        let temp=array[curIndex]
        array[curIndex]=array[randInd]
        array[randInd]=temp;
    }
    return array;
}

//validate answers to display
function validateAnswers(){
    const ops1=document.querySelectorAll(".ops1");
    const  ops2=document.querySelectorAll(".ops2");
    const ops3=document.querySelector(".ops3");
    const ops4=document.querySelector(".ops4");
    const opt1=document.getElementById("opt-1-js");
    const opt2=document.getElementById("opt-2-js");
    const opt3=document.getElementById("opt-3-js");
    const opt4=document.getElementById("opt-4-js");
    if(opt1.checked){
        if(opt1.value===questions[next_count].correct_answer){
            correct_count+=1;
        }
    }
        else if(opt2.checked){
            if(opt2.value===questions[next_count].correct_answer){
                correct_count+=1;
            
            }
        }
        else if(opt3.checked){
            if(opt3.value==questions[next_count].correct_answer){
                correct_count+=1;
                
            
            }
        }
        else if(opt4.checked){
            if(opt4.value==questions[next_count].correct_answer){
                correct_count+=1;
                
            }
        }
    else{
        unattempted+=1;
    }
    next_count++;
    displayQuestions(questions);
    // console.log(correct_count);
    incorrect_count=10-correct_count;
    // p.innerHTML=`Correct Score:${correct_count}<br/> Unattempted:${unattempted}`
    document.querySelectorAll('input[type=radio]').forEach(el => el.checked = false);
    if(next_count==10){
        document.getElementById("nxt-sub").innerHTML=`<input type="button" value="Finish test" id="sub1" onclick="showScore();">`
    }
}
function showScore(){
    document.getElementById("quest-body").innerHTML=`<div id="quizres">
    <div class="progress-container">
    <div class="skill">
        <div class="outer">
            <div class="inner">
                <div id="num">
                    
                </div>
            </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="160px" height="160px">
            <defs>
            <linearGradient id="GradientColor">
                <stop offset="0%" stop-color="#3cb247"/>
                <stop offset="100%" stop-color="#3cb371"/>
            </linearGradient>
            </defs>
            <circle cx="80" cy="80" r="70" stroke-linecap="round" />
        </svg>
    </div>
    <div class="skill1">
        <div class="outer1">
            <div class="inner1">
                <div id="num1">
                    
                </div>
            </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="160px" height="160px" id="inc">
            <defs>
            <linearGradient id="GradientColor1">
                <stop offset="0%" stop-color="##ff0000"/>
                <stop offset="100%" stop-color="#ff1900"/>
            </linearGradient>
            </defs>
            <circle cx="80" cy="80" r="70" stroke-linecap="round" id="incor" />
        </svg>
    </div>
    </div>
        <table>
            <tr>
                <td>Correct</td>
                <td id="cor-c"></td>
            </tr>
            <tr>
                <td>Incorrect</td>
                <td id="inc-c"></td>
            </tr>
            <tr>
                <td>Unattempted</td>
                <td id="unat-c"></td>
            </tr>
        </table>
        <input type="button" value="Restart Quiz!" id="restart" onclick="location.reload()"/> 
    </div>`
    const numElement = document.getElementById("num");
    updateProgressBar(correct_count, "Correct", numElement, '--change');

    const num1Element = document.getElementById("num1");
    updateProgressBar(incorrect_count, "Incorrect", num1Element, '--ch1');
    document.getElementById("cor-c").innerHTML=correct_count;
    document.getElementById("inc-c").innerHTML=incorrect_count;
    document.getElementById("unat-c").innerHTML=unattempted;
}

document.getElementById("u-name").addEventListener("keydown",(e)=>{
    if(e.keyCode == 13) {
        document.getElementById("u-name").blur();
        document.getElementById("use-in").innerText=document.getElementById("u-name").value;
        document.getElementById("use-in").style.color="black";
        document.getElementById("use-in").style.fontWeight="600";
    }
})

function updateProgressBar(count, type, numElement, cssVariable) {
    const countPercentage = (count / 10) * 100;
    const barValue = 472 - (472 * (countPercentage / 100));
    let counter = 0;

    setInterval(() => {
        if (counter === countPercentage) {
            clearInterval();
        } else {
            counter += 1;
            numElement.innerHTML = `${type}:<br>${counter}%`;
        }
    }, 25);

    const rootElement = document.querySelector(':root');
    rootElement.style.setProperty(cssVariable, `${barValue}`);
}


