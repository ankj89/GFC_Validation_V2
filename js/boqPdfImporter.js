// =====================================
// BOQ PDF IMPORTER
// =====================================

async function handleBOQPDFImport(
    file
) {

    try {

        const arrayBuffer =
            await file.arrayBuffer();

        const pdf =
            await pdfjsLib
            .getDocument({
                data: arrayBuffer
            })
            .promise;

        let fullText = "";

        for (

            let pageNum = 1;

            pageNum <= pdf.numPages;

            pageNum++

        ) {

            const page =
                await pdf.getPage(
                    pageNum
                );

            const content =
                await page.getTextContent();

            fullText +=

                content.items

                .map(
                    item => item.str
                )

                .join(" ")

                + "\n";

        }

        console.log(
            "PDF TEXT",
            fullText
        );

        const rows =
            buildBOQRowsFromPDF(
                fullText
            );

        console.table(
            rows
        );

        if (
            rows.length === 0
        ) {

            alert(
                "No identifiable BOQ rows found"
            );

            return;

        }

        sourceRows =
            rows;

        populateReviewGrid(
            rows,
            "BOQ"
        );

        alert(

            `${rows.length} BOQ rows imported`

        );

    }
    catch (err) {

        console.error(
            err
        );

        alert(
            "BOQ import failed"
        );

    }

}

// =====================================
// PDF → RFV STYLE ROWS
// =====================================

function buildBOQRowsFromPDF(text) {

    const rows = [];

    // =========================
    // FORMAT 1
    // Location/SKU/Category BOQs
    // =========================

    const blocks =
        text.split("QI-");

    blocks.forEach(block => {

        const roomMatch =
            block.match(
                /Location\s*:\s*(.*?)\s*Elevation/i
            );

        const categoryMatch =
            block.match(
                /Super Category\s*:\s*(.*?)\s*Sub Super Category/i
            );

        const skuMatch =
            block.match(
                /SKU\s*:\s*(.*?)\s*Description/i
            );

        const qtyMatch =
            block.match(
                /(?:Nos|SqFt|Rft|Lumpsum|Unit)\s+(\d+(?:\.\d+)?)/i
            );

        const row = {

            rfvId: "",

            orderId: "",

            pid: "",

            room:
                roomMatch
                ? roomMatch[1].trim()
                : "",

            qty:
                qtyMatch
                ? Number(
                    qtyMatch[1]
                )
                : 0,

            sku:
                skuMatch
                ? skuMatch[1].trim()
                : "",

            category:
                categoryMatch
                ? categoryMatch[1].trim()
                : ""

        };

        if (

            row.room ||
            row.qty ||
            row.sku ||
            row.category

        ) {

            rows.push(row);

        }

    });

    // =========================
    // FORMAT 2
    // Table style BOQs
    // =========================

    if (rows.length === 0) {

        const regex =

            /QI-\d+\s+(.*?)\s+(?:Nos|SqFt|Rft|Lumpsum|Unit)\s+(\d+(?:\.\d+)?)/gi;

        let match;

        while (

            (match = regex.exec(text))

            !== null

        ) {

            rows.push({

                rfvId: "",

                orderId: "",

                pid: "",

                room: "",

                qty:
                    Number(
                        match[2]
                    ) || 0,

                sku:
                    match[1]
                    .trim(),

                category: ""

            });

        }

    }

    // =========================
    // REMOVE DUPLICATES
    // =========================

    const unique = [];

    const seen = new Set();

    rows.forEach(row => {

        const key =

            `${row.room}|${row.qty}|${row.sku}`;

        if (
            !seen.has(key)
        ) {

            seen.add(key);

            unique.push(row);

        }

    });

    return unique;

}
