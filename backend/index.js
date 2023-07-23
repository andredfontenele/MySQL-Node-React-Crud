const express = require("express");
const mysql2 = require("mysql2");
const cors = require('cors');
const app = express();

const db = mysql2.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"test"
})

// Se houver um problema de autenticação
// ALTER USER 'root'@'localhost" IDENTIFIED WITH mysql_native_password by "root"

app.use(express.json());
app.use(cors());

app.get("/", (req, res)=> {
    res.send("Olá mundo!")
})

app.get("/books", (req, res)=> {
    const query = "SELECT * FROM books";
    db.query(query, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books", (req, res)=>{
    const query = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]

    db.query(query, [values], (err, data)=>{
        if (err) return res.json(err)
        return res.send("Livro foi criado com sucesso")
    });
})


app.delete("/books/:id", (req, res)=>{
    const bookId = req.params.id;
    const query = "DELETE FROM books WHERE id = ?"

    db.query(query, [bookId], (err, data) =>{
        if (err) return res.json(err);
        return res.json("O livro foi deletado com sucesso")
    });
})

app.put("/books/:id", (req, res)=>{
    const bookId = req.params.id;
    const query = "UPDATE books SET `title` = ?, `desc`= ?, `price` = ?, `cover` = ? WHERE id = ?";

    const values=[
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ]

    db.query(query, [...values, bookId], (err, data) =>{
        if (err) return res.json(err);
        return res.json("O livro foi atualizado com sucesso")
    });
})


app.listen(3000, ()=> {
    console.log(`Running on port 3000!`)
});