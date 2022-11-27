document.addEventListener('DOMContentLoaded', () => {

    fetch("http://localhost:3000/monsters/?_limit=50")
    .then(resp => resp.json())
    .then(data => renderMonsters(data))

    function renderMonsters(monsterData) {
    monsterData.forEach(monster => {
        let monsterCard = document.createElement("ul")

        monsterCard.className = "monsterCard"
        monsterCard.innerHTML = `
        <div>
            <h2>${monster.name}</h2>
            <h3>${monster.age}</h3>
            <p>${monster.description}</p>
        </div>`

        document.getElementById("monster-container").append(monsterCard)
    })};

    let monsterForm = document.getElementById("createMonster")
    let submitBtn = document.getElementById("monsterSubmit")

    monsterForm.addEventListener("submit", (e) => {

        e.preventDefault()
        console.log(e.target.monsterName)

        let monsterObj = {
            name: `${e.target.monsterName.value}`,
            age: `${e.target.monsterAge.value}`,
            description: `${e.target.monsterBio.value}`
        }

        fetch("http://localhost:3000/monsters", {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(monsterObj)
        })
    })

    let nextPageBtn = document.getElementById("forward")
    nextPageBtn.addEventListener('click', (e) => {

        e.preventDefault()
        removeChildNodes()

        fetch("http://localhost:3000/monsters/?_limit=50&_page=2")
        .then(resp => resp.json())
        .then(data => renderMonsters(data))

    })

    let previousPageBtn = document.getElementById("back")
    previousPageBtn.addEventListener('click', (e) => {
        e.preventDefault()
        removeChildNodes()

        fetch("http://localhost:3000/monsters/?_limit=50")
        .then(resp => resp.json())
        .then(data => renderMonsters(data))
    })

    function removeChildNodes() {
        let monsterParent = document.getElementById("monster-container")
        while(monsterParent.firstChild) {
            monsterParent.removeChild(monsterParent.firstChild)
        }
    }
})