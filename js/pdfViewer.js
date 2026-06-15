// =========================================
// PDF VIEWER - VERSION 3
// =========================================

let pdfDocument = null;

let currentPageNumber = 1;

let totalPages = 0;

// =========================================
// DOM
// =========================================

const pdfCanvas =
    document.getElementById(
        "pdfCanvas"
    );

const pdfContext =
    pdfCanvas.getContext(
        "2d"
    );

const currentPageElement =
    document.getElementById(
        "currentPage"
    );

const totalPagesElement =
    document.getElementById(
        "totalPages"
    );

const prevPageBtn =
    document.getElementById(
        "prevPageBtn"
    );

const nextPageBtn =
    document.getElementById(
        "nextPageBtn"
    );

// =========================================
// LOAD PDF
// =========================================

async function loadPDF(
    file
) {

    try {

        const buffer =
            await file.arrayBuffer();

        const pdfData =
            new Uint8Array(
                buffer
            );

        pdfDocument =
            await pdfjsLib
                .getDocument(
                    pdfData
                )
                .promise;

        totalPages =
            pdfDocument.numPages;

        currentPageNumber = 1;

        updatePageIndicators();

        await renderPage(
            currentPageNumber
        );

        console.log(
            "PDF Loaded",
            totalPages
        );

    }
    catch (error) {

        console.error(
            error
        );

        alert(
            "Failed to load PDF"
        );

    }

}

// =========================================
// RENDER PAGE
// =========================================

async function renderPage(
    pageNumber
) {

    if (
        !pdfDocument
    ) {
        return;
    }

    const page =
        await pdfDocument.getPage(
            pageNumber
        );

    const viewport =
        page.getViewport({
            scale: 1.5
        });

    pdfCanvas.width =
        viewport.width;

    pdfCanvas.height =
        viewport.height;

    await page.render({

        canvasContext:
            pdfContext,

        viewport

    }).promise;

    updatePageIndicators();

    loadSavedValidation(
        pageNumber
    );

}

// =========================================
// PAGE INDICATORS
// =========================================

function updatePageIndicators() {

    if (
        currentPageElement
    ) {

        currentPageElement.textContent =
            currentPageNumber;

    }

    if (
        totalPagesElement
    ) {

        totalPagesElement.textContent =
            totalPages;

    }

}

// =========================================
// PREVIOUS PAGE
// =========================================

prevPageBtn?.addEventListener(
    "click",
    async () => {

        saveCurrentPageValidation(false);

        if (
            currentPageNumber <= 1
        ) {
            return;
        }

        currentPageNumber--;

        await renderPage(
            currentPageNumber
        );

    }
);

// =========================================
// NEXT PAGE
// =========================================

nextPageBtn?.addEventListener(
    "click",
    async () => {

        saveCurrentPageValidation(false);

        if (
            currentPageNumber >= totalPages
        ) {
            return;
        }

        currentPageNumber++;

        await renderPage(
            currentPageNumber
        );

    }
);

// =========================================
// LOAD SAVED VALIDATION
// =========================================

function loadSavedValidation(
    pageNumber
) {

    clearValidationForm();

    const pageData =
        getValidationByPage(
            pageNumber
        );
 console.log(
        "Loading Page",
        pageNumber,
        pageData
    );

    
    if (!pageData) {

        return;

    }

    restoreValidationForm(
        pageData
    );

}

// =========================================
// CLEAR FORM
// =========================================

function clearValidationForm() {

    const overallRemarks =
        document.getElementById(
            "overallRemarks"
        );

    if (overallRemarks) {

        overallRemarks.value = "";

    }

    const roomDropdown =
        document.getElementById(
            "roomDropdown"
        );

    if (roomDropdown) {

        roomDropdown.value = "";

    }

    const itemDropdown =
        document.getElementById(
            "itemDropdown"
        );

    if (itemDropdown) {

        Array.from(
            itemDropdown.options
        ).forEach(option => {

            option.selected = false;

        });

    }

    const categoryDropdown =
        document.getElementById(
            "categoryDropdown"
        );

    if (categoryDropdown) {

        Array.from(
            categoryDropdown.options
        ).forEach(option => {

            option.selected = false;

        });

    }

    const checklistContainer =
        document.getElementById(
            "checklistContainer"
        );

    if (checklistContainer) {

        checklistContainer.innerHTML = "";

    }

    const extraItemsContainer =
        document.getElementById(
            "extraItemsContainer"
        );

    if (extraItemsContainer) {

        extraItemsContainer.innerHTML = "";

    }
selectedSkuBasket = [];
selectedCategoryBasket = [];

renderSelectedSKUs();
renderSelectedCategories();


}
// =========================================
// RESTORE FORM
// =========================================

