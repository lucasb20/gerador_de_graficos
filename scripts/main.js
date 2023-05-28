const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
const table = document.querySelector('#table')

const canvas_width = 300,canvas_height = 150

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
    dados = [0,50,-50,50,-50,50,-50]

    if(!(dados.length))return alert('Não há dados.')

    let dados_c = corretor(dados)

    let start_value = dados_c[0]
    let distance = canvas_width/dados.length
    const start_point = 0

    ctx.beginPath()

    ctx.lineWidth = 2

    ctx.moveTo(start_point,start_value)

    let new_distance
    for(let i=1;i<dados_c.length;i++){
        new_distance = start_point + (distance*(i+1))
        ctx.lineTo(new_distance,dados_c[i])
    }

    /* dados_c.forEach((element,index) => {
        let new_distance = start_point + (distance * (index + 1))
        ctx.lineTo(new_distance,element)
    }) */

    ctx.stroke()

    ctx.closePath()

    return console.log('Dados gerados.')
}

function corretor(data){
    let new_data = []

    let max = data[0]
    let min = data[0]
    for(let i=1;i<data.length;i++){
        if(data[i]>max)max = data[i]
        if(data[i]<min)min = data[i]
    }
    console.log('max: '+max)
    console.log('max: '+min)
    
    for(let i=0;i<data.length;i++){
        new_data[i] = data[i]-data[0]+75
    }
    
    return new_data
}