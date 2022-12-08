// const bodyParser = require("body-parser");
const { json } = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

server.post('/posts', function(req, res){
    const {author, title, contents} = req.body;

    if(!author || !title || !contents) res.status(STATUS_USER_ERROR).json(
        {error: "No se recibieron los parámetros necesarios para crear el Post"})

    
    let postId = 0;
    let newPost = {
        id: postId++,
        author,
        title,
        contents
    }

    posts.push(newPost);
    
    res.json(newPost)
});

server.post('/posts/author/:author', (req, res) =>{
    let {title, contents} = req.body
    let author = req.params.author

    if(!author || !title || !contents) res.status(STATUS_USER_ERROR).json(
        {error: "No se recibieron los parámetros necesarios para crear el Post"})

        let postId = 0;
        let newPost = {
            id: postId++,
            author,
            title,
            contents
        }
    
        posts.push(newPost);
        
        res.json(newPost)


})

server.get ('/posts', function(req, res) {
    let  term  = req.query.term
    
    if (!term) res.json(posts);
    let taki = posts.filter(p => p.title.includes(term) || p.contents.includes(term))
    
    if (taki.length > 0){
        res.json(taki)
    } else {
        res.json(posts)
    }
})


server.get ('/posts/:author', (req, res)=>{
    const { author } = req.params;
    let filtrados = posts.filter(p => p.author === author);

    if (filtrados.length === 0){
    return res.status(STATUS_USER_ERROR).json(
        {error: "No existe ningun post del autor indicado"})
    }
    res.json(filtrados)
})

// Si existen Post que coincidan con ambos parametros, author y title devolver aquellos Posts que correspondan con la información provista, es decir que coincidan author y title.

// Caso contrario, devolver un JSON con un objeto de la forma {error: "No existe ningun post con dicho titulo y autor indicado"}. Verificar que el código de error sea el adecuado.

server.get ('/posts/:author/:title', (req, res)=>{
    const { author, title } = req.params;
    let filtrados = posts.filter(p => p.author === author && p.title === title);

    if (filtrados.length === 0){
    return res.status(STATUS_USER_ERROR).json(
        {error: "No existe ningun post con dicho titulo y autor indicado"})
    }
    res.json(filtrados)  

})

/* server.put ('/posts', (req, res)=> {
    const { id, title, contents } = req.body;

    if(!id || !title || !contents){
        return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para modificar el Post"})
    }

    const post = posts.find(p => p.id === id)

    if (!post) {
        return res.status(STATUS_USER_ERROR).json({error: "No hay post con ese id"})    
    }

    post.title = title;
    post.contents = contents;

    res.json(post)

});

server.delete ('/posts', (req, res) =>{
    let { id } = req.body;

    if(!id){
        return res.status(STATUS_USER_ERROR).json({error: "Mensaje de error"})
    }

    let foundPost = posts?.find(post => post.id === id)

    if(!foundPost){
        return res.status(STATUS_USER_ERROR).json({error: "Mensaje de error"})
    }

    posts = posts.filter(p=> p.id === id)
    res.json({ success: true })

}) */

server.put("/posts",(req, res, next)=>{
    const {id, title, contents } = req.body;
  if(!id || !title || !contents){
    return res.status(STATUS_USER_ERROR).send({error: "No se recibieron los parámetros necesarios para modificar el Post"})
  }

  const post = posts.find(post => post.id === id)

  if(!post){
    return res.status(STATUS_USER_ERROR).send({error: "El id indicado no corresponde con un Post existente"
    })
  }

  post.title = title
  post.contents = contents

  return res.send(post)

})

server.delete("/posts",(req, res, next)=>{
  const { id }= req.body;

  if(!id){
    return res.status(STATUS_USER_ERROR).json({error: "Mensaje de error"})
  }

  const post = posts.find(post => post.id === id)

  if(!post) {
    return res.status(STATUS_USER_ERROR).send({error: "Mensaje de error"})
  }
  
  posts = posts.filter(post => post.id !== id)
  return res.send({ success: true })
})

server.delete("/author",(req, res, next)=>{
  const { author } = req.body;
  if(!author){ 
    return res.status(STATUS_USER_ERROR).json({error: "No existe el autor indicado"
  })
  }
  const allPostsAuthor = posts.filter(post => post.author === author)
  
  if(!allPostsAuthor.length) {
    return res.status(STATUS_USER_ERROR).send({error:"No existe el autor indicado"
  })
  }
  posts = posts.filter( post => post.author !== author)
  return res.send(allPostsAuthor)
})

// TODO: your code to handle requests


module.exports = { posts, server };
