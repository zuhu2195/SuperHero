let superImgDiv = document.querySelector('#super-img-div');
let superInfoDiv = document.querySelector('#super-info-div');
let nextBtn = document.querySelector('#next-btn');
let prevBtn = document.querySelector('#prev-btn');
let removeBtn = document.querySelector('#remove-btn');
let curIndex;
let curObj;

let fSuper = JSON.parse(localStorage.getItem('fSuper'));

// console.log(fSuper);
if(fSuper.fList.length>0){
curIndex=0;
curObj = fSuper.fList[0];
displaySuper(fSuper.fList[0]);
}

nextBtn.addEventListener("click",()=>{
    let fSuper = JSON.parse(localStorage.getItem('fSuper'));
    curIndex++;
    if(curIndex<fSuper.fList.length){
        displaySuper(fSuper.fList[curIndex]);
        curObj = fSuper.fList[curIndex];
    }else if(curIndex>=fSuper.fList.length){
        curIndex=fSuper.fList.length-1;
    }
    else if(curIndex<0){
        curIndex = 0;
    }
})

prevBtn.addEventListener("click",()=>{
    let fSuper = JSON.parse(localStorage.getItem('fSuper'));
    curIndex--;
    if(curIndex>=0){
        displaySuper(fSuper.fList[curIndex]);
        curObj = fSuper.fList[curIndex];
    }else if(curIndex>=fSuper.fList.length){
        curIndex=fSuper.fList.length-1;
    }
    else if(curIndex<0){
        curIndex = 0;
    }
})



removeBtn.addEventListener("click",()=>{
    // console.log(curObj);
    // console.log("here");
    if(Object.keys(curObj).length==0){
        // console.log("in here");
        superImgDiv.innerHTML="";
        superInfoDiv.innerHTML="";
    }
    let fSuper = JSON.parse(localStorage.getItem('fSuper'));
    console.log("fsuper", fSuper);
    for(let i = 0; i<fSuper.fList.length; i++){
        console.log("cur obj", fSuper.fList[i]);
        if(curObj.name==fSuper.fList[i].name){
            console.log("in name match")
            fSuper.fList.splice(i,1);
            console.log("")
            curIndex = 0;
            curObj = fSuper.fList[0];
            localStorage.setItem('fSuper',JSON.stringify(fSuper));
            if(fSuper.fList.length>0){
            displaySuper(fSuper.fList[0]);
            }else if(fSuper.fList.length==0){
                superImgDiv.innerHTML="";
                superInfoDiv.innerHTML="";
            }
            return;
        }
    }
});

function displaySuper(superObj){
    // console.log('obj display',superObj);
    addToFav = true;
    superImgDiv.innerHTML="";
    superInfoDiv.innerHTML="";

    let imgEle = document.createElement('img');
    imgEle.src = `${superObj.thumbnail.path}.${superObj.thumbnail.extension}`;
    superImgDiv.append(imgEle);

    let headinEle = document.createElement('h3');
    headinEle.textContent = superObj.name;
    superInfoDiv.append(headinEle);

    let paraEle = document.createElement("p");
    paraEle.textContent = superObj.description;
    superInfoDiv.append(paraEle);

    // localStorage.removeItem('fSuper');
}