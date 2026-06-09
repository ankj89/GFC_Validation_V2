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

function buildBOQRowsFromPDF(
    text
) {

    const rows = [];

    let currentRoom = "";

    let currentCategory = "";

    const lines =
        text
        .split("\n")
        .map(
            line =>
                line.trim()
        )
        .filter(Boolean);

    for (
        let i = 0;
        i < lines.length;
        i++
    ) {

        const line =
            lines[i];

        // ROOM

        if (
            line.startsWith(
                "Location"
            )
        ) {

            currentRoom =

                line
                .split(":")
                .slice(1)
                .join(":")
                .trim();

        }

        // CATEGORY

        if (
            line.startsWith(
                "Super Category"
            )
        ) {

            currentCategory =

                line
                .split(":")
                .slice(1)
                .join(":")
                .trim();

        }

        // SKU

        if (
            line.startsWith(
                "SKU"
            )
        ) {

            const sku =

                line
                .split(":")
                .slice(1)
                .join(":")
                .trim();

            let qty = 0;

            // look ahead

            for (
                let j = i;
                j < Math.min(
                    i + 20,
                    lines.length
                );
                j++
            ) {

                const searchLine =
                    lines[j];

                if (
                    searchLine.startsWith(
                        "Qty"
                    )
                ) {

                    const qtyText =

                        searchLine

                        .replace(
                            "Qty",
                            ""
                        )

                        .replace(
                            ":",
                            ""
                        )

                        .trim();

                    qty =
                        Number(
                            qtyText
                        ) || 0;

                    break;

                }

            }

            rows.push({

                rfvId: "",

                orderId: "",

                pid: "",

                room:
                    currentRoom,

                qty,

                sku,

                category:
                    currentCategory

            });

        }

    }

    return rows;

}
