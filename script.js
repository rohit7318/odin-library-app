// close and pop up form buttons 
const closeFormBtn = document.querySelector('#closeButton');
const formEl = document.querySelector(".form");
const openFormEl = document.querySelector('#addBook');
const submitButton = document.querySelector('#submitButton');
// booksContainer element
const booksContainerEl = document.querySelector('.books-container');
// filter book elements
const completedBooksEl = document.querySelector('#completedBooks');
const unreadBooks = document.querySelector('#unreadBooks');
const allBooks = document.querySelector('#allBooks');
// form elements 
const titleEl = document.querySelector('#title');
const authorEl = document.querySelector('#author');
const pagesEl = document.querySelector('#pages');
const checkboxEl = document.querySelector('#checkbox');


// showing All books and adding a active class to allBooks
allBooks.classList.add('buttonActive');

// myLibrary array to store bookObjects
let myLibrary = [];



// setting event listener on completedBooksEl button to show completedBooks
completedBooksEl.addEventListener('click',()=>
{
    booksContainerEl.classList.remove('unreadBooks');
    booksContainerEl.classList.add('completedBooks');
    unreadBooks.classList.remove('buttonActive');
    allBooks.classList.remove('buttonActive');
    completedBooksEl.classList.add('buttonActive');
    updateDom();
});


// setting event listener on unreadBooks button to show UnreadBooks
unreadBooks.addEventListener('click',()=>{
    booksContainerEl.classList.remove('completedBooks');
    booksContainerEl.classList.add('unreadBooks');

    unreadBooks.classList.add('buttonActive');
    allBooks.classList.remove('buttonActive');
    completedBooksEl.classList.remove('buttonActive');
    updateDom();
})


// setting event listener on allBooks button to show all Books
allBooks.addEventListener('click',()=>{
    booksContainerEl.classList.remove('completedBooks');
    booksContainerEl.classList.remove('unreadBooks');

    allBooks.classList.add('buttonActive');
    unreadBooks.classList.remove('buttonActive');
    completedBooksEl.classList.remove('buttonActive');

    updateDom();
})





// 
class Book {
    constructor(id, title, author, pages, isRead) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead; // boolean
    }
}

// generate uniqueIdFunction
function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}



// form submit 
submitButton.addEventListener('click', function() {
    let bookObject = getNewBook();

    myLibrary.push(bookObject);
    updateDom();
    resetForm();
    removeBlurEffect();
});


// reset form function
function resetForm() {
    titleEl.value = '';
    authorEl.value = '';
    pagesEl.value = '';
    checkboxEl.checked = false;
    formEl.classList.remove('active');
}


// this function creates a new bookObject from the values , which are entered by the user in a form , and it returns a bookObject , which stores the values enter by user 
function getNewBook() 
{
    const title = titleEl.value;
    const author = authorEl.value;
    const pages = pagesEl.value;
    const isRead = checkboxEl.checked; // boolean
    // returning the book object
    let bookObject = new Book(generateId(), title, author, pages, isRead);
    return bookObject;
}

// eventlistener to close the form 
closeFormBtn.addEventListener('click', () => {
    formEl.classList.remove('active');
    removeBlurEffect();
});


// event listener for  : pop's up the form 
openFormEl.addEventListener('click', () => {
    formEl.classList.add('active');
    addBlurEffect();
});


// removing blur effect from main
function removeBlurEffect()
{
    document.querySelector('main').classList.remove('blur');
}

// adding blur effect on main
function addBlurEffect()
{
    document.querySelector('main').classList.add('blur');
}



// updateDom makes the booksContainer empty and loop through the myLibrary array
// to createNew Books
function updateDom() 
{
    // setting booksContainer empty 
    booksContainerEl.innerHTML = '';

    // checking the condition that booksContainer has completedBooks class or not
    if(booksContainerEl.classList.contains('completedBooks'))
    {
        let completedBooks = myLibrary.filter(book=>book.isRead ===true);
        completedBooks.forEach((bookObject)=>{
            createBook(bookObject);
        })
    }
    // Checking another condition for unreadBooks
    else if(booksContainerEl.classList.contains('unreadBooks'))
    {
        let unreadBooks = myLibrary.filter(book=>book.isRead ===false);
        unreadBooks.forEach((bookObject)=>{
            createBook(bookObject);
        })
    }
    // if not any condition get true , then show all books
    else 
    {
        myLibrary.forEach((bookObject) => {
            createBook(bookObject);
        });
    }


   
}



