import { Storage } from 'megajs'
import 'dotenv/config'

const user = process.env.EMAIL
const pwd = process.env.PWD

const storage = await new Storage({
    email: user,
    password: pwd
}).ready


const fileId = 'sVpnxBpL'

const fileNode = storage.root.children.find((node) => node.nodeId === fileId)

if (fileNode) {
    fileNode.delete((err) => {
        if (err) {
            console.error('Erro ao excluir o arquivo:', err);
          } else {
            console.log('Arquivo excluído com sucesso!');
          }
    })
}