async function restoreValidationForm(
    pageData
) {

    clearValidationForm();

    const roomDropdown =
        document.getElementById(
            "roomDropdown"
        );

    const itemDropdown =
        document.getElementById(
            "itemDropdown"
        );

    const remarks =
        document.getElementById(
            "overallRemarks"
        );

    // =========================
    // ROOM
    // =========================

    if (
        roomDropdown
    ) {

        roomDropdown.value =
            pageData.room || "";

        populateItemDropdown();

    }

    // =========================
    // RESTORE SKU BASKET
    // =========================

    selectedSkuBasket =
        pageData.items || [];

    renderSelectedSKUs();

    // =========================
    // RESTORE CATEGORY BASKET
    // =========================

    selectedCategoryBasket =
        pageData.categories || [];

    renderSelectedCategories();

    // =========================
    // MARK ITEMS IN DROPDOWN
    // =========================

    if (
        itemDropdown &&
        pageData.items
    ) {

        const savedItems =
            pageData.items.map(
                item =>
                    JSON.stringify(
                        item
                    )
            );

        Array.from(
            itemDropdown.options
        ).forEach(option => {

            option.selected =
                savedItems.includes(
                    option.value
                );

        });

    }

    // =========================
    // GENERATE CHECKLIST
    // =========================

    generateChecklist();

    // =========================
    // RESTORE CHECKLIST VALUES
    // =========================

    if (
        pageData.checklist
    ) {

        document
        .querySelectorAll(
            ".checklist-item"
        )
        .forEach(
            (row, index) => {

                const saved =
                    pageData.checklist[
                        index
                    ];

                if (!saved) {
                    return;
                }

                const radio =
                    row.querySelector(
                        `input[value="${saved.status}"]`
                    );

                if (radio) {

                    radio.checked =
                        true;

                }

                const remark =
                    row.querySelector(
                        ".item-remark"
                    );

                if (remark) {

                    remark.value =
                        saved.remark || "";

                }

            }
        );

    }

    // =========================
    // EXTRA ITEMS
    // =========================

    if (
        pageData.extraDrawingItems
    ) {

        const container =
            document.getElementById(
                "extraItemsContainer"
            );

        if (container) {

            container.innerHTML = "";

            pageData.extraDrawingItems
            .forEach(item => {

                addExtraItemRow();

                const rows =
                    document.querySelectorAll(
                        ".extra-item-row"
                    );

                const lastRow =
                    rows[
                        rows.length - 1
                    ];

                lastRow.querySelector(
                    ".extra-item-name"
                ).value =
                    item.item || "";

                lastRow.querySelector(
                    ".extra-item-reason"
                ).value =
                    item.reason || "";

            });

        }

    }

    // =========================
    // OVERALL REMARKS
    // =========================

    if (
        remarks
    ) {

        remarks.value =
            pageData.overallRemarks || "";

    }

}
// =========================================
// HELPERS
// =========================================

function getCurrentPDFPage() {

    return currentPageNumber;

}

function getTotalPDFPages() {

    return totalPages;

}

function hasPDFLoaded() {

    return (
        pdfDocument !== null
    );

}

// =========================================
// DEBUG
// =========================================

window.showPDFState =
    function () {

        console.log({

            currentPageNumber,

            totalPages,

            loaded:
                pdfDocument !== null

        });

    };

// =========================================
// PDF UPLOAD EVENT
// =========================================

document
.getElementById(
    "gfcPdfInput"
)
?.addEventListener(

    "change",

    async event => {

        const file =
            event.target.files[0];

        if (!file) {
            return;
        }

        await loadPDF(
            file
        );

    }

);
