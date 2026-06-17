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

 
    addMissingCoverageSheet(
        workbook
    );

    addMismatchSheet(
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
formatSheet(
    sheet
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

    const data = [[

        "Page",
        "Room",
        "Drawing Category",
        "Absent Items",
        "Findings / Remarks",
        "Overall Remarks"

    ]];

    validationStore.forEach(row => {

        const absentItems =
            (row.checklist || [])
            .filter(
                item =>
                    item.status === "Absent"
            );

        const absentList = [];

        const remarkList = [];

        absentItems.forEach(item => {

            absentList.push(
                item.title
            );

            if (
                item.remark &&
                item.remark.trim()
            ) {

                remarkList.push(
                    `${item.title} : ${item.remark}`
                );

            }

        });

        data.push([

            row.pageNo,

            row.room,

           (row.categories || []).join("\n"),

            absentList.join("\n"),

            remarkList.join("\n"),

            row.overallRemarks || ""

        ]);

    });

    const sheet =
        XLSX.utils.aoa_to_sheet(
            data
        );

    formatSheet(sheet);

    XLSX.utils.book_append_sheet(

        workbook,

        sheet,

        "GFC correction inputs"

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
formatSheet(
    sheet
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
    "Room"
]

    ];

    missing.forEach(item => {

        data.push([

            item.qty,

            item.item,

        item.room || ""

        ]);

    });

    const sheet =

        XLSX.utils.aoa_to_sheet(
            data
        );
formatSheet(
    sheet
);
    XLSX.utils.book_append_sheet(

        workbook,

        sheet,

        "SKUs drawings missing"

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
formatSheet(
    sheet
);
    XLSX.utils.book_append_sheet(

        workbook,

        sheet,

        "Items to be removed from GFC"

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
formatSheet(
    sheet
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
function buildChecklistSummaryExcel(
    row
) {

    const lines = [];

    const absentItems =

        (row.checklist || [])
        .filter(
            item =>
                item.status ===
                "Absent"
        );

    if (
        absentItems.length
    ) {

        lines.push(
            "Absent Items:"
        );

        absentItems.forEach(
            item => {

               lines.push(
    `• ${item.title}`
);

if (
    item.remark
) {

    lines.push(
    `    Comment: ${
        String(item.remark || "")
            .replace(/\r/g, "")
            .replace(/_x000D_/g, "")
    }`
);

}

lines.push("");

            }
        );

    }

    if (
        row.overallRemarks
    ) {

        lines.push("");

        lines.push(
            "Overall Remarks:"
        );

lines.push(
    String(row.overallRemarks || "")
        .replace(/\r/g, "")
        .replace(/_x000D_/g, "")
);

    }

   const text =
    lines.join("\n");

return text
    .replace(/\r/g, "")
    .replace(/_x000D_/g, "");
}


function formatSheet(sheet) {

    const range =
        XLSX.utils.decode_range(
            sheet["!ref"]
        );

    const cols = [];

    for (
        let C = range.s.c;
        C <= range.e.c;
        ++C
    ) {

        let maxLen = 15;

        for (
            let R = range.s.r;
            R <= range.e.r;
            ++R
        ) {

            const cell =
                sheet[
                    XLSX.utils.encode_cell({
                        r: R,
                        c: C
                    })
                ];

            if (!cell) continue;

            const len =
                String(
                    cell.v || ""
                ).length;

            maxLen =
                Math.max(
                    maxLen,
                    len
                );

        }

        cols.push({

            wch: Math.min(
                maxLen + 5,
                120
            )

        });

    }

    sheet["!cols"] =
        cols;
sheet["!rows"] = [];

for (
    let i = 0;
    i < 500;
    i++
) {

    sheet["!rows"].push({
        hpt: 60
    });

}
 
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
