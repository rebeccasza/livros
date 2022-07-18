import express from 'express';
import db from './config/dbConnect.js';
import livros from './models/Livro.js';

db.on("error", console.log.bind(console, "Erro na conexão!"));
db.once("open", () =>{
    console.log("Banco de dados conectado!")
})

const app = express();
app.use(express.json());

//Rota principal
app.get('/', (req, res) =>{
    res.status(200).send({message:"Pagina principal!"});
})

//Exibir todos os livros
app.get('/livros', (req, res) =>{
    //utilizando o metodo .find() para retornar os dados
    livros.find((err, livros) =>{
        res.status(200).json(livros)
    })    
})

//Consultar livro por id
app.get('/livros/:id', (req, res) => {
    //salvando o id em uma variavel
    const id = req.params.id;
    //utilizando o findByid para retornar o livro por id
    livros.findById(id, (err, livros) =>{
        if(err){
            res.status(400).send("Erro na conexão!")
        }else{
            res.status(200).send(livros)
        }
    })
})

//Cadastrando um novo livro
app.post('/livros',(req, res) => {
    //criando variavel que recebe o conteudo passado em body
    let livro = new livros(req.body);
    //salvando ele no banco
    livro.save((err) =>{
        if(err){
            res.status(500).send("Erro ao salvar o livro!")
        }else{
            res.status(201).send(livro.toJSON())
        }
    })
})

//Atualizar livro por id
app.put('/livros/:id', (req, res) => {
    //salvando o id em uma variavel
    const id = req.params.id;
    //utilizando o metodo que localiza pelo id e atualiza
    livros.findByIdAndUpdate(id, {$set: req.body}, (err) =>{
        if(err){
            res.status(500).send({message: err.message})
        }else{
            res.status(200).send({message: 'Livro atualizado com sucesso!'})
        }
    })   
})

//Excluindo um livro por id
app.delete('/livros/:id', (req,res) => {
    const id = req.params.id;
    //utilizando o metodo para localizar por id e excluir
    livros.findByIdAndDelete(id, (err) =>{
        if(err){
            res.status(500).send({message: err.message})
        }else{
            res.status(200).send({message: 'Livro removido com sucesso!'})
        }
    })
})


export default app


