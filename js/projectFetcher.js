// =====================================
// CONFIG
// =====================================

const APPS_SCRIPT_URL =
    "https://script.google.com/a/macros/livspace.com/s/AKfycbx4amRLzfEjqEQPU2inR9ZxDv_XyoZsod5lFnYcEdy-vY4cePrHw0w30N4drHrrvo9I/exec";

// =====================================
// GLOBAL
// =====================================

let sourceRows = [];

// =====================================
// FETCH PROJECT
// =====================================
/*
async function fetchProject() {

    const rows = [

        {
            pid: "PID001",
            sku: "TV Unit",
            qty: 1,
            category: "Carpentry"
        },

        {
            pid: "PID001",
            sku: "Wallpaper",
            qty: 120,
            category: "Painting"
        },

        {
            pid: "PID001",
            sku: "False Ceiling",
            qty: 1,
            category: "False Ceiling"
        }

    ];

    sourceRows = rows;

    populateReviewGrid(
        rows,
        "RFV"
    );

}
*/



async function fetchProject() {

    const rfvId =
        document
        .getElementById(
            "rfvIdInput"
        )
        .value
        .trim();

    const orderId =
        document
        .getElementById(
            "orderIdInput"
        )
        .value
        .trim();

    if (
        !rfvId &&
        !orderId
    ) {

        alert(
            "Enter RFV ID or Order ID"
        );

        return;

    }

    const callbackName =
        "projectCallback_" +
        Date.now();

    let script;

    window[callbackName] =
        function(rows) {

            try {

                sourceRows =
                    rows;

                if (
                    !rows ||
                    rows.length === 0
                ) {

                    alert(
                        "Project not found"
                    );

                    return;

                }

                populateReviewGrid(
                    rows,
                    "RFV"
                );

            }
            finally {

                delete window[
                    callbackName
                ];

                if (
                    script &&
                    script.parentNode
                ) {

                    script.parentNode
                    .removeChild(
                        script
                    );

                }

            }

        };

    let url =
        APPS_SCRIPT_URL;

    if (rfvId) {

        url +=
            "?rfv=" +
            encodeURIComponent(
                rfvId
            );

    }
    else {

        url +=
            "?order=" +
            encodeURIComponent(
                orderId
            );

    }

    url +=
        "&callback=" +
        callbackName;

    script =
        document.createElement(
            "script"
        );

    script.src =
        url;

console.log("JSONP URL:", url);

script.onerror = function(err){

    console.error(
        "SCRIPT LOAD FAILED",
        err
    );

    alert(
        "Script load failed"
    );

};

script.onload = function(){

    console.log(
        "SCRIPT LOADED"
    );

};

    
    document.body.appendChild(
        script
    );

}

// =====================================
// POPULATE REVIEW GRID
// =====================================

function populateReviewGrid(
    rows,
    sourceType
) {

    const section =
        document.getElementById(
            "boqReviewSection"
        );

    const body =
        document.getElementById(
            "boqReviewBody"
        );

    body.innerHTML = "";

    rows.forEach(row => {

    addReviewRow({

    rfvId:
        row.rfvId,

    orderId:
        row.orderId,

    pid:
        row.pid,

    room:
        row.room,

    qty:
        row.qty,

    sku:
        row.sku,

    category:
        row.category

});

    });

    section.classList.remove(
        "hidden"
    );
renderImportSummary(
    rows,
    sourceType
);
    window.sourceType =
        sourceType;

}

// =====================================
// ADD REVIEW ROW
// =====================================

