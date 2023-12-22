import { Storage } from 'megajs'
import 'dotenv/config'
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import fs from 'node:fs';

const user = process.env.EMAIL
const pwd = process.env.PWD


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export async function mega(name: string, size: number) {
    const storage = await new Storage({
        email: user,
        password: pwd
    }).ready
    
    const fileName = resolve(__dirname, `../../temp/uploads/${name}`)

    const fileStream = fs.createReadStream(fileName)


    await storage.upload({ name: fileName, size}, fileStream, (err, file) => {
      if (err) {
        console.error('Erro ao fazer upload:', err);
      } else {
        console.log('Upload concluído. Link do arquivo:');
      }
    }).complete

    if (fs.existsSync(fileName)){
      await fs.unlinkSync(fileName)
    }
  }