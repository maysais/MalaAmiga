const nameElement = document.getElementById('name');
const amountElement = document.getElementById('amount');
const inputs = document.querySelectorAll('.input_travel');
const btnAdd = document.querySelector('.button_travel');
const listParent = document.getElementById('list');
const itens = JSON.parse(localStorage.getItem('itens')) || [];

btnAdd.disabled = true;

inputs.forEach(input => input.addEventListener('input', ()=>{
    if(input.value !== null && input.value !== ''){
        btnAdd.disabled = false;
    }else{
        btnAdd.disabled = true;
    }
}))

itens.forEach(item => displayItem(item))


btnAdd.addEventListener('click', (event) => {
    event.preventDefault();

    const currentItem = {
        "name": nameElement.value,
        "amount": amountElement.value
    };  
    
    const exist = itens.find(element => element.name === nameElement.value);

    if(exist){
        currentItem.id = exist.id;

        updateItem(currentItem)

        itens[itens.findIndex(element => element.id === exist.id)] = currentItem;

    }else{
        currentItem.id = itens[itens.length-1] ? (itens[itens.length-1].id + 1) : 0;

        displayItem(currentItem);

        itens.push(currentItem);
    }   

    localStorage.setItem("itens", JSON.stringify(itens));

    nameElement.value = '';
    amountElement.value = '';
    
})


function displayItem(item){  
    const newItem = document.createElement('li');
    newItem.classList.add('list_item');
    listParent.appendChild(newItem);    

    const amountElement = document.createElement('span');
    amountElement.classList.add('item_number');
    amountElement.dataset.id = item.id;
    amountElement.innerHTML += item.amount;
    newItem.appendChild(amountElement);

    newItem.innerHTML += item.name;
    
    newItem.appendChild(displayBtnDelete(item.id));
}

function updateItem(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.amount;
}


function displayBtnDelete(id){  

    const btnDelete = document.createElement('button');
    btnDelete.classList.add("material-symbols-outlined");
    btnDelete.classList.add("delete");
    btnDelete.setAttribute("aria-label", "Deletar");
    btnDelete.innerHTML += "delete";
    
    btnDelete.addEventListener('click', ()=>{
        deleteElement(btnDelete.parentNode, id);           
    })

    return btnDelete
}


function deleteElement(element,id){
    element.remove();

    itens.splice(itens.findIndex(element => element.id === id),1);

    localStorage.setItem('itens', JSON.stringify(itens));
}