function addReviewRow(
    data = {}
) {

    const body =
        document.getElementById(
            "boqReviewBody"
        );

    const tr =
        document.createElement(
            "tr"
        );

    tr.innerHTML = `

    <td>
        <input
            class="rfv-input"
            value="${data.rfvId || ""}">
    </td>

    <td>
        <input
            class="order-input"
            value="${data.orderId || ""}">
    </td>

    <td>
        <input
            class="pid-input"
            value="${data.pid || ""}">
    </td>

    <td>
        <input
            class="room-input"
            value="${data.room || ""}">
    </td>

    <td>
        <input
            class="qty-input"
            type="number"
            value="${data.qty || ""}">
    </td>

    <td>
        <input
            class="item-input"
            value="${data.sku || ""}">
    </td>

    <td>
        <input
            class="category-input"
            value="${data.category || ""}">
    </td>

    <td>
        <input
            type="checkbox"
            class="row-selector">
    </td>

    `;

    body.appendChild(
        tr
    );

}

// =====================================
// ADD ROW BUTTON
// =====================================

function addManualReviewRow() {

  addReviewRow({

    rfvId: "",

    orderId: "",

    pid: "",

    room: "",

    qty: "",

    sku: "",

    category: ""

});

}

// =====================================
// DELETE ROWS
// =====================================

function deleteSelectedRows() {

    document
    .querySelectorAll(
        ".row-selector:checked"
    )
    .forEach(cb => {

        cb.closest(
            "tr"
        ).remove();

    });

}

// =====================================
// BOQ UPLOAD
// =====================================

async function handleRFVExcelUpload(
    file
) {

    const data =
        await file.arrayBuffer();

    const workbook =
        XLSX.read(
            data,
            {
                type: "array"
            }
        );

    const sheetName =
        workbook.SheetNames[0];

    const sheet =
        workbook.Sheets[
            sheetName
        ];

    const rows =
        XLSX.utils.sheet_to_json(
            sheet,
            {
                defval: ""
            }
        );

    const formattedRows =
rows

.filter(row=>

    row["SKU Name"] ||

    row["Room"] ||

    row["Room name"]

)

.map(row=>({

            rfvId:
                row["RFV ID"],

            orderId:
                row["Order ID"],

            pid:
                row["PID"],

            room:
    row["Room name"] ||
    row["Room"] ||
    "",

            qty:
                row["Qty"],

            sku:
                row["SKU Name"],

            category:
                row["Category"]

        }));

    sourceRows =
        formattedRows;

    populateReviewGrid(
        formattedRows,
        "RFV"
    );

}

function renderImportSummary(
    rows,
    sourceType
){

    const summary =
        document.getElementById(
            "importSummary"
        );

    if(!summary) return;

    const totalRows =
        rows.length;

    const totalQty =
        rows.reduce(

            (sum,row)=>

                sum +
                Number(row.qty || 0),

            0

        );

    let html =

        `<b>${sourceType} Import Summary</b><br><br>`;

    html +=

        `Rows Imported : ${totalRows}<br>`;

    html +=

        `Total Qty : ${totalQty}<br>`;

    if(sourceType==="RFV"){

        html +=

        `Amount Check : Compare with RFV before proceeding`;

    }

    else{

        html +=

        `Amount Check : Compare with BOQ before proceeding`;

    }

    summary.innerHTML =
        html;

}



// =====================================
// EVENTS
// =====================================

const addRowBtn =
    document.getElementById(
        "addRowBtn"
    );

if (addRowBtn) {

    addRowBtn.addEventListener(
        "click",
        addManualReviewRow
    );

}

const deleteRowBtn =
    document.getElementById(
        "deleteRowBtn"
    );

if (deleteRowBtn) {

    deleteRowBtn.addEventListener(
        "click",
        deleteSelectedRows
    );

}

const boqPdfInput =
    document.getElementById(
        "boqPdfInput"
    );

if (boqPdfInput) {

    boqPdfInput.addEventListener(
        "change",
        async e => {

            const file =
                e.target.files[0];

            if (!file) {
                return;
            }

           await handleBOQPDFImport(
    file
);

        }
    );

}

const rfvExcelInput =
    document.getElementById(
        "rfvExcelInput"
    );

if (rfvExcelInput) {

    rfvExcelInput.addEventListener(
        "change",
        async e => {

            const file =
                e.target.files[0];

            if (!file) {
                return;
            }

            await handleRFVExcelUpload(
                file
            );

        }
    );

}
