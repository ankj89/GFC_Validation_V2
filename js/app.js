// =====================================
// V4 APP CONTROLLER
// =====================================

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

    itemDropdown?.addEventListener(

        "change",

        () => {

            autoSuggestCategory();

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

function autoSuggestCategory() {

    const itemDropdown =
        document.getElementById(
            "itemDropdown"
        );

    const selectedItems =
        Array.from(
            itemDropdown.selectedOptions
        );

    if (
        selectedItems.length !== 1
    ) {
        return;
    }

    const selectedItem =
        JSON.parse(
            selectedItems[0].value
        );

    const category =
        selectedItem.category;

    if (
        !category
    ) {
        return;
    }

    const dropdown =
        document.getElementById(
            "categoryDropdown"
        );

    Array.from(
        dropdown.options
    ).forEach(option => {

        option.selected = false;

        if (

            option.textContent
                .toLowerCase()

            ===

            category
                .toLowerCase()

        ) {

            option.selected = true;

        }

    });

    generateChecklist();

}

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

// =====================================
// SELECTED ITEMS
// =====================================

function getSelectedItems() {

    return Array.from(

        document
        .getElementById(
            "itemDropdown"
        )
        .selectedOptions

    ).map(option =>

        JSON.parse(
            option.value
        )

    );

}

// =====================================
// CLEAR FORM
// =====================================

function clearValidationForm() {

    document
    .getElementById(
        "overallRemarks"
    )
    .value = "";

    document
    .getElementById(
        "drawingMissingReason"
    )
    .value = "";

    document
    .getElementById(
        "drawingNotAvailable"
    )
    .checked = false;

    document
    .getElementById(
        "extraItemsContainer"
    )
    .innerHTML = "";

}

// =====================================
// PROJECT MASTER ACCESS
// =====================================

function getProjectMaster() {

    return projectMaster;

}
