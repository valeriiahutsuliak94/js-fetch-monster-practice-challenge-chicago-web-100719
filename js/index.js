const monstersLink = 'http://localhost:3000/monsters'
const monsterContainer = document.getElementById('monster-container')
const divForm = document.getElementById('create-monster')
const bodyEl = document.querySelector('body')

document.addEventListener('DOMContentLoaded', function(){
    let page = 1
    renderForm();
    renderMonsters(page);
    nextPageListener(page);
})

function renderForm(){
    const monsterForm= "<form id='monster-form'></form><input id='name' placeholder='name...'><input id='age' placeholder='age...'><input id='description' placeholder='description...'><button>Create</button></form>"
    divForm.innerHTML=monsterForm
    const nameInput = document.getElementById('name')
    const ageInput = document.getElementById('age')
    const descriptionInput = document.getElementById('description')
    divForm.addEventListener('click', function(e){
        if (e.target.innerText === 'Create'){
            const formData = {
                name: nameInput.value,
                age: ageInput.value,
                description: descriptionInput.value
            }

            const reqObj = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            }
            fetch(monstersLink, reqObj)
            .then(resp => resp.json())
            .then(monster => {
                const divEl = document.createElement('div')
                divEl.innerHTML = `<h2>${monster.name}</h2><h4>Age: ${monster.age}</h4><p>"Bio: ${monster.description}"</p>`
                monsterContainer.insertAdjacentElement('afterbegin', divEl)
            })
        }
    })
}

function renderMonsters(page){
    fetch(monstersLink + `/?_limit=50&_page=${page}`)
    .then(resp => resp.json())
    .then(monsters => addMonsters(monsters))
}

function addMonsters(monsters) {
    monsters.forEach(monster => addMonster(monster))
}

function addMonster(monster) {
    const divEl = document.createElement('div')
    divEl.innerHTML = `<h2>${monster.name}</h2><h4>Age: ${monster.age}</h4><p>"Bio: ${monster.description}"</p>`
    monsterContainer.appendChild(divEl)
}

function nextPageListener(page){
    bodyEl.addEventListener('click', function(e){
        if(e.target.innerText === '=>'){
            page += 1
            monsterContainer.innerHTML = ""
            renderMonsters(page)
        }
        else if (e.target.innerText === '<='){
            page -= 1
            monsterContainer.innerHTML = ""
            renderMonsters(page)
        }
    })
}