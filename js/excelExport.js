// =====================================
// EXPORT EXCEL
// =====================================

function exportExcel() {

    const workbook =
        XLSX.utils.book_new();

    addProjectInfoSheet(
        workbook
    );

    addValidationSheet(
        workbook
    );

    addCoverageSheet(
        workbook
    );

    addMissingCoverageSheet(
        workbook
    );

    addMismatchSheet(
        workbook
    );

    addMissingDrawingSheet(
        workbook
    );

    const projectInfo =
        getProjectInfo();

    const fileName =

        `GFC_Validation_${
            projectInfo.gfcId || "Project"
        }.xlsx`;

    XLSX.writeFile(
        workbook,
        fileName
    );

}

// =====================================
// PROJECT INFO
// =====================================

function addProjectInfoSheet(
    workbook
) {

    const info =
        getProjectInfo();

    const data = [

        ["Field", "Value"],

        ["GFC ID", info.gfcId],

        ["RFV ID", info.rfvId],

        ["Order ID", info.orderId],

        ["PID", info.pid],

        ["Source", info.sourceType]

    ];

    const sheet =

        XLSX.utils.aoa_to_sheet(
            data
        );

    XLSX.utils.book_append_sheet(

        workbook,

        sheet,

        "Project Info"

    );

}

// =====================================
// VALIDATION FINDINGS
// =====================================

function addValidationSheet(
    workbook
) {

    const data = [

        [
            "Page",
            "Room",
            "Items",
            "Findings"
        ]

    ];

    validationStore.forEach(row => {

        data.push([

            row.pageNo,

            row.room,

            row.items
                .map(item =>

                    `${item.qty}_${item.item}`

                )
                .join(", "),

            stripHTML(

                buildChecklistSummary(
                    row
                )

            )

        ]);

    });

    const sheet =

        XLSX.utils.aoa_to_sheet(
            data
        );

    XLSX.utils.book_append_sheet(

        workbook,

        sheet,

        "Validation"

    );

}

// =====================================
// ROOM COVERAGE
// =====================================

function addCoverageSheet(
    workbook
) {

    const coverage =
        buildRoomCoverage();

    const data = [

        [
            "Room",
            "Qty",
            "Item",
            "Category"
        ]

    ];

    Object.keys(
        coverage
    ).forEach(room => {

        coverage[
            room
        ].forEach(item => {

            data.push([

                room,

                item.qty,

                item.item,

                item.category

            ]);

        });

    });

    const sheet =

        XLSX.utils.aoa_to_sheet(
            data
        );

    XLSX.utils.book_append_sheet(

        workbook,

        sheet,

        "Coverage"

    );

}

// =====================================
// MISSING COVERAGE
// =====================================

function addMissingCoverageSheet(
    workbook
) {

    const missing =
        getMissingSKUs();

    const data = [

        [
            "Qty",
            "Item",
            "Category"
        ]

    ];

    missing.forEach(item => {

        data.push([

            item.qty,

            item.item,

            item.category

        ]);

    });

    const sheet =

        XLSX.utils.aoa_to_sheet(
            data
        );

    XLSX.utils.book_append_sheet(

        workbook,

        sheet,

        "Missing Coverage"

    );

}

// =====================================
// BOQ MISMATCH
// =====================================

function addMismatchSheet(
    workbook
) {

    const data = [

        [
            "Page",
            "Item",
            "Reason"
        ]

    ];

    validationStore.forEach(page => {

        (
            page.extraDrawingItems || []
        ).forEach(item => {

            data.push([

                page.pageNo,

                item.item,

                item.reason

            ]);

        });

    });

    const sheet =

        XLSX.utils.aoa_to_sheet(
            data
        );

    XLSX.utils.book_append_sheet(

        workbook,

        sheet,

        "BOQ Mismatch"

    );

}

// =====================================
// MISSING DRAWINGS
// =====================================

function addMissingDrawingSheet(
    workbook
) {

    const data = [

        [
            "Page",
            "Room",
            "Reason"
        ]

    ];

    validationStore.forEach(page => {

        if (
            !page.drawingNotAvailable
        ) {
            return;
        }

        data.push([

            page.pageNo,

            page.room,

            page.drawingMissingReason

        ]);

    });

    const sheet =

        XLSX.utils.aoa_to_sheet(
            data
        );

    XLSX.utils.book_append_sheet(

        workbook,

        sheet,

        "Missing Drawings"

    );

}

// =====================================
// HTML CLEANER
// =====================================

function stripHTML(
    html
) {

    const div =
        document.createElement(
            "div"
        );

    div.innerHTML =
        html;

    return div.innerText;

}

// =====================================
// EVENT
// =====================================

document
.getElementById(
    "exportExcelBtn"
)
?.addEventListener(

    "click",

    exportExcel

);
