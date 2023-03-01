let myLibrary = [];

function Book(title,author,pages,isRead) {
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.isRead=isRead;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

const addBookButton =document.querySelector(".Add-Book");

addBookButton.addEventListener("click",addBook);

function addBook(){
    createAndShowForm();
}

function createAndShowForm(){
    const body=document.querySelector("body");
    body.classList.toggle("chaged-body");
    const form=createForm();
    showForm(form);
}

function createForm(){
    const formContainer=document.createElement("div");
    formContainer.className="formContainer";
    
    const newBookLabel=document.createElement("label");
    newBookLabel.className="newBookLabel";
    newBookLabel.textContent="Add New Book";
    
    const title=document.createElement("input");
    title.className="title";
    title.setAttribute("placeholder","Title");
    title.setAttribute("name","Title");
    title.setAttribute("id","Title");
    title.required=true;
    
    
    const author=document.createElement("input");
    author.className="author";
    author.setAttribute("placeholder","Author");
    author.setAttribute("name","Author");
    author.setAttribute("id","Author");
    author.required=true;

    const pages=document.createElement("input");   
    pages.className="pages";
    pages.setAttribute("placeholder","Pages");
    pages.setAttribute("type","number");
    pages.setAttribute("name","Pages");
    pages.setAttribute("id","Pages");
    pages.required=true;

    const readstatuscheckBox=document.createElement("input");
    readstatuscheckBox.setAttribute("type","checkbox");
    readstatuscheckBox.setAttribute("id","readstatus");
    readstatuscheckBox.setAttribute("name","readstatus");

    const readStatusLabel=document.createElement("label");
    readStatusLabel.className="readStatusLabel";
    readStatusLabel.textContent="Have you read it?";
    readStatusLabel.setAttribute("for","readstatus");


    const readstatusContainer=document.createElement("div");
    readstatusContainer.className="read-status-container";
    readstatusContainer.appendChild(readStatusLabel);
    readstatusContainer.appendChild(readstatuscheckBox);

    const form=document.createElement("form");
    form.className="form";

    const sumbitButton=document.createElement("button");
    sumbitButton.className="submitButton";
    sumbitButton.textContent="submit";

    form.appendChild(newBookLabel);
    form.appendChild(title);
    form.appendChild(author);
    form.appendChild(pages);
    form.appendChild(readstatusContainer);
    form.appendChild(sumbitButton);

    formContainer.appendChild(form);

    return formContainer;
}


function showForm(formContainer){
    const body=document.querySelector("body");
    body.appendChild(formContainer);
    const form=document.querySelector(".form");
    form.addEventListener("submit",sendData);
}


function sendData(event){
    event.preventDefault();
    let book=new Book(event.currentTarget.Title.value, 
                      event.currentTarget.Author.value, 
                      event.currentTarget.Pages.value, 
                      event.currentTarget.readstatus.checked
                    );

    addBookToLibrary(book);
    createAndAddCard(book);
    // console.log(book);
    deleteForm();
}


function deleteForm(){
    const form=document.querySelector(".formContainer");
    const body=document.querySelector("body");
    body.removeChild(form);
}

function createCard(book){
    const card=document.createElement("div");
    card.classList.add("card");
    card.classList.add("card"+String(myLibrary.length));

    const title=document.createElement("div");
    title.textContent="Title: "+book.title;

    const author=document.createElement("div");
    author.textContent="Author: "+book.author;

    const pages=document.createElement("div");
    pages.textContent=book.pages+" pages";

    const isRead=document.createElement("button");
    isRead.className="isRead";
    toggleReadStatus(isRead);
    if(book.isRead){
        isRead.textContent="Read";    
    }
    else{
        isRead.textContent="Not Read";    
        isRead.setAttribute("style","background-color:red");  
    }

    const remove=document.createElement("button");
    remove.textContent="remove";
    remove.className=String(myLibrary.length);
    enableRemoving(remove);

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(isRead);
    card.appendChild(remove);

    return card;
}

function addcardToContainer(card){
    const content=document.querySelector(".content");
    content.appendChild(card);
}

function createAndAddCard(book){
    let card=createCard(book);
    addcardToContainer(card);
}


function toggleReadStatus(button){
    button.addEventListener("click",()=>{
        if(button.textContent==="Read"){
            button.textContent="Not Read";
            button.setAttribute("style","background-color:red");
        }
        else{
            button.textContent="Read";
            button.setAttribute("style","background-color:#dfe7e3");
        }
    });
}



function enableRemoving(button){
    button.addEventListener("click",()=>{
        let index=button.className;
        console.log(index);
        myLibrary.splice(index,1);
        const removedCard=document.querySelector(".card"+index);
        const content=document.querySelector(".content");
        content.removeChild(removedCard);
    });
}