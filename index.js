import express from "express";
import cors from "cors";
import { pathFile, updateTable, readJsonFile, writeJsonFile } from './src/functionJson.js';

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

app.get("/jogos", async (req, res) => {
	try {
		const categoria = req.query.categoria;
		const modalidade = req.query.modalidade;
		const data = await readJsonFile(pathFile(`../jogos/${categoria}/${modalidade}.json`));

		res.json(data.jogos);
	} catch (error) {
		res.send("Erro ao encontrar tabela.");
	}
});

app.put("/adm/jogos/:categoria/:modalidade", async (req, res) => {
	try {
		const categoria = req.params.categoria;
		const modalidade = req.params.modalidade;
		const jogos = { jogos: req.body };
		const tabela = { tabela: updateTable(await readJsonFile(pathFile(`../tabelas/${categoria}/${modalidade}.json`)), req.body) };

		await writeJsonFile(pathFile(`../jogos/${categoria}/${modalidade}.json`), jogos);
		await writeJsonFile(pathFile(`../tabelas/${categoria}/${modalidade}.json`), tabela);
		res.status(200).send("ok");
	} catch (error) {
		res.status(500).send("Erro ao gravar tabela.");
	}
});


// app.listen(process.env.PORT || 3000, () => console.log("Servidor online"));
app.listen(process.env.PORT || 3000, () => {
	const currentDate = new Date();
	const hora = currentDate.getHours();
	const minuto = currentDate.getMinutes();
	const segundo = currentDate.getSeconds();

	console.log(`Servidor online as: ${hora}:${minuto}:${segundo}`);
});


// LINK DO PARANAUE
// https://api-7-circuito-badbons-open.onrender.com/