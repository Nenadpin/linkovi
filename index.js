let myLeads = []
const buyBtn = document.getElementById("container")
const ulEl = document.getElementById("ul-el")
const inputEl = document.getElementById("input-el")
const delBtn = document.getElementById("delete-btn")
const inputBtn = document.getElementById("input-btn")
const saveBtn = document.getElementById("save-btn")
let listItems = ""

if (JSON.parse(localStorage.getItem("myLeads"))) {
    myLeads = JSON.parse(localStorage.getItem("myLeads"))
    render(myLeads)
}
function render(leads) {
    listItems = ""
for (let i = 0; i<leads.length; i++) {
    listItems += `
    <li>
        <a target='_blank' href='${leads[i]}'>
            ${leads[i]}
        </a>
    </li>
    `
}
ulEl.innerHTML = listItems
}

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    inputEl.value = ""
})

saveBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
    
})

delBtn.addEventListener("dblclick", function () {
    myLeads = []
    localStorage.clear()
    render(myLeads)
})
