const express = require('express');
const books = require("./books.json")
const app = express();
app.use(express.json());


app.get('/books', (req, res) => {
    res.send({books});
})

app.get('/:author',(req, res)=>{
    const newAuthor = books.filter((book)=>book.author === req.params.author);
    res.send(newAuthor);
    console.log(newAuthor);
})



app.post('/', (req, res) => {
    const newBook = [...books,req.body]
    res.send(newBook)

})

app.patch('/:author', (req, res) => {
    const patchBook = books.filter((book)=>{
    if(req.params.author === book.author){
        if(req?.body?.author)book.author =req.body.author; 
        if(req?.body?.country)book.country =req.body.country; 
        if(req?.body?.imageLink)book.imageLink =req.body.imageLink; 
        if(req?.body?.link)book.link =req.body.link; 
        if(req?.body?.pages)book.pages =req.body.pages; 
        if(req?.body?.title)book.title =req.body.title; 
        if(req?.body?.year)book.year =req.body.year; 
     }
        return book;
    });
    res.send(patchBook)
});

app.delete('/:author', (req, res) => {
    const deleteBook = books.filter((book)=>book.author===req.params.author);
    res.send(deleteBook);
});

//middleware
var newUser = "abc"
const authenticate = (req, res,send) => { 
    console.log("Authenticate");
    send();
}

const authorise = (permission) => {
    return (req, res, next) => {
      const originalSendFunc = res.send.bind(res);
      res.send = function (body) {
        body.api_requested_by = "Sushant Salavi";
        body.books = newUser;
        console.log(newUser);
        return originalSendFunc(body);
      };
      next();
    };
};

app.get('/',authenticate,authorise("req"),(req, res)=>{
    newUser = books;
    res.send({})
});

app.get('/books/:author',authenticate,authorise("req"),(req, res)=>{
    newUser = books.filter((book)=>book.author === req.params.author);
    newUser = newUser[0];
    console.log(newUser);
    res.send({})
})

app.listen(2000,()=>{
    console.log("listening on 2000");
})


