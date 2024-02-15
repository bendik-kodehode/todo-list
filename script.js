const inputForm = document.querySelector("#input-form");
const input = document.querySelector("#text-input")
const emptyNotifyText = document.querySelector("#empty-list")
const wrapper = document.querySelector("#wrapper")

let itemList = [];
const storedList = localStorage.getItem("itemList")
if (storedList) {
    itemList = JSON.parse(storedList);
    generateList(itemList);
};

inputForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value.length > 0) {
        const newItem = {text: input.value, checked: false};
        itemList.unshift(newItem);
        input.value = "";
        generateList(itemList);
        saveList();
    }
    else input.placeholder = "The Field of Input Years for Letters!";
});

function generateList(arr) {
    const previousItems = document.querySelectorAll(".item-container")
    previousItems.forEach(e => e.remove());

    arr.forEach((e, i) => {
        const item = document.createElement("div");
        const iconContainer = document.createElement("div");
        const itemText = document.createElement("p");
        const btnRemove = document.createElement("i");
        const checkedIcon = document.createElement("i");

        item.classList.add("item-container");
        itemText.classList.add("item-text");
        btnRemove.classList.add("fas", "fa-minus-circle", "icon", "iconRemove");
        checkedIcon.classList.add("far", "fa-check-circle", "notChecked");

        itemText.textContent = e.text;

        iconContainer.append(checkedIcon, btnRemove);
        item.append(itemText, iconContainer);
        wrapper.append(item);

        btnRemove.addEventListener("click", () => {
            itemList.splice(i, 1);
            generateList(itemList);
            saveList();
        });
    
        checkedIcon.addEventListener("click", () => {
            e.checked = !e.checked;
            handleCheck(item, e.checked);
            saveList();
        });

        if (e.checked) handleCheck(item, e.checked);
    });

    itemList.length === 0 ? emptyNotifyText.style.display = "block" : emptyNotifyText.style.display = "none"
};

function handleCheck(item, isChecked) {
    const icon = item.querySelector(".fa-check-circle");
    const itemText = item.querySelector(".item-text");

    if (isChecked) {
        icon.classList.remove("notChecked", "far");
        icon.classList.add("checked", "fas");
        itemText.style.textDecoration = "line-through";
        item.style.opacity = "25%"
    }
    else {
        icon.classList.remove("checked", "fas");
        icon.classList.add("notChecked", "far");
        itemText.style.textDecoration = "none";
        item.style.opacity = "100%";
    };
};

function saveList() {
    localStorage.setItem("itemList", JSON.stringify(itemList));
};

// function hideChecked