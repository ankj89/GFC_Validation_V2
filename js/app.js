// =====================================
// V4 APP CONTROLLER
// =====================================
let selectedSkuBasket = [];

document.addEventListener(
    "DOMContentLoaded",
    initializeApp
);

// =====================================
// INIT
// =====================================

function initializeApp() {

    populateCategoryDropdown();

    bindEvents();

}

// =====================================
// EVENTS
// =====================================

function bindEvents() {

    const roomDropdown =
        document.getElementById(
            "roomDropdown"
        );

    const itemDropdown =
        document.getElementById(
            "itemDropdown"
        );

    const categoryDropdown =
        document.getElementById(
            "categoryDropdown"
        );

    const addExtraItemBtn =
        document.getElementById(
            "addExtraItemBtn"
        );

    roomDropdown?.addEventListener(

        "change",

        () => {

            populateItemDropdown();

        }

    );

   

    categoryDropdown?.addEventListener(

        "change",

        () => {

            generateChecklist();

        }

    );

    addExtraItemBtn?.addEventListener(

        "click",

        () => {

            addExtraItemRow();

        }

    );

itemDropdown?.addEventListener(

    "change",

    () => {

        Array.from(
            itemDropdown.selectedOptions
        ).forEach(option => {

            const item =
                JSON.parse(
                    option.value
                );

            const exists =

                selectedSkuBasket.some(
                    x =>
                        x.item ===
                        item.item
                );

            if (!exists) {

                selectedSkuBasket.push(
                    item
                );

            }

        });

        renderSelectedSKUs();

    }

);


    

}

// =====================================
// CATEGORY DROPDOWN
// =====================================

function populateCategoryDropdown() {

    const dropdown =
        document.getElementById(
            "categoryDropdown"
        );

    if (!dropdown) {
        return;
    }

    dropdown.innerHTML = "";

    Object.keys(
        CHECKLIST_CONFIG
    ).forEach(category => {

        const option =
            document.createElement(
                "option"
            );

        option.value =
            category;

        option.textContent =
            formatCategoryName(
                category
            );

        dropdown.appendChild(
            option
        );

    });

}

// =====================================
// FORMAT CATEGORY
// =====================================

function formatCategoryName(
    value
) {

    return value

        .replace(
            /([A-Z])/g,
            " $1"
        )

        .replace(
            /^./,
            s => s.toUpperCase()
        );

}

// =====================================
// AUTO CATEGORY
// =====================================


// =====================================
// EXTRA ITEMS
// =====================================

function addExtraItemRow() {

    const container =
        document.getElementById(
            "extraItemsContainer"
        );

    const row =
        document.createElement(
            "div"
        );

    row.className =
        "extra-item-row";

    row.innerHTML = `

        <input
            type="text"
            class="extra-item-name"
            placeholder="Item Not In BOQ">

        <input
            type="text"
            class="extra-item-reason"
            placeholder="Reason">

        <button
            type="button"
            class="delete-extra-item">

            X

        </button>

    `;

    container.appendChild(
        row
    );

    row
    .querySelector(
        ".delete-extra-item"
    )
    .addEventListener(

        "click",

        () => {

            row.remove();

        }

    );

}

// =====================================
// COLLECT EXTRA ITEMS
// =====================================

function collectExtraItems() {

    const items = [];

    document
    .querySelectorAll(
        ".extra-item-row"
    )
    .forEach(row => {

        const item =

            row.querySelector(
                ".extra-item-name"
            )?.value || "";

        const reason =

            row.querySelector(
                ".extra-item-reason"
            )?.value || "";

        if (
            item.trim()
        ) {

            items.push({

                item,

                reason

            });

        }

    });

    return items;

}
window.addEventListener(
    "load",
    () => {

        addExtraItemRow();

        addExtraItemRow();

    }
);

// =====================================
// SELECTED ITEMS
// =====================================

function getSelectedItems() {

    return selectedSkuBasket;

}
// =====================================
// Render selected SKUs
// =====================================
function renderSelectedSKUs() {

    const container =

        document.getElementById(
            "selectedSkuContainer"
        );

    if (!container) {
        return;
    }

    container.innerHTML = "";

    selectedSkuBasket.forEach(
        (item,index) => {

            const chip =
                document.createElement(
                    "div"
                );

            chip.className =
                "selected-sku";

            chip.innerHTML =

                `${item.item} ✕`;

            chip.onclick = () => {

                selectedSkuBasket.splice(
                    index,
                    1
                );

                renderSelectedSKUs();

            };

            container.appendChild(
                chip
            );

        }
    );

}


// =====================================
// PROJECT MASTER ACCESS
// =====================================

function getProjectMaster() {

    return projectMaster;

}

