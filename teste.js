import express from 'express';
import { readJsonFile, writeJsonFile } from './src/functionJson.js';

const app = express();

// Middleware para analisar JSON
// app.use(express.urlencoded({extended: false}));
app.use(express.json());



// Rota para obter todos os dados do arquivo JSON
app.get('/data', async (req, res) => {
  try {
    res.json(await readJsonFile());
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

// // Rota para obter uma seção específica do JSON (por exemplo, posts)
// app.get('/data/:section', async (req, res) => {
//   try {
//     const data = await readJsonFile();
//     const section = req.params.section;
//     if (data[section]) {
//       res.json(data[section]);
//     } else {
//       res.status(404).send('Seção não encontrada');
//     }
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send(error.message);
//   }
// });

// // Rota para adicionar um novo post (exemplo)
// app.post('/data/posts', async (req, res) => {
//   try {
//     console.log(req.body)
//     const newPost = req.body;
//     const data = await readJsonFile();
//     data.posts.push(newPost);

//     await writeJsonFile(data);
//     res.status(201).json(newPost);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send(error.message);
//   }
// });

// Rota para atualizar um post existente (exemplo)
app.put('/data/posts/:id', async (req, res) => {
    try {
      const postId = parseInt(req.params.id, 10);
      const updatedPost = req.body;
// console.log("teste:", req.params)
      const data = await readJsonFile();
// console.log(data)
      
      const postIndex = data.posts.findIndex(post => post.id === postId);
// console.log(postIndex)
      if (postIndex === -1) {
        return res.status(404).send('Post não encontrado');
      }

// console.log(data.posts[postIndex])
      data.posts[postIndex] = { ...data.posts[postIndex], ...updatedPost };
// console.log({ ...data.posts[postIndex], ...updatedPost })
      await writeJsonFile(data);
      
      res.status(200).json(data.posts[postIndex]);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
});

// Iniciar o servidor
app.listen(3001, () => console.log(`Servidor rodando em http://localhost:3001`));
