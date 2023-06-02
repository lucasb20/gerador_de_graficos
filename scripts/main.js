const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
const table = document.querySelector('#table')

canvas.width = 800
canvas.height = 400
const canvas_width = 800,canvas_height = 400

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
    if(!(dados.length))return alert('Não há dados.')

    ctx.clearRect(0,0,canvas_width,canvas_height)

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
        /* if(i==dados_c.length-1){
            ctx.lineTo(canvas_width,canvas_height)
            ctx.lineTo(0,canvas_height)
            ctx.lineTo(0,start_value)
        } */
    }

   /*  ctx.fillStyle = 'rgb(255,0,0)'
    ctx.fill() */
    ctx.stroke()

    ctx.closePath()

    return console.log('Dados gerados.')
}

function corretor(data){
    let new_data = []

    for(let i=0;i<data.length;i++){
        new_data[i]=data[i]
    }

    let k = new_data[0]

    let over = false
    for(let i=0;i<data.length;i++){
        let a = 200-(new_data[i]-k)
        if(a > 400 || a < 0)over = true
    }

    console.log('Over: '+over)

    let prop=1

    if(over){
        prop = find_prop(new_data,prop)
        for(let i=0;i<data.length;i++){
            new_data[i]*=(prop)
            new_data[i] = Math.floor(new_data[i])
        }
    }

    console.log('Data: '+data) 

    console.log('Data pós proporção: '+new_data)

    
    for(let i=0;i<data.length;i++){
        new_data[i] = 200-(new_data[i]-k)
    }

    console.log('Data pós ajuste vertical: '+new_data)

    return new_data
}

function find_prop(data,prop){
        let max
        let min

        let a=[]

        let find = false
        while(!find){
            for(let i=0;i<data.length;i++){
                a[i]=data[i]*prop
            }

            max = maxi(a)
            min = mini(a)

            if(max*prop < 400 & min*prop > 0){
                find = true
            }
            else{
                prop-=0.01
            }
        }
        
        console.log('Prop: '+prop)

        return prop
}

function maxi(data){
    let k = data[0]

    let maximo = 200-(data[0]-k)

    for(let i=0;i<data.length;i++){
        if(200-(data[i]-k)>maximo)maximo=200-(data[i]-k)
    }

    return maximo
}

function mini(data){
    let k = data[0]

    let minimo = 200-(data[0]-k)

    for(let i=0;i<data.length;i++){
        if(200-(data[i]-k)<minimo)minimo=200-(data[i]-k)
    }

    return minimo
}