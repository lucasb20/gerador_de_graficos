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
    dados = [50,-50,0,0,5,50,-5]

    if(!(dados.length))return alert('Não há dados.')

    let dados_c = corretor(dados)

    let start_value = dados_c[0]
    let distance = canvas_width/(dados.length-1)
    const start_point = 0

    ctx.beginPath()

    ctx.lineWidth = 2

    ctx.moveTo(start_point,start_value)

    let new_distance
    for(let i=0;i<dados_c.length;i++){
        new_distance = start_point + (distance*i)
        ctx.lineTo(new_distance,dados_c[i])
    }

    ctx.stroke()

    ctx.closePath()

    return console.log('Dados gerados.')
}

function corretor(data){
    let new_data = []

    let max = data[0]
    let min = data[0]
    let max_abs = Math.abs(data[0])
    for(let i=1;i<data.length;i++){
        if(data[i]>max)max = data[i]
        if(data[i]<min)min = data[i]
        if(Math.abs(data[i])>max_abs)max_abs=Math.abs(data[i])
    }

    let prop = 80/max_abs
    for(let i=0;i<data.length;i++){
        new_data[i]=data[i]
        if(max > 150 || min < 0)new_data[i]*(prop)
    }

    console.log('Data: '+data) 

    console.log('Data pós proporção: '+new_data)

    let k = new_data[0]
    for(let i=0;i<data.length;i++){
        new_data[i] = 75-(new_data[i]-k)
    }

    console.log('Data pós ajuste vertical: '+new_data)

    return new_data
}