// createBook functions creats a book card for each bookObject
function createBook(bookObject) 
{
    let bookDiv = document.createElement('div');
    bookDiv.classList.add('book');
    bookDiv.setAttribute('data-id', bookObject.id);

    // title div
    let titleDiv = document.createElement('div'); // container
    let titlePara = document.createElement('p');
    titlePara.textContent = 'Book Title';
    let titleHeading = document.createElement('h2');
    titleHeading.textContent = bookObject.title;

    titlePara.classList.add('small-heading');
    titleHeading.classList.add('heading');
    titleDiv.appendChild(titlePara);
    titleDiv.appendChild(titleHeading);

    // author div
    let authorDiv = document.createElement('div');
    let authorPara = document.createElement('p');
    authorPara.textContent = 'Book Author';
    let authorHeading = document.createElement('h2');
    authorHeading.textContent = bookObject.author;

    authorPara.classList.add('small-heading');
    authorHeading.classList.add('heading');
    authorDiv.appendChild(authorPara);
    authorDiv.appendChild(authorHeading);

    // pages div
    let pageDiv = document.createElement('div');
    let pagePara = document.createElement('p');
    pagePara.textContent = 'Total Pages';
    let pageHeading = document.createElement('h2');
    pageHeading.textContent = bookObject.pages;

    pagePara.classList.add('small-heading');
    pageHeading.classList.add('heading');
    pageDiv.appendChild(pagePara);
    pageDiv.appendChild(pageHeading);

    // status div
    let statusDiv = document.createElement('div');
    let statusPara = document.createElement('p');
    statusPara.textContent = 'Status';
    let statusButton = document.createElement('button');
    statusPara.classList.add('small-heading');
    statusButton.classList.add('status');
    statusButton.classList.add('changeStatus');
    statusButton.textContent = bookObject.isRead ? 'Read' : 'Unread';
    if(bookObject.isRead===true)
    {
        statusButton.classList.add('read');
    }
    else 
    {
        statusButton.classList.add('unread')
    }
    statusDiv.appendChild(statusPara);
    statusDiv.appendChild(statusButton);

    // removeBook btn
    let removeBook = document.createElement('button');
    removeBook.textContent = 'Remove Book';
    removeBook.classList.add('removeBook');

    bookDiv.appendChild(titleDiv);
    bookDiv.appendChild(authorDiv);
    bookDiv.appendChild(pageDiv);
    bookDiv.appendChild(statusDiv);
    bookDiv.appendChild(removeBook);

    // appending a bookDiv in a booksContainer  
    booksContainerEl.appendChild(bookDiv);
}



// event listener on booksContainerEl which contains books and books have buttons , one for toggle the isRead property and another for remove the book
booksContainerEl.addEventListener('click', function(event) 
{

    // checking condition if it was removeBook button pressed
    if(event.target.classList.contains('removeBook'))
    {

        // confirming from user , if user press ok the if block runs...
        let choice = confirm('Are you sure you want to remove this book ? ');
        if(choice)
        {
            // finding the closest .book parent of the .removeBook Button
            let parent = event.target.closest('.book');
            // getting the id of parent on which removeBook button is pressed
            let id = parent.getAttribute('data-id');
            // finding the index of the book from it's data-id
            const index = myLibrary.findIndex(book=>book.id ===id);

            // if index is not equal to -1 , then remove book obj from myLibrary
            if(index !== -1)
            {
                myLibrary.splice(index,1);
            }
            // myLibrary = myLibrary.filter(book => book.id !== id);
            // updating dom after removing the particular book
            updateDom();
        }

        
    }


    // checking the condition if it was changeStatus button pressed
    if (event.target.classList.contains('changeStatus')) 
    {
        let parent = event.target.closest('.book');
        let id = parent.getAttribute('data-id');
        let book = myLibrary.find(book => book.id === id);
        book.isRead = !book.isRead;
        updateDom();
    }
})


