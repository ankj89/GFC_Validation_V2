// =====================================
// GLOBAL STORE
// =====================================

let validationStore = [];

// =====================================
// SAVE PAGE VALIDATION
// =====================================

function saveCurrentPageValidation(
    showPopup = false
) {

    const room =

        document
        .getElementById(
            "roomDropdown"
        )
        ?.value || "";

    const selectedItems =

        getSelectedItems();

    const categories =

        Array.from(

            document
            .getElementById(
                "categoryDropdown"
            )
            .selectedOptions

        ).map(

            option => option.value

        );

    const drawingNotAvailable =

        document
        .getElementById(
            "drawingNotAvailable"
        )
        ?.checked || false;

    const drawingMissingReason =

        document
        .getElementById(
            "drawingMissingReason"
        )
        ?.value || "";

    const overallRemarks =

        document
        .getElementById(
            "overallRemarks"
        )
        ?.value || "";

    const checklist =

        collectChecklist();

    const extraDrawingItems =

        collectExtraItems();

    const projectInfo =

        getProjectInfo();

    const pageNo =
getCurrentPDFPage();

    const existingIndex =

        validationStore.findIndex(

            row =>

                row.pageNo ===
                pageNo

        );

   const record = {

    pageNo,

    room,

    items:
        JSON.parse(
            JSON.stringify(
                selectedItems
            )
        ),

    categories:
        [...categories],

    checklist:
        JSON.parse(
            JSON.stringify(
                checklist
            )
        ),

    extraDrawingItems:
        JSON.parse(
            JSON.stringify(
                extraDrawingItems
            )
        ),

    projectInfo:
        JSON.parse(
            JSON.stringify(
                projectInfo
            )
        ),

    drawingNotAvailable,

    drawingMissingReason,

    overallRemarks,

    savedOn:
        new Date()
        .toISOString()

};

    if (
        existingIndex >= 0
    ) {

        validationStore[
            existingIndex
        ] = record;

    }
    else {

        validationStore.push(
            record
        );

    }

    console.log(
        "Validation Saved",
        record
    );
if (showPopup) {

    alert(
        `Page ${pageNo} saved`
    );

}

}



   



// =====================================
// CHECKLIST COLLECTION
// =====================================

function collectChecklist() {

    const results = [];

    document
    .querySelectorAll(
        ".checklist-item"
    )
    .forEach(row => {

        const title =

            row.querySelector(
                ".checklist-title"
            )
            ?.innerText || "";

        const selected =

            row.querySelector(
                'input[type="radio"]:checked'
            );

        const status =

            selected
            ? selected.value
            : "";

        const remark =

            row.querySelector(
                ".item-remark"
            )
            ?.value || "";

        results.push({

            title,

            status,

            remark

        });

    });

    return results;

}

// =====================================
// PAGE LOOKUP
// =====================================

function getValidationByPage(
    pageNo
) {

    return validationStore.find(

        row =>

            row.pageNo ===
            pageNo

    );

}

// =====================================
// ROOM COVERAGE
// =====================================

function buildRoomCoverage() {

    const coverage = {};

    validationStore.forEach(record => {

        const room =
            record.room;

        if (
            !coverage[room]
        ) {

            coverage[room] =
                [];

        }

        record.items.forEach(item => {

            const exists =

                coverage[room]
                .some(

                    existing =>

                        existing.item ===
                        item.item

                );

            if (
                !exists
            ) {

                coverage[room]
                .push(item);

            }

        });

    });

    return coverage;

}

// =====================================
// COVERED SKU LIST
// =====================================

function getCoveredSKUs() {

    const covered =
        new Set();

    validationStore.forEach(record => {

        record.items.forEach(item => {

            covered.add(
                item.item
            );

        });

    });

    return Array.from(
        covered
    );

}

// =====================================
// MISSING SKU REPORT
// =====================================

function getMissingSKUs() {

    const covered =

        getCoveredSKUs();

    const missing = [];

    if (
        !projectMaster
    ) {

        return missing;

    }

    const fullHomeItems =

        projectMaster.rooms[
            "FULL HOME"
        ] || [];

    fullHomeItems.forEach(item => {

        if (

            !covered.includes(
                item.item
            )

        ) {

            missing.push(
                item
            );

        }

    });

    return missing;

}

// =====================================
// EXPORT ACCESS
// =====================================

function getValidationStore() {

    return validationStore;

}

// =====================================
// SAVE BUTTON
// =====================================

document
.getElementById(
    "saveValidationBtn"
)
?.addEventListener(

    "click",

    saveCurrentPageValidation(true);

);
