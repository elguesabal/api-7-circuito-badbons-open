import express from "express";
import cors from "cors";
// import path from "path";
// import { fileURLToPath } from 'url';
import { pathFile, readJsonFile, writeJsonFile } from './src/functionJson.js';

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => res.send("teste"));

app.get("/tabela", async (req, res) => {
    try {
        const categoria = req.query.categoria;
        const modalidade = req.query.modalidade;
        const data = await readJsonFile(pathFile(`../tabelas/${categoria}/${modalidade}.json`));
        res.json(data.tabela);
    } catch (error) {
        res.send("Erro ao encontrar tabela.");
    }
});




// // Rota para atualizar um post existente (exemplo)
// app.put('/data/posts/:id', async (req, res) => {
//     try {
//       const postId = parseInt(req.params.id, 10);
//       const updatedPost = req.body;
// // console.log("teste:", req.params)
//       const data = await readJsonFile();
// // console.log(data)
      
//       const postIndex = data.posts.findIndex(post => post.id === postId);
// // console.log(postIndex)
//       if (postIndex === -1) {
//         return res.status(404).send('Post não encontrado');
//       }

// // console.log(data.posts[postIndex])
//       data.posts[postIndex] = { ...data.posts[postIndex], ...updatedPost };
// // console.log({ ...data.posts[postIndex], ...updatedPost })
//       await writeJsonFile(data);
      
//       res.status(200).json(data.posts[postIndex]);
//     } catch (error) {
//       console.error(error.message);
//       res.status(500).send(error.message);
//     }
// });


app.listen(process.env.PORT || 3000, () => console.log(`acesse o link http://localhost:3000`));

// LINK DO PARANAUE
// https://api-7-circuito-badbons-open.onrender.com/