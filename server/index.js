const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "blog"
})

app.post("/createPost", (req, res)=> {

    const username = req.body.username;
    const title = req.body.title;
    const post = req.body.post;

    db.query('INSERT INTO posts(username, title, post) VALUES (?,?,?)',[username, title, post],
    (err)=> {
        if(err) {
            console.log(err);
        } else {
            res.send("Post publicado");
        }
    });

});

app.post("/updatePost", (req, res)=> {
    console.log(req.body);
    const id = req.body.id;
    const username = req.body.username;
    const title = req.body.title;
    const post = req.body.post;

    db.query('UPDATE posts SET username=?, title=?, post=? WHERE id=?',[username, title, post, id],
    (err)=> {
        if(err) {
            console.log(err);
        } else {
            res.send("Post publicado");
        }
    });

});

app.get("/posts", (req, res)=> {
    db.query('SELECT * FROM posts',
    (err, result)=> {
        if(err) {
            
            console.log(err);
        } else {
            res.send(result);
        }
    });

});

app.delete("/deletePost/:id", (req, res) => {
    
    const id = req.params.id;
    db.query('DELETE FROM posts WHERE id=?',id,
(err) => {
    if(err) {
        console.log(err);
    } else {
        res.send("Post eliminado");
    }
})
})

app.listen(3001, () => {
    console.log("Corriendo en el puerto 3001");
})