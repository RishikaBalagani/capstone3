const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // For parsing form data

// Sample in-memory storage for posts (temporary storage)
let posts = [];

// Home route: Displays all posts
app.get('/', (req, res) => {
    res.render('index', { posts });
});

// Route for creating a post (GET)
app.get('/create', (req, res) => {
    res.render('create');
});

// Route to handle post creation (POST)
app.post('/create', (req, res) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content,
    };
    posts.push(newPost);
    res.redirect('/');
});

// Route for editing a post (GET)
app.get('/edit/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    res.render('edit', { post });
});

// Route to handle post update (POST)
app.post('/edit/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    post.title = req.body.title;
    post.content = req.body.content;
    res.redirect('/');
});

// Route to delete a post (GET)
app.get('/delete/:id', (req, res) => {
    posts = posts.filter(p => p.id != req.params.id);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
   