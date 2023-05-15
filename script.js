const itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

console.log(itemsArray);

document.querySelector('#enter').addEventListener('click', ()=>{
    let item = document.querySelector('#item');
    createItem(item);
})

function createItem(item){
    itemsArray.unshift(item.value);
    localStorage.setItem('items',JSON.stringify(itemsArray));
    location.reload();
}

function displayItem(){
    let items = "";
    for(let i=0;i<itemsArray.length;i++)
    {
        items += `
        <div class="item">
        <div class="input-control d-inline  ">
            <textarea disabled cols="70" rows="1" ">${itemsArray[i]}</textarea>
            <div class="edit-control d-inline ">
                <button class="btn btn-outline-success deletebtn"><i class="fa-solid fa-check "></i></button>
                <button class="btn btn-outline-primary editbtn"><i class="fa-solid fa-pen-to-square "></i></button>
            </div>
        </div>
        <div class="update-control">
            <button class="savebtn btn btn-outline-success">Save</button>
            <button class="cancelbtn btn btn-outline-danger">Cancel</button>
        </div>
    </div>`
    }

    // <i class="fa-solid fa-check deletebtn"></i>
    // <i class="fa-solid fa-pen-to-square editbtn"></i>
    document.querySelector(".to-do-list").innerHTML = items;
    activateDeltelistener();
    activateEditlistner();
    activeSavelistner();
    activeCancellistner(); 
}

function activateDeltelistener()
{
    let deletebtn = document.querySelectorAll('.deletebtn');
    deletebtn.forEach((db,i)=>{
        db.addEventListener("click",()=>{ deleteitem(i) })
    })
}
function deleteitem(i){
    itemsArray.splice(i, 1)
    localStorage.setItem("items",JSON.stringify(itemsArray))
    location.reload()
}

function activateEditlistner(){
    let editbtn =document.querySelectorAll(".editbtn")
    let updateControl = document.querySelectorAll(".update-control")
    let input = document.querySelectorAll(".input-control textarea")

    editbtn.forEach((eb,i)=>{
        eb.addEventListener('click',()=>{
            updateControl[i].style.display = "block";
            input[i].disabled = false;
        })
    })
}

function activeSavelistner(){
    let savebtn = document.querySelectorAll(".savebtn")
    let input = document.querySelectorAll(".input-control textarea")

    savebtn.forEach((sb,i)=>{
        sb.addEventListener('click',()=>{
            updateitems(input[i].value,i);
        })
    })
}

function activeCancellistner(){
    let cancelbtn = document.querySelectorAll(".cancelbtn")
    let updateControl = document.querySelectorAll(".update-control")
    let input = document.querySelectorAll(".input-control textarea")
    cancelbtn.forEach((cb,i)=>{
        cb.addEventListener('click',()=>{
            updateControl[i].style.display = "none"
            input[i].disabled = true;
        })
    })
}

function updateitems(text,i){
    itemsArray[i] = text;
    localStorage.setItem("items",JSON.stringify(itemsArray))
    location.reload();
}

function displayDate(){
    let date = new Date();
    date = date.toDateString();
    console.log(date)
    document.querySelector("#date").innerHTML = date;
}

window.onload = function(){
    displayDate();
    displayItem();
}