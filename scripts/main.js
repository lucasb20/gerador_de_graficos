const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
const table = document.querySelector('#table')

let dados = []

document.querySelector('#but_add').addEventListener('click',()=>{
    let entry = Number(document.getElementById('num').value)
    dados.push(entry)
    let item = document.createElement('option')
    item.innerText = `${entry}`
    table.appendChild(item)
})

document.querySelector('#but_res').addEventListener('click',()=>{
    table.innerHTML = ""
    dados = []
})

document.querySelector('#but_ger').addEventListener('click',gerar)

function gerar(){
    if(!(dados.length)){
        alert('Não há dados.')
    }
    else{
        alert('Há dados.')
    }
}

ctx.beginPath()

ctx.moveTo(0,0)
ctx.lineTo(10,0)

ctx.closePath()