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

        console.log(
            "BOQ ROWS",
            rows
        );

        if (
            rows.length === 0
        ) {

            alert(
                "No BOQ items found in PDF"
            );

            return;

        }

        sourceRows =
            rows;

        populateReviewGrid(
            rows,
            "BOQ"
        );

    }
    catch (err) {

        console.error(
            "BOQ PDF IMPORT FAILED",
            err
        );

        alert(
            "Failed to parse BOQ PDF"
        );

    }

}

// =====================================
// PDF → RFV STYLE ROWS
// =====================================

function buildBOQRowsFromPDF(text) {

    const rows = [];

    const blocks =
        text.split("QI-");

    blocks.forEach(block => {

        try {

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
                    /(?:Nos|SqFt|Rft|Lumpsum|Unit)\s+(\d+)/i
                );

            if (!skuMatch) {
                return;
            }

            rows.push({

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
                    skuMatch[1].trim(),

                category:
                    categoryMatch
                    ? categoryMatch[1].trim()
                    : ""

            });

        }
        catch(err) {

            console.log(
                "Skip Block",
                err
            );

        }

    });

    return rows;

}
