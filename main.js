let res = document.querySelector('#res')
const baixo = document.querySelector('#baixo')
const entradas = document.querySelector('#entradas')
let bninit1 = 0    
let bnatq1 = 0
let bndmg1 = 0
let bninit2 = 0
let bnatq2 = 0
let bndmg2 = 0
let select = 0
let selnum = 0
let tp = 0
let velo = 50
let idop = 0
let atq = 0

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
    controlSword('play')
    createSelect()    
    idop = 0
    stopTimes()
    let hp1 = Number(document.querySelector('#hp1').value)
    let ca1 = Number(document.querySelector('#ca1').value)
    let weapon1 = Number(document.querySelector('#weapon1').value)        
    let hp2 = Number(document.querySelector('#hp2').value)
    let ca2 = Number(document.querySelector('#ca2').value)
    let weapon2 = Number(document.querySelector('#weapon2').value)
    if(entradas.childElementCount > 2) {
        bninit1 = Number(document.querySelector('#bninitmy').value)
        bnatq1 = Number(document.querySelector('#bnatqmy').value)
        bndmg1 = Number(document.querySelector('#bndmgmy').value)
        bninit2 = Number(document.querySelector('#bninitenemy').value)
        bnatq2 = Number(document.querySelector('#bnatqenemy').value)
        bndmg2 = Number(document.querySelector('#bndmgenemy').value)
    }
    
    let idini = document.createElement('option')
    idini.id = 'op0'
    select.appendChild(idini)
    idini = document.querySelector(`#op0`)
       
    // INICIATIVA    
    let ini1 = random(1, 21) + bninit1    
    let ini2 = random(1, 21) + bninit2
        
    const iniciativa = (x, y) => x > y ?
        idini.innerHTML = `Você começa atacando! ${x} x ${y}`        
        :    
        idini.innerHTML = `Seu inimigo começa atacando! ${y} x ${x}`
    
    iniciativa(ini1, ini2)

    // ATAQUE
    if(ini1 >= ini2){
        tp = 0
        while(hp1 > 0 && hp2 > 0){            
            atq = (random(1, 21))
            console.log(`Minha rolagem atq`, atq)            
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
                hp2 = hp2 - dmg                
            } else if ((atq+bnatq1) >= ca2) {
                dmg = random(1, (weapon1 + 1))
                const dmgtemp = dmg
                if (hp1 <= 0 || hp2 <= 0) {
                    break
                }
                setTimeout(() => {
                    id = createOption()
                    id.selected = true
                    id.innerHTML = `Você causou ${dmgtemp} de dano.`
                }, (tp = tp + velo))
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
            console.log(`Rolagem inmigo atq`, atq)
            if(atq === 20){
                dmg = random(1, (weapon2+1)) * 2
                const dmgtemp = dmg
                if(hp1 <= 0 || hp2 <= 0){                        
                    break
                }
                setTimeout(() => {
                    id = createOption()                        
                    id.innerHTML = `CRITICO! Seu inimigo causou ${dmgtemp} de dano.`
                }, (tp = tp + velo))
                hp1 = hp1 - dmg
                atq = atq + bnatq2
            }else if (atq+bnatq2 >= ca1) {
                dmg = random(1, (weapon2 + 1))
                const dmgtemp = dmg
                if (hp1 <= 0 || hp2 <= 0) {
                    break
                }
                setTimeout(() => {
                    id = createOption()
                    id.innerHTML = `Seu inimigo causou ${dmgtemp} de dano.`
                }, (tp = tp + velo))
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
            console.log(`Rolagem inmigo atq`, atq)
            if(atq === 20){
                dmg = random(1, (weapon2+1)) * 2
                const dmgtemp = dmg
                if(hp1 <= 0 || hp2 <= 0){                        
                    break
                }
                setTimeout(() => {
                    id = createOption()                        
                    id.innerHTML = `CRITICO! Seu inimigo causou ${dmgtemp} de dano.`
                }, (tp = tp + velo))
                hp1 = hp1 - dmg
                atq = atq + bnatq2
            } else if(atq+bnatq2 >= ca1){                
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
            console.log(`Minha rolagem atq`, atq)
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
                hp2 = hp2 - dmg
                atq = atq + bnatq1
            }else if(atq+bnatq1 >= ca2){                
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
    const divWep = document.querySelector(div)
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
        divWep.appendChild(selectW)
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
slider.addEventListener('change', () => {    
    velo = Number(document.querySelector('#velo').value)
    velo = (velo - 1000) * (-1)        
})

const testar = document.querySelector('#teste')
testar.addEventListener('click', () => {    
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
            controlSword('stop')
        }, (tp = tp + velo))
    } else if (hp2 > hp1 && hp1 <= 0) {
        setTimeout(() => {
            id = createOption()
            id.style.background = `url(${icons[0].url}) no-repeat center`
            id = createOption()
            id.innerHTML = `Você MORREU para o seu inimigo!`
            controlSword('stop')
        }, (tp = tp + velo))
    }    
}

const adv = document.querySelector('#advanced')
adv.addEventListener('click', () => {
    createAdv('my', 'afterbegin')
    createAdv('enemy', 'beforeend')       
})

const simp = document.querySelector('#simple')
simp.addEventListener('click', () => {
    if(entradas.childElementCount === 4){
        myAdv.remove()
        enemyAdv.remove()
        bninit1 = 0    
        bnatq1 = 0
        bndmg1 = 0
        bninit2 = 0
        bnatq2 = 0
        bndmg2 = 0
    }
})

function createAdv(i, local) {
    if(entradas.childElementCount < 4){
        // TRANSFORMAR EM FOR!!!
        const divAdv = document.createElement(`div`)
        divAdv.id = `${i}Adv`
        entradas.insertAdjacentElement(`${local}`, divAdv)    
        
        const inpIni = document.createElement('input')
        const labIni = document.createElement('label')
        labIni.innerText = "Bonus Iniciativa"
        inpIni.id = `bninit${i}`
        divAdv.appendChild(labIni)
        divAdv.appendChild(inpIni)
    
        const inpAtq = document.createElement('input')
        const labAtq = document.createElement('label')
        labAtq.innerText = "Bonus Ataque"
        inpAtq.id = `bnatq${i}`
        divAdv.appendChild(labAtq)
        divAdv.appendChild(inpAtq)
    
        const inpDmg = document.createElement('input')
        const labDmg = document.createElement('label')
        labDmg.innerText = "Bonus Dano"
        inpDmg.id = `bndmg${i}`
        divAdv.appendChild(labDmg)
        divAdv.appendChild(inpDmg)
    }
}

function controlSword(action) {
    const play = document.querySelector('#tapSword')
    if(action === 'play'){
        play.play()        
    } else if(action === 'stop'){
        play.pause()
        play.currentTime = 0
    }
}
