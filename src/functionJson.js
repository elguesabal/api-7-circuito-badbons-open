import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// // // Obter caminho do arquivo JSON
// const __filename = fileURLToPath(import.meta.url);
// // // console.log("aaaaaaaa", __filename)
// const __dirname = path.dirname(__filename);
// // // console.log("bbbbbbbb", __dirname)
// const jsonFilePath = path.join(__dirname, '../data.json');
// // console.log("cccccccc", jsonFilePath)

export function pathFile(file) {
    const filename = fileURLToPath(import.meta.url);
    const dirname = path.dirname(filename);
    return path.join(dirname, file);
}

// console.log("kkkkkkkk:", pathFile('../data.json'))


// Função para ler o arquivo JSON
export async function readJsonFile(jsonFilePath) {
// console.log("leu:", jsonFilePath)
    try {
    //   const data = await fs.readFile(jsonFilePath, 'utf8');
// console.log("leu:", data)
    //   return JSON.parse(data);
      return JSON.parse(await fs.readFile(jsonFilePath, 'utf8'));
    } catch (err) {
      throw new Error('Erro ao ler o arquivo JSON');
    }
};
  
  // Função para escrever no arquivo JSON
export async function writeJsonFile(jsonFilePath, data) {
    try {
      await fs.writeFile(jsonFilePath, JSON.stringify(data, null, 2));
    } catch (err) {
      throw new Error('Erro ao escrever no arquivo JSON');
    }
};