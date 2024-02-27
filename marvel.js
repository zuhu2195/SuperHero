let inputEle = document.querySelector('#super-search');
let buttonEle = document.querySelector('#super-btn');
let superImgDiv = document.querySelector('#super-img-div');
let superInfoDiv = document.querySelector('#super-info-div');
let autoCompleteList = document.querySelector('#auto-complete-list');
let autoCompleteDiv = document.querySelector('#auto-complete');

let ts = "9991";
let public_key="9798c70d3a564b5b348e0faab8ac5062";

let Md5hash = "f67c887a8fdcf9f7d69f22e1654490de";
let url=""

favouriteSuper = {fList:[]};


// since Md5hash is only one time computation, so have computed it and stored in a var

inputEle.addEventListener("input",async ()=>{
    autoCompleteList.innerHTML="";
    if(inputEle.value.length>=3){
        autoCompleteDiv.style.display = "block";
        // autoCompleteDiv.style.position = "absolute";
        url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${public_key}&hash=${Md5hash}&nameStartsWith=${inputEle.value}`;
        let response = await fetch(url);
        let data = await response.json();
        // setTimeout(2000);

        let listSuper = data.data.results;
        if(listSuper.length>0){
            for(i of listSuper){
                let superObjIn = i;
                let listEle = document.createElement('li');
                let btn = document.createElement('button');
                btn.textContent = i.name;
                btn.style.border = "none";
                btn.style.width = "100%";
                btn.style.backgroundColor = "black";
                btn.style.color = "white";
                listEle.append(btn);

                btn.addEventListener("click",()=>{
                    displaySuper(superObjIn);
                    // autoCompleteDiv.innerHTML="";
                    autoCompleteDiv.style.display="none";
                    inputEle.value="";
                })


                autoCompleteList.append(listEle);
            }
        }
    }
})

buttonEle.addEventListener("click",async ()=>{
    let name=inputEle.value;
    if(!name){
        alert("enter a valid name");
        return;
    }
    inputEle.value="";
    url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${public_key}&hash=${Md5hash}&name=${name}`;
    let response = await fetch(url);
    let data = await response.json();

    let fullresponse= await fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${public_key}&hash=${Md5hash}`)
    let fulldata = await fullresponse.json();
    if(data.data.results.length===0){
        alert("no super hero with given name");
        return;
    }
    console.log(fulldata);

    let superHeroObj = data.data.results[0];
    // console.log(superHeroObj);
    displaySuper(superHeroObj);
    autoCompleteDiv.style.display="none";

});

function displaySuper(superObj){
    console.log('obj display',superObj);
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

    let btn = document.createElement("button");
    btn.textContent = "add to favourites";
    btn.style.borderRadius = "5px";
    let fSuper = JSON.parse(localStorage.getItem('fSuper'));
    // console.log(fSuper);
    if(fSuper){
        for(i of fSuper.fList){
            // console.log(i.name === superObj.name);
            if(i.name===superObj.name){
            btn.style.backgroundColor = "red";
            btn.style.color="white";
            btn.textContent = "added to favourites"
            superInfoDiv.append(btn);
            console.log("fsuper checking for favourite",fSuper);
            }
        }
    }

    btn.addEventListener("click", ()=>{
        
        let fSuper = JSON.parse(localStorage.getItem('fSuper'));
        // console.log("initial fSuper",fSuper);
        if(!fSuper){
            fSuper = {fList:[]};
        }

        for(let i=0;i<fSuper.fList.length;i++){
            if(superObj.name===fSuper.fList[i].name){
                fSuper.fList.splice(i,1);
                localStorage.setItem('fSuper',JSON.stringify(fSuper));
                fSuper = JSON.parse(localStorage.getItem('fSuper'));
                console.log(fSuper);
                btn.style.backgroundColor = 'lightgrey';
                btn.style.color = "black";
                btn.textContent = "add to favourites"
                return;
            }
        }

        btn.style.backgroundColor = "red";
        // btn.style.pointerEvents = "none";
        btn.style.color="white";
        btn.textContent="added to favourites"
        fSuper.fList.push(superObj);
        localStorage.setItem('fSuper',JSON.stringify(fSuper));
        fSuper = JSON.parse(localStorage.getItem('fSuper'));
        console.log(fSuper);
    })
    superInfoDiv.append(btn);
    // localStorage.removeItem('fSuper');
}

// localStorage.removeItem('fSuper');

