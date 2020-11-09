let res = document.querySelector('#res')
const baixo = document.querySelector('#baixo')
let select = 0
let selnum = 0
let tp = 0
let velo = 500
let idop = 0

const icons = [
    {name: 'caveira', url: 'https://i.imgur.com/MhZEUCr.png'}
]

const weapons = [
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
    stopTimes()
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
        idini.innerHTML = `Você começa atacando! ${x} x ${y}`        
        :    
        idini.innerHTML = `Seu inimigo começa atacando! ${y} x ${x}`
    
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
                    if(hp1 <= 0 || hp2 <= 0){                        
                        break
                    }
                    setTimeout(() => {
                        id = createOption()                                                
                        id.selected = true
                        id.innerHTML = `CRITICO! Você causou ${dmgtemp} de dano.`                    
                    }, (tp = tp + velo))                    
                } else{
                    dmg = random(1, (weapon1+1))
                    const dmgtemp = dmg                    
                    if(hp1 <= 0 || hp2 <= 0){                        
                        break
                    }
                    setTimeout(() => {
                        id = createOption()                        
                        id.selected = true
                        id.innerHTML = `Você causou ${dmgtemp} de dano.`                    
                    }, (tp = tp + velo))                    
                }                
                hp2 = hp2 - dmg                                
            } else{
                if(hp1 <= 0 || hp2 <= 0){                    
                    break
                }
                setTimeout(() => {
                    id = createOption()                    
                    id.selected = true
                    id.innerHTML = `Você errou o ataque!`
                }, (tp = tp + velo))                
            }               
            //ataque inimigo
            atq = (random(1, 21))            
            if(atq >= ca1){
                if(atq === 20){
                    dmg = random(1, (weapon2+1)) * 2
                    const dmgtemp = dmg
                    if(hp1 <= 0 || hp2 <= 0){                        
                        break
                    }
                    setTimeout(() => {
                        id = createOption()                        
                        id.innerHTML = `CRITICO! Seu inimgo causou ${dmgtemp} de dano.`                    
                    }, (tp = tp + velo))                    
                } else{
                    dmg = random(1, (weapon2+1))
                    const dmgtemp = dmg
                    if(hp1 <= 0 || hp2 <= 0){                        
                        break
                    }
                    setTimeout(() => {
                        id = createOption()                        
                        id.innerHTML = `Seu inimigo causou ${dmgtemp} de dano.`
                    }, (tp = tp + velo))                    
                }
                hp1 = hp1 - dmg                                
            } else{
                if(hp1 <= 0 || hp2 <= 0){                    
                    break
                }
                setTimeout(() => {
                    id = createOption()                    
                    id.innerHTML = `Seu inimigo errou o ataque!`
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
                if(hp1 <= 0 || hp2 <= 0){                        
                    break
                }
                setTimeout(() => {
                    id = createOption()                    
                    id.innerHTML = `Seu inimigo causou ${dmgtemp} de dano.`
                }, (tp = tp + velo));                
                hp1 = hp1 - dmg                                
            } else{
                if(hp1 <= 0 || hp2 <= 0){                        
                    break
                }
                setTimeout(() => {
                    id = createOption()                    
                    id.innerHTML = `Seu inimigo errou o ataque!`
                }, (tp = tp + velo))                
            } 
            atq = (random(1, 21))            
            if(atq >= ca2){                
                dmg = random(1,weapon1)
                const dmgtemp = dmg
                if(hp1 <= 0 || hp2 <= 0){                        
                    break
                }
                setTimeout(() => {
                    id = createOption()                    
                    id.innerHTML = `Você causou ${dmgtemp} de dano.`
                }, (tp = tp + velo))
                hp2 = hp2 - dmg                                
            } else{
                if(hp1 <= 0 || hp2 <= 0){                        
                    break
                }
                setTimeout(() => {
                    id = createOption()                    
                    id.innerHTML = `Você errou o ataque!`
                }, (tp = tp + velo))
            }        
        }
    }
    checkDead(hp1, hp2)
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
    let id = document.querySelector(`#op${idop}`)
    return id    
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

function stopTimes(){   
    var id = window.setTimeout(function() {}, 0)
    while (id--) {
            window.clearTimeout(id)
        }
}

function checkDead(hp1, hp2) {
    if (hp1 > hp2 && hp2 <= 0) {
        setTimeout(() => {
            id = createOption()
            id.style.background = `url(${icons[0].url}) no-repeat center`            
            id = createOption()
            id.innerHTML = `Você MATOU seu inimigo!`
        }, (tp = tp + velo))
    } else if (hp2 > hp1 && hp1 <= 0) {
        setTimeout(() => {
            id = createOption()
            id.style.background = `url(${icons[0].url}) no-repeat center`
            id = createOption()
            id.innerHTML = `Você MORREU para o seu inimigo!`
        }, (tp = tp + velo))
    }
}
