import fs from 'fs'
import util from 'util'

export const move = (src,dest) => {
    const is = fs.createReadStream(src)
    const os = fs.createWriteStream(dest)

    is.pipe(os)
    is.on('end',() => {
        fs.unlinkSync(src)
    })
}