// =========================================
// CHECKLIST ENGINE - V4
// =========================================

// =========================================
// DOM
// =========================================

const checklistContainer =
    document.getElementById(
        "checklistContainer"
    );

const categoryDropdown =
    document.getElementById(
        "categoryDropdown"
    );

const itemDropdown =
    document.getElementById(
        "itemDropdown"
    );

// =========================================
// CATEGORY DROPDOWN
// =========================================

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

// =========================================
// CATEGORY CHANGE
// =========================================

categoryDropdown
?.addEventListener(
    "change",
    generateChecklist
);

// =========================================
// GENERATE CHECKLIST
// =========================================

function generateChecklist() {

    if (
        !checklistContainer
    ) {
        return;
    }

    checklistContainer.innerHTML =
        "";

    const selectedCategories =
        Array.from(
            categoryDropdown.selectedOptions
        ).map(
            option => option.value
        );

    if (
        selectedCategories.length === 0
    ) {
        return;
    }

    selectedCategories.forEach(
        category => {

            createCategoryBlock(
                category
            );

        }
    );

}

// =========================================
// CATEGORY BLOCK
// =========================================

function createCategoryBlock(
    category
) {

    const checklist =
        CHECKLIST_CONFIG[
            category
        ];

    if (!checklist) {
        return;
    }

    const block =
        document.createElement(
            "div"
        );

    block.className =
        "category-block";

    block.innerHTML =

        `<div class="category-header">
            ${formatCategoryName(category)}
        </div>`;

    checklist.forEach(item => {

        block.appendChild(
            createChecklistItem(
                category,
                item
            )
        );

    });

    checklistContainer.appendChild(
        block
    );

}

// =========================================
// CHECKLIST ITEM
// =========================================

function createChecklistItem(
    category,
    item
) {

    const wrapper =
        document.createElement(
            "div"
        );

    wrapper.className =
        "checklist-item";

    const safeId =
        createSafeId(
            category,
            item
        );

    wrapper.innerHTML = `

        <div class="checklist-title">
            ${item}
        </div>

        <div class="status-group">

            <label>
                <input
                    type="radio"
                    name="${safeId}"
                    value="Present">
                Present
            </label>

            <label>
                <input
                    type="radio"
                    name="${safeId}"
                    value="Absent">
                Absent
            </label>

            <label>
                <input
                    type="radio"
                    name="${safeId}"
                    value="NA">
                N/A
            </label>

        </div>

        <textarea
            class="item-remark"
            placeholder="Remarks">
        </textarea>

    `;

    return wrapper;

}

// =========================================
// COLLECT CHECKLIST
// =========================================

function collectChecklist() {

    const rows = [];

    document
    .querySelectorAll(
        ".checklist-item"
    )
    .forEach(item => {

        const title =
            item
            .querySelector(
                ".checklist-title"
            )
            ?.textContent || "";

        const status =
            item
            .querySelector(
                'input[type="radio"]:checked'
            )
            ?.value || "";

        const remark =
            item
            .querySelector(
                ".item-remark"
            )
            ?.value || "";

        rows.push({

            title,

            status,

            remark

        });

    });

    return rows;

}

// =========================================
// SAFE ID
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
    .replace(
        /[^a-zA-Z0-9]/g,
        "_"
    );

}

// =========================================
// FORMAT CATEGORY
// =========================================

function formatCategoryName(
    category
) {

    return category

        .replace(
            /([A-Z])/g,
            " $1"
        )

        .replace(
            /^./,
            s =>
                s.toUpperCase()
        );

}

// =========================================
// CATEGORY MAPPING FALLBACK
// =========================================

function autoSuggestCategories(
    itemName
) {

    if (
        typeof CATEGORY_MAPPING ===
        "undefined"
    ) {

        return [];

    }

    const categories = [];

    Object.keys(
        CATEGORY_MAPPING
    ).forEach(key => {

        if (

            itemName
            .toLowerCase()
            .includes(
                key.toLowerCase()
            )

        ) {

            CATEGORY_MAPPING[
                key
            ].forEach(category => {

                if (
                    !categories.includes(
                        category
                    )
                ) {

                    categories.push(
                        category
                    );

                }

            });

        }

    });

    return categories;

}

// =========================================
// ITEM CHANGE
// =========================================



// =========================================
// INIT
// =========================================

populateCategoryDropdown();

console.log(
    "CHECKLIST CONFIG KEYS:",
    Object.keys(
        CHECKLIST_CONFIG
    )
);
