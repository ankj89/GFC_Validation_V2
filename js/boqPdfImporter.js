function buildBOQRowsFromPDF(text) {

    const rows = [];

    let currentRoom = "";
    let currentCategory = "";

    const lines = text
        .split("\n")
        .map(x => x.trim())
        .filter(Boolean);

    for (let i = 0; i < lines.length; i++) {

        const line = lines[i];

        if (line.startsWith("Location")) {

            currentRoom =
                line.split(":")[1]?.trim() || "";

        }

        if (
            line.startsWith("Super Category")
        ) {

            currentCategory =
                line.split(":")[1]?.trim() || "";

        }

        if (
            line.startsWith("SKU")
        ) {

            const item =
                line.split(":")[1]?.trim() || "";

            let qty = 0;

            for (
                let j = i;
                j < Math.min(i + 10, lines.length);
                j++
            ) {

                if (
                    lines[j]
                    .startsWith("Qty")
                ) {

                    qty =
                        Number(
                            lines[j]
                            .replace(
                                "Qty",
                                ""
                            )
                            .replace(
                                ":",
                                ""
                            )
                            .trim()
                        ) || 0;

                    break;
                }
            }

            rows.push({

                rfvId: "",

                orderId: "",

                pid: "",

                room: currentRoom,

                item,

                qty,

                category:
                    currentCategory

            });

        }

    }

    return rows;

}

function loadBOQRowsIntoReview(rows) {

    const tbody =
        document.getElementById(
            "boqReviewBody"
        );

    tbody.innerHTML = "";

    rows.forEach(row => {

        tbody.innerHTML += `

        <tr>

            <td>
                <input class="rfv-input"
                    value="${row.rfvId}">
            </td>

            <td>
                <input class="order-input"
                    value="${row.orderId}">
            </td>

            <td>
                <input class="pid-input"
                    value="${row.pid}">
            </td>

            <td>
                <input class="room-input"
                    value="${row.room}">
            </td>

            <td>
                <input class="qty-input"
                    value="${row.qty}">
            </td>

            <td>
                <input class="item-input"
                    value="${row.item}">
            </td>

            <td>
                <input class="category-input"
                    value="${row.category}">
            </td>

        </tr>

        `;

    });

    document
        .getElementById(
            "boqReviewSection"
        )
        .classList
        .remove("hidden");

}
async function handleBOQPDFImport(file) {

    const arrayBuffer =
        await file.arrayBuffer();

    const pdf =
        await pdfjsLib
        .getDocument({
            data: arrayBuffer
        }).promise;

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

    const rows =
        buildBOQRowsFromPDF(
            fullText
        );

    console.log(
        "BOQ Rows",
        rows
    );

    window.sourceType =
        "BOQ PDF";

    loadBOQRowsIntoReview(
        rows
    );

}
