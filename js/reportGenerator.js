// =========================================
// REPORT GENERATOR
// =========================================

function generateAllReports() {

    const container =
        document.getElementById(
            "reportContainer"
        );

    container.innerHTML = "";

    generateValidationRegister(
        container
    );

    generateSummaryReport(
        container
    );

    generateDAActionReport(
        container
    );

    generateMissingDrawingReport(
        container
    );

    generateBOQCoverageReport(
        container
    );

}

// =========================================
// REPORT SECTION
// =========================================

function createReportSection(
    title
) {

    const section =
        document.createElement("div");

    section.className =
        "report-block";

    section.innerHTML = `
        <h3>${title}</h3>
    `;

    return section;

}

// =========================================
// TABLE CREATOR
// =========================================

function createTable(
    headers,
    rows
) {

    const table =
        document.createElement("table");

    table.className =
        "report-table";

    const thead =
        document.createElement(
            "thead"
        );

    const headerRow =
        document.createElement(
            "tr"
        );

    headers.forEach(header => {

        const th =
            document.createElement(
                "th"
            );

        th.textContent =
            header;

        headerRow.appendChild(
            th
        );

    });

    thead.appendChild(
        headerRow
    );

    table.appendChild(
        thead
    );

    const tbody =
        document.createElement(
            "tbody"
        );

    rows.forEach(row => {

        const tr =
            document.createElement(
                "tr"
            );

        row.forEach(value => {

            const td =
                document.createElement(
                    "td"
                );

            td.textContent =
                value;

            tr.appendChild(td);

        });

        tbody.appendChild(tr);

    });

    table.appendChild(
        tbody
    );

    return table;

}

// =========================================
// REPORT 1
// VALIDATION REGISTER
// =========================================

function generateValidationRegister(
    container
) {

    const section =
        createReportSection(
            "Validation Register"
        );

    const rows = [];

    validationStore.forEach(
        page => {

            page.checklistResults
                .forEach(item => {

                    rows.push([

                        page.page,

                        page.room,

                        page.items.join(
                            ", "
                        ),

                        item.category,

                        item.checklistItem,

                        item.status,

                        item.remarks

                    ]);

                });

        }
    );

    section.appendChild(

        createTable(

            [
                "Page",
                "Room",
                "Items",
                "Category",
                "Checklist Item",
                "Status",
                "Remarks"
            ],

            rows

        )

    );

    container.appendChild(
        section
    );

}

// =========================================
// REPORT 2
// SUMMARY REPORT
// =========================================

function generateSummaryReport(
    container
) {

    const section =
        createReportSection(
            "Summary Report"
        );

    const rows = [];

    getValidationSummary()
        .forEach(summary => {

            rows.push([

                summary.page,

                summary.room,

                summary.itemCount,

                summary.categoryCount,

                summary.totalChecks,

                summary.present,

                summary.absent,

                summary.na

            ]);

        });

    section.appendChild(

        createTable(

            [
                "Page",
                "Room",
                "Items",
                "Categories",
                "Checks",
                "Present",
                "Absent",
                "N/A"
            ],

            rows

        )

    );

    container.appendChild(
        section
    );

}

// =========================================
// REPORT 3
// DA ACTION REPORT
// =========================================

function generateDAActionReport(
    container
) {

    const section =
        createReportSection(
            "DA Action Items"
        );

    const rows = [];

    validationStore.forEach(
        page => {

            page.checklistResults
                .forEach(item => {

                    if (
                        item.status ===
                        "Absent"
                    ) {

                        rows.push([

                            page.page,

                            page.room,

                            page.items.join(
                                ", "
                            ),

                            item.category,

                            item.checklistItem,

                            item.remarks

                        ]);

                    }

                });

        }
    );

    section.appendChild(

        createTable(

            [
                "Page",
                "Room",
                "Items",
                "Category",
                "Missing Item",
                "Remarks"
            ],

            rows

        )

    );

    container.appendChild(
        section
    );

}

// =========================================
// REPORT 4
// MISSING DRAWING REPORT
// =========================================

function generateMissingDrawingReport(
    container
) {

    const section =
        createReportSection(
            "Missing Drawings Report"
        );

    const rows = [];

    getBOQCoverage()
    .forEach(item => {

        if(
            !item.validated
        ) {

            rows.push([

                item.room,

                item.item,

                "Drawing Not Found"

            ]);

        }

    });

    section.appendChild(

        createTable(

            [
                "Room",
                "Item Name",
                "Status"
            ],

            rows

        )

    );

    container.appendChild(
        section
    );

}

// =========================================
// REPORT 5
// BOQ COVERAGE REPORT
// =========================================

function generateBOQCoverageReport(
    container
) {

    const section =
        createReportSection(
            "BOQ Coverage Report"
        );

    const rows = [];

    const coverage =
        getBOQCoverage();

    coverage.forEach(
        row => {

            rows.push([

                row.room,

                row.item,

                row.validated
                    ? "Yes"
                    : "No"

            ]);

        }
    );

    section.appendChild(

        createTable(

            [
                "Room",
                "Item Name",
                "Validated"
            ],

            rows

        )

    );

    container.appendChild(
        section
    );

}

// =========================================
// EXPORT DATA HELPERS
// =========================================

function getValidationRegisterData() {

    const data = [];

    validationStore.forEach(
        page => {

            page.checklistResults
                .forEach(item => {

                    data.push({

                        Page:
                            page.page,

                        Room:
                            page.room,

                        Items:
                            page.items.join(
                                ", "
                            ),

                        Category:
                            item.category,

                        ChecklistItem:
                            item.checklistItem,

                        Status:
                            item.status,

                        Remarks:
                            item.remarks

                    });

                });

        }
    );

    return data;

}

function getDAActionData() {

    const data = [];

    validationStore.forEach(
        page => {

            page.checklistResults
                .forEach(item => {

                    if (
                        item.status ===
                        "Absent"
                    ) {

                        data.push({

                            Page:
                                page.page,

                            Room:
                                page.room,

                            Items:
                                page.items.join(
                                    ", "
                                ),

                            Category:
                                item.category,

                            MissingItem:
                                item.checklistItem,

                            Remarks:
                                item.remarks

                        });

                    }

                });

        }
    );

    return data;

}

function getMissingDrawingData() {

    return validationStore
        .filter(
            page =>
                page.drawingNotAvailable
        )
        .map(page => ({

            Page:
                page.page,

            Room:
                page.room,

            Items:
                page.items.join(
                    ", "
                ),

            Reason:
                page.drawingMissingReason

        }));

}

function getCoverageData() {

    return getBOQCoverage()
        .map(item => ({

            Room:
                item.room,

            Item:
                item.item,

            Validated:
                item.validated
                    ? "Yes"
                    : "No"

        }));

}
