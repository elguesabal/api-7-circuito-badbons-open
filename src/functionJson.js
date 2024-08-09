import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export function pathFile(file) {
	const filename = fileURLToPath(import.meta.url);
	const dirname = path.dirname(filename);
	return path.join(dirname, file);
}

export function updateTable(tabela, jogos) {
	let newTabela = [];

	for(let i = 0; i < tabela.tabela.length; i++) {
		let atleta = { nome: tabela.tabela[i].nome, tj: 0, v: 0, d: 0, vSet: 0, pf: 0, ps: 0 };

		for(let j = 0; j < jogos.length; j++) {
			if (atleta.nome == jogos[j].nome1) {
				atleta.v += (jogos[j].v == 1) ? 1 : 0; // v -> total de vitorias
				atleta.d += (jogos[j].v == 2) ? 1 : 0; // d -> total de derrotas
				atleta.vSet += (jogos[j].v == 1) ? 2 : (jogos[j].sets == 3) ? 1 : 0; // vSet -> total de sets vencidos
				atleta.pf += jogos[j].set1_1 + jogos[j].set2_1 + jogos[j].set3_1; // pf -> pontos feitos
				atleta.ps += jogos[j].set1_2 + jogos[j].set2_2 + jogos[j].set3_2; // ps -> pontos sofridos
			} else if (atleta.nome == jogos[j].nome2) {
				atleta.v += (jogos[j].v == 2) ? 1 : 0; // v -> total de vitorias
				atleta.d += (jogos[j].v == 1) ? 1 : 0; // d -> total de derrotas
				atleta.vSet += (jogos[j].v == 2) ? 2 : (jogos[j].sets == 3) ? 1 : 0; // vSet -> total de sets vencidos
				atleta.pf += jogos[j].set1_2 + jogos[j].set2_2 + jogos[j].set3_2; // pf -> pontos feitos
				atleta.ps += jogos[j].set1_1 + jogos[j].set2_1 + jogos[j].set3_1; // ps -> pontos sofridos
			}
		}
		atleta.tj = atleta.v + atleta.d; // tj -> total de jogos disputados
		newTabela.push(atleta);
	}
	return newTabela;
}

export async function readJsonFile(jsonFilePath) {
	try {
		return JSON.parse(await fs.readFile(jsonFilePath, 'utf8'));
	} catch (err) {
		throw new Error('Erro ao ler o arquivo JSON');
	}
};

export async function writeJsonFile(jsonFilePath, data) {
	try {
		await fs.writeFile(jsonFilePath, JSON.stringify(data, null, 2));
	} catch (err) {
		throw new Error('Erro ao escrever no arquivo JSON');
	}
};