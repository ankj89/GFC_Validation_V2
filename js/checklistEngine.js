// =========================================
// CHECKLIST ENGINE
// =========================================

const checklistContainer =
    document.getElementById("checklistContainer");

const categoryDropdown =
    document.getElementById("categoryDropdown");

// =========================================
// CATEGORY CHANGE EVENT
// =========================================

categoryDropdown?.addEventListener(
    "change",
    generateChecklist
);

// =========================================
// GENERATE CHECKLIST
// =========================================

function generateChecklist() {

    if (!checklistContainer) return;

    checklistContainer.innerHTML = "";

    const selectedCategories =
        Array.from(
            categoryDropdown.selectedOptions
        ).map(option => option.value);

    if (selectedCategories.length === 0) {
        return;
    }

    selectedCategories.forEach(category => {

        const checklistItems =
            CHECKLIST_CONFIG[category];

        if (!checklistItems) return;

        const categoryBlock =
            document.createElement("div");

        categoryBlock.className =
            "category-block";

        const categoryHeader =
            document.createElement("div");

        categoryHeader.className =
            "category-header";

        categoryHeader.innerText =
            formatCategoryName(category);

        categoryBlock.appendChild(
            categoryHeader
        );

        checklistItems.forEach(item => {

            const uniqueId =
                createSafeId(
                    category,
                    item
                );

            const itemDiv =
                document.createElement("div");

            itemDiv.className =
                "checklist-item";

            itemDiv.innerHTML = `

                <div class="checklist-title">

                    ${item}

                </div>

                <div class="status-group">

                    <label>

                        <input
                            type="radio"
                            name="${uniqueId}"
                            value="Present">

                        Present

                    </label>

                    <label>

                        <input
                            type="radio"
                            name="${uniqueId}"
                            value="Absent">

                        Absent

                    </label>

                    <label>

                        <input
                            type="radio"
                            name="${uniqueId}"
                            value="NA">

                        N/A

                    </label>

                </div>

                <textarea
                    class="item-remark"
                    data-item="${item}"
                    data-category="${category}"
                    placeholder="Remarks">
                </textarea>

            `;

            categoryBlock.appendChild(
                itemDiv
            );

        });

        checklistContainer.appendChild(
            categoryBlock
        );

    });

}

// =========================================
// GET VALIDATION DATA
// =========================================

function getChecklistValidationData() {

    const selectedCategories =
        Array.from(
            categoryDropdown.selectedOptions
        ).map(option => option.value);

    const validationResults = [];

    selectedCategories.forEach(category => {

        const checklistItems =
            CHECKLIST_CONFIG[category];

        if (!checklistItems) return;

        checklistItems.forEach(item => {

            const uniqueId =
                createSafeId(
                    category,
                    item
                );

            const selectedStatus =
                document.querySelector(
                    `input[name="${uniqueId}"]:checked`
                );

            const remarkField =
                document.querySelector(
                    `textarea[data-item="${item}"][data-category="${category}"]`
                );

            validationResults.push({

                category: category,

                checklistItem: item,

                status:
                    selectedStatus
                        ? selectedStatus.value
                        : "",

                remarks:
                    remarkField
                        ? remarkField.value
                        : ""

            });

        });

    });

    return validationResults;

}

// =========================================
// LOAD SAVED CHECKLIST DATA
// =========================================

function loadChecklistData(
    validationRows
) {

    if (!validationRows) return;

    validationRows.forEach(row => {

        const uniqueId =
            createSafeId(
                row.category,
                row.checklistItem
            );

        const radio =
            document.querySelector(
                `input[name="${uniqueId}"][value="${row.status}"]`
            );

        if (radio) {
            radio.checked = true;
        }

        const remarkField =
            document.querySelector(
                `textarea[data-item="${row.checklistItem}"][data-category="${row.category}"]`
            );

        if (remarkField) {
            remarkField.value =
                row.remarks || "";
        }

    });

}

// =========================================
// CLEAR CHECKLIST
// =========================================

function clearChecklist() {

    const radios =
        document.querySelectorAll(
            'input[type="radio"]'
        );

    radios.forEach(radio => {

        radio.checked = false;

    });

    const remarks =
        document.querySelectorAll(
            ".item-remark"
        );

    remarks.forEach(field => {

        field.value = "";

    });

}

// =========================================
// AUTO CATEGORY SUGGESTION
// =========================================

function autoSelectCategories(
    itemNames
) {

    if (!itemNames ||
        itemNames.length === 0
    ) {
        return;
    }

    const categoriesToSelect =
        new Set();

    itemNames.forEach(item => {

        const itemUpper =
            item.toUpperCase();

        if (
            itemUpper.includes("CEILING")
        ) {

            categoriesToSelect.add(
                "falseCeiling"
            );

        }

        if (
            itemUpper.includes("ELECTRICAL")
        ) {

            categoriesToSelect.add(
                "electrical"
            );

        }

        if (
            itemUpper.includes("PLUMBING")
        ) {

            categoriesToSelect.add(
                "plumbing"
            );

        }

        if (
            itemUpper.includes("WARDROBE")
        ) {

            categoriesToSelect.add(
                "carpentry"
            );

            categoriesToSelect.add(
                "elevation"
            );

        }

    });

    Array.from(
        categoryDropdown.options
    ).forEach(option => {

        option.selected =
            categoriesToSelect.has(
                option.value
            );

    });

    generateChecklist();

}

// =========================================
// HELPERS
// =========================================

function createSafeId(
    category,
    item
) {

    return (
        category +
        "_" +
        item
    )
        .replace(/\s+/g, "_")
        .replace(/[^\w]/g, "_");

}

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
            str => str.toUpperCase()
        );

}
