let rowGrid=document.getElementById("row");
let navItems=document.getElementsByClassName("nav-item");
let navItemArray=[...navItems];
let allData=[];

                            //if no one enter paramerter the defult parameter will be pasta 
 async function getAllrecpices(fn=`pasta`){
     //this is the full api     
    let req= await fetch(`https://forkify-api.herokuapp.com/api/search?q=${fn}`);
    // this is  the array of  object we need 
    let reqdata= await req.json()
    // this to equal the local var to the array of object we need 
    allData= reqdata.recipes
   // very important to invoc the function when the api is ready 
   displayall()
    
}
// i do this invoc to view some of food if no one click on the function
getAllrecpices()



for(let i=0; i<navItemArray.length; i++){

    navItemArray[i].addEventListener("click",(e)=>{
        let nameofnav=e.target;
        //to hold the textcontent
        foodName=nameofnav.innerHTML;
        // push as a parameter
       getAllrecpices(foodName);
       search.focus();
     
       
    })
}

function displayall(){

    let str="";
    for(let i=0; i<allData.length;i++){
        str+=`
        
        <div class=" col-lg-4 col-md-6 text-center text-light p-2 " >
      <div class="pt-1 coloring text-warning">
        <img src="${allData[i].image_url}" class="size img-fluid text-center" alt="" onclick="getSingleMeat('${allData[i].recipe_id}')" data-toggle="modal" data-target="#exampleModal" >
        <h4 class="pt-1">${allData[i].title}</h4>
        <p class="pb-1">${allData[i].publisher}</p>
        <p class="pb-1">${allData[i].recipe_id}</p>
      </div>

    </div>
        
        
        
        
        `
        rowGrid.innerHTML=str;
    }
    }

let singleData={};

async function getSingleMeat(id){

    let req= await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
    let reqData= await req.json();
    singleData=reqData.recipe;
    console.log(singleData)
     displaySingleData()
     
}


function displaySingleData(){
    let str1=``;
    // make loop for create li to but it in ul 
    for(let i=0 ; i<singleData.ingredients.length;i++){
        str1+=`
        <li class="list-unstyled">${singleData.ingredients[i]} </li>
      
        
        `
    }
    
    let str2=`
    
    <div coloring>
    <img src="${singleData.image_url}" alt="" class=" img-fluid ">
    <h4> Rank : ${singleData.social_rank}</h4>
    <h4 class=" text-warning text-center"> Ingredients</h4>
    <ul> ${str1}</ul>
</div>
    
    `
    //view in html
    document.getElementById("modal").innerHTML=str2;
    /// add title name
    document.getElementById("exampleModalLabel").innerHTML=singleData.title;
    
}


let search= document.getElementById("search");

search.addEventListener("input",searhFood)

   function searhFood(){
       let  str=``;
       for(let i=0; i<allData.length; i++){
           
        if(allData[i].title.toLowerCase().includes(search.value.toLowerCase())){
            str+=`
            
            
            <div class=" col-lg-4 col-md-6 text-center text-light p-2" >
            <div class="pt-1 coloring text-warning">
              <img src="${allData[i].image_url}" class="size img-fluid text-center" alt="" onclick="getSingleMeat('${allData[i].recipe_id}')" data-toggle="modal" data-target="#exampleModal" >
              <h4 class="pt-1">${allData[i].title.replace(search.value.toLowerCase(),`<span class=" bg-danger"> ${search.value}</span>`)}</h4>
              <p class="pb-1">${allData[i].publisher}</p>
              <p class="pb-1">${allData[i].recipe_id}</p>
            </div>
      
          </div>
            
            
            `
            rowGrid.innerHTML=str;
            console.log("wes")
           
        }else{
            console.log("no")
        }
       }
   }

