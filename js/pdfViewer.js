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

prevPageBtn
?.addEventListener(
    "click",
    async () => {

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

nextPageBtn
?.addEventListener(
    "click",
    async () => {

        if (
            currentPageNumber >=
            totalPages
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

    if (
        typeof getValidationByPage !==
        "function"
    ) {

        return;

    }

    const pageData =
        getValidationByPage(
            pageNumber
        );

    // No saved data

    if (
        !pageData
    ) {

        clearValidationForm();

        return;

    }

    // Restore saved data

    restoreValidationForm(
        pageData
    );

}

// =========================================
// CLEAR FORM
// =========================================

function clearValidationForm() {

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

    const remarks =
        document.getElementById(
            "overallRemarks"
        );

   if (roomDropdown) {

    roomDropdown.value = "";

    roomDropdown.dispatchEvent(
        new Event("change")
    );

}

    if (remarks)
        remarks.value = "";

    // Clear item selections

    if (itemDropdown) {

        Array.from(
            itemDropdown.options
        ).forEach(option => {

            option.selected = false;

        });

    }

    // Clear category selections

    if (categoryDropdown) {

        Array.from(
            categoryDropdown.options
        ).forEach(option => {

            option.selected = false;

        });

    }

    // Clear checklist selections

    document
        .querySelectorAll(
            '.checklist-item input[type="radio"]'
        )
        .forEach(radio => {

            radio.checked = false;

        });

    // Clear checklist remarks

    document
        .querySelectorAll(
            ".item-remark"
        )
        .forEach(input => {

            input.value = "";

        });

    // Clear overall remarks

    const overallRemarks =
        document.getElementById(
            "overallRemarks"
        );

    if (overallRemarks) {

        overallRemarks.value = "";

    }

    // Clear extra items

    const extraContainer =
        document.getElementById(
            "extraItemsContainer"
        );

    if (extraContainer) {

        extraContainer.innerHTML = "";

    }

}

// =========================================
// RESTORE FORM
// =========================================

function restoreValidationForm(
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

    const categoryDropdown =
        document.getElementById(
            "categoryDropdown"
        );

    const remarks =
        document.getElementById(
            "overallRemarks"
        );

    const dna =
        document.getElementById(
            "drawingNotAvailable"
        );

    const dnaReason =
        document.getElementById(
            "drawingMissingReason"
        );

    // Room

    if (
        roomDropdown
    ) {

        roomDropdown.value =
            pageData.room;

        roomDropdown.dispatchEvent(
            new Event(
                "change"
            )
        );

    }

    // Items

    if (
        itemDropdown
        &&
        pageData.items
    ) {

        Array.from(
            itemDropdown.options
        ).forEach(
            option => {

                option.selected =
                    pageData.items.includes(
                        option.value
                    );

            }
        );

    }

    // Categories

    if (
        categoryDropdown
        &&
        pageData.categories
    ) {

        Array.from(
            categoryDropdown.options
        ).forEach(
            option => {

                option.selected =
                    pageData.categories.includes(
                        option.value
                    );

            }
        );

    }

    // Checklist

    if (
        typeof generateChecklist ===
        "function"
    ) {

        generateChecklist();

    }

    // Remarks

    if (
        remarks
    ) {

        remarks.value =
            pageData.overallRemarks ||
            "";

    }

    // DNA

    if (
        dna
    ) {

        dna.checked =
            pageData.drawingNotAvailable ||
            false;

    }

    if (
        dnaReason
    ) {

        dnaReason.value =
            pageData.drawingMissingReason ||
            "";

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
