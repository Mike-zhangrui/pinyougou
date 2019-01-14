const fs =  require('fs')
const readFile = fileName =>{
    const p = new Promise((resolve, reject) => {
      fs.readFile(`./data/${fileName}`, (err, data) => {
        if (err) {
          return reject(err)
        }
        resolve(data.toString())
      })
    })
    return p
}
async function fn() {
  const a  = await readFile('a.txt')
  console.log('a.txt: ',a)

  const b  = await readFile('b.txt')
  console.log('b.txt: ',b)

  const c = await readFile('c.txt')
  console.log('c.txt: ',c)
}

console.log('1')
fn()
console.log('2')
