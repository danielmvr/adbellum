let res = document.querySelector('#res')
const baixo = document.querySelector('#baixo')
let select = 0
let selnum = 0
let tp = 0
let velo = 500
let idop = 0
let weapons = [
    {arma: 'Espada Longa', dano:8},
    {arma: 'Adaga', dano: 4},
    {arma: 'Montante', dano: 10},
    {arma: 'Machado', dano: 12},
    {arma: 'Martelo', dano: 10},
    {arma: 'Espada Curta', dano: 6}
]

createWeapons('#my', 'weapon1')
createWeapons('#enemy', 'weapon2')

const atacar = document.querySelector('#atacar')
atacar.addEventListener('click', function(){
    ataque()
})

function ataque(){
    (select === 0) ? select : select.remove()
    createSelect()    
    idop = 0
    
    let hp1 = Number(document.querySelector('#hp1').value)
    let ca1 = Number(document.querySelector('#ca1').value)
    let weapon1 = Number(document.querySelector('#weapon1').value)
    let hp2 = Number(document.querySelector('#hp2').value)
    let ca2 = Number(document.querySelector('#ca2').value)
    let weapon2 = Number(document.querySelector('#weapon2').value)

    let idini = document.createElement('option')
    idini.id = 'op0'
    select.appendChild(idini)
    idini = document.querySelector(`#op0`)
       
    // INICIATIVA    
    let ini1 = random(1, 21)
    let ini2 = random(1, 21)    
        
    const iniciativa = (x, y) => x > y ?
        idini.innerHTML = `Você começa atacando! ${x} x ${y}<br><br>`        
        :    
        idini.innerHTML = `Seu inimigo começa atacando! ${y} x ${x}<br><br>`
    
    iniciativa(ini1, ini2)

    // ATAQUE
    if(ini1 >= ini2){
        tp = 0
        while(hp1 > 0 && hp2 > 0){            
            let atq = (random(1, 21))            
            if(atq >= ca2){
                if(atq === 20){
                    dmg = random(1, (weapon1+1)) * 2 
                    const dmgtemp = dmg                   
                    setTimeout(() => {
                        createOption(idop)                        
                        let id = document.querySelector(`#op${idop}`)
                        id.selected = true
                        id.innerHTML += `<strong>CRITICO!</strong> Você causou ${dmgtemp} de dano.<br>`                    
                    }, (tp = tp + velo))
                    
                } else{
                    dmg = random(1, (weapon1+1))
                    const dmgtemp = dmg                    
                    setTimeout(() => {
                        createOption(idop)
                        let id = document.querySelector(`#op${idop}`)
                        id.selected = true
                        id.innerHTML += `Você causou ${dmgtemp} de dano.<br>`                    
                    }, (tp = tp + velo))
                    
                }                
                hp2 = hp2 - dmg
            } else{
                setTimeout(() => {
                    createOption(idop)
                    let id = document.querySelector(`#op${idop}`)
                    id.selected = true
                    id.innerHTML += `Você <strong>errou</strong> o ataque!<br>`
                }, (tp = tp + velo))
                
            }               
            //ataque inimigo
            atq = (random(1, 21))            
            if(atq >= ca1){
                if(atq === 20){
                    dmg = random(1, (weapon2+1)) * 2
                    const dmgtemp = dmg
                    setTimeout(() => {
                        createOption(idop)
                        let id = document.querySelector(`#op${idop}`)
                        id.innerHTML += `<strong>CRITICO!</strong> Seu inimgo causou ${dmgtemp} de dano.<br>`                    
                    }, (tp = tp + velo))
                    
                } else{
                    dmg = random(1, (weapon2+1))
                    const dmgtemp = dmg
                    setTimeout(() => {
                        createOption(idop)
                        let id = document.querySelector(`#op${idop}`)
                        id.innerHTML += `Seu inimigo causou ${dmgtemp} de dano.<br>`
                    }, (tp = tp + velo))
                    
                }
                hp1 = hp1 - dmg
            } else{
                setTimeout(() => {
                    createOption(idop)
                    let id = document.querySelector(`#op${idop}`)
                    id.innerHTML += `Seu inimigo <strong>errou</strong> o ataque!<br>`
                }, (tp = tp + velo))
                
            }   
        }
        
    } else{
        tp = 0
        while(hp1 > 0 && hp2 > 0){             
            atq = (random(1, 21))            
            if(atq >= ca1){                
                dmg = random(1,weapon2)
                const dmgtemp = dmg
                setTimeout(() => {
                    createOption(idop)
                    let id = document.querySelector(`#op${idop}`)
                    id.innerHTML += `Seu inimigo causou ${dmgtemp} de dano.<br>`
                }, (tp = tp + velo)); 
                
                hp1 = hp1 - dmg
            } else{
                setTimeout(() => {
                    createOption(idop)
                    let id = document.querySelector(`#op${idop}`)
                    id.innerHTML += `Seu inimigo <strong>errou</strong> o ataque!<br>`
                }, (tp = tp + velo));
                
            } 
            atq = (random(1, 21))            
            if(atq >= ca2){                
                dmg = random(1,weapon1)
                const dmgtemp = dmg
                setTimeout(() => {
                    createOption(idop)
                    let id = document.querySelector(`#op${idop}`)
                    id.innerHTML += `Você causou ${dmgtemp} de dano.<br>`
                }, (tp = tp + velo));
                
                hp2 = hp2 - dmg
            } else{
                setTimeout(() => {
                    createOption(idop)
                    let id = document.querySelector(`#op${idop}`)
                    id.innerHTML += `Você <strong>errou</strong> o ataque!<br>`
                }, (tp = tp + velo));
                            
            }
        
        }
    }
    if(hp1 > hp2){
        setTimeout(() => {
            createOption(idop)
            let id = document.querySelector(`#op${idop}`)
            id.innerHTML += `<br>Você <strong>MATOU</strong> seu inimigo!`
        }, (tp = tp + velo))
        
    } else{
        setTimeout(() => {
            createOption(idop)
            let id = document.querySelector(`#op${idop}`)
            id.innerHTML += `<br>Você <strong>MORREU</strong> para inimigo!`
        }, (tp = tp + velo))
        
    }
    
}

// gera um valor randominco entre o range escolhido
const random = (min, max) => {
    const r = Math.random() * (min - max) + max
    return Math.floor(r)
}

// cria os selects das armas
function createWeapons(div, id){
    const divmy = document.querySelector(div)
    const selectW = document.createElement('select')
    selectW.setAttribute('id', id)
    
    for(let e = 0; e < weapons.length; e++){
        let { arma, dano } = weapons[e]        
        let create = document.createElement('option')
        create.setAttribute('id', `${arma}`)        
        create.setAttribute('value', `${dano}`)        
            create.innerText = arma
            selectW.appendChild(create)
        }
        divmy.appendChild(selectW)
}

function createOption(){
    let opres = document.createElement('option')
    idop++
    opres.id = `op${idop}`
    select.appendChild(opres)
    select.selectedIndex = idop
    return idop    
}

const slider = document.querySelector('.slider')
slider.addEventListener('change', function(){    
    velo = Number(document.querySelector('#velo').value)
    velo = (velo - 1000) * (-1)    
})

const testar = document.querySelector('#teste')
testar.addEventListener('click', function(){
    hp1.value = 20
    ca1.value = 10
    hp2.value = 20
    ca2.value = 10
    ataque()
})

function createSelect(){    
    const newselect = document.createElement('select')
    newselect.id = `selres${selnum}`
    newselect.size = 10
    baixo.appendChild(newselect)
    select = document.querySelector(`#${newselect.id}`)
    selnum++
}