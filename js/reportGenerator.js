// =====================================
// GENERATE REPORTS
// =====================================

function generateReports() {

    const container =
        document.getElementById(
            "reportContainer"
        );

    container.innerHTML = "";

    generateValidationFindingsReport(
        container
    );


    generateMissingCoverageReport(
        container
    );

    generateExtraScopeReport(
        container
    );


}

// =====================================
// VALIDATION FINDINGS
// =====================================

function generateValidationFindingsReport(
    container
) {

    const section =
        document.createElement(
            "div"
        );

    section.innerHTML =

        `<h3>
            Validation Findings
        </h3>`;

    const table =
        document.createElement(
            "table"
        );

    table.className =
        "report-table";

    table.innerHTML = `

        <tr>

           <th>Page</th>
<th>Room</th>
<th>Drawing Category</th>
<th>Findings</th>

        </tr>

    `;

    validationStore.forEach(row => {

        const tr =
            document.createElement(
                "tr"
            );

        tr.innerHTML = `

            <td>
                ${row.pageNo}
            </td>

            <td>
                ${row.room}
            </td>
<td>
    ${
        (row.categories || [])
        .join(", ")
    }
</td>

            <td>
                ${buildChecklistSummary(
                    row
                )}
            </td>

        `;

        table.appendChild(
            tr
        );

    });

    section.appendChild(
        table
    );

    container.appendChild(
        section
    );

}

// =====================================
// ROOM COVERAGE
// =====================================

function generateRoomCoverageReport(
    container
) {

    const coverage =
        buildRoomCoverage();

    const section =
        document.createElement(
            "div"
        );

    section.innerHTML =

        `<h3>
            Room Coverage Report
        </h3>`;

    let html = "";

    Object.keys(
        coverage
    ).forEach(room => {

        html +=

            `<h4>
                ${room}
            </h4>`;

        html += "<ul>";

        coverage[
            room
        ].forEach(item => {

            html +=

                `<li>

                    ${item.qty}
                    x
                    ${item.item}

                </li>`;

        });

        html += "</ul>";

    });

    section.innerHTML +=
        html;

    container.appendChild(
        section
    );

}

// =====================================
// MISSING COVERAGE
// =====================================

function generateMissingCoverageReport(
    container
) {

    const missing =
        getMissingSKUs();

    const section =
        document.createElement(
            "div"
        );

    section.innerHTML = `
        <h3>
            Missing Coverage Report
        </h3>
    `;

    if (
        missing.length === 0
    ) {

        section.innerHTML += `
            <p>
                No Missing SKUs
            </p>
        `;

        container.appendChild(
            section
        );

        return;

    }

    const table =
        document.createElement(
            "table"
        );

    table.className =
        "report-table";

    table.innerHTML = `
        <tr>
            <th>Qty</th>
            <th>Item</th>
            <th>Room</th>
        </tr>
    `;

    missing.forEach(item => {

        table.innerHTML += `
            <tr>
                <td>${item.qty}</td>
                <td>${item.item}</td>
                <td>${item.room || ""}</td>
            </tr>
        `;

    });

    section.appendChild(
        table
    );

    container.appendChild(
        section
    );

}

// =====================================
// EXTRA SCOPE REPORT
// =====================================

function generateExtraScopeReport(
    container
) {

    const section =
        document.createElement(
            "div"
        );

    section.innerHTML =

        `<h3>
            Drawing vs BOQ Mismatch Report
        </h3>`;

    let html = "";

    validationStore.forEach(page => {

        if (
            !page.extraDrawingItems ||
            page.extraDrawingItems.length === 0
        ) {
            return;
        }

        html +=

            `<h4>

                Page
                ${page.pageNo}

            </h4>`;

        html += "<ul>";

        page.extraDrawingItems.forEach(item => {

            html +=

                `<li>

                    ${item.item}

                    -
                    ${item.reason}

                </li>`;

        });

        html += "</ul>";

    });

    section.innerHTML +=
        html;

    container.appendChild(
        section
    );

}

// =====================================
// MISSING DRAWINGS
// =====================================

function generateMissingDrawingsReport(
    container
) {

    const section =
        document.createElement(
            "div"
        );

    section.innerHTML =

        `<h3>
            Missing Drawings Report
        </h3>`;

    let html = "";

    validationStore.forEach(page => {

        if (
            !page.drawingNotAvailable
        ) {
            return;
        }

        html +=

            `<p>

                Page
                ${page.pageNo}

                :

                ${page.room}

                :

                ${page.drawingMissingReason}

            </p>`;

    });

    section.innerHTML +=
        html;

    container.appendChild(
        section
    );

}

// =====================================
// CHECKLIST SUMMARY
// =====================================

function buildChecklistSummary(
    page
) {

    const absentItems = [];

    const remarks = [];

    (
        page.checklist || []
    ).forEach(item => {

        const status =
            item.status || "";

        const remark =
            (
                item.remark || ""
            ).trim();

        if (
            status === "Absent"
        ) {

            absentItems.push(
                item.title
            );

        }

        if (
            remark !== ""
        ) {

            remarks.push(

                `${item.title}
                :
                ${remark}`

            );

        }

    });

    let text = "";

    if (
        absentItems.length
    ) {

        text +=
            "<b>Absent Items:</b><br>";

        absentItems.forEach(item => {

            text +=
                "• " +
                item +
                "<br>";

        });

        text += "<br>";

    }

    if (
        remarks.length
    ) {

        text +=
            "<b>Remarks:</b><br>";

        remarks.forEach(item => {

            text +=
                "• " +
                item +
                "<br>";

        });

        text += "<br>";

    }

    if (
        page.overallRemarks &&
        page.overallRemarks.trim()
    ) {

        text +=

            "<b>Overall:</b><br>" +

            page.overallRemarks;

    }

    return text;

}

// =====================================
// ITEM FORMAT
// =====================================

function formatItems(items) {

    return items
        .map(item =>

            `${item.qty} | ${item.room} | ${item.item}`

        )
        .join("<br>");

}

// =====================================
// EVENT
// =====================================

document
.getElementById(
    "generateReportBtn"
)
?.addEventListener(

    "click",

    generateReports

);
