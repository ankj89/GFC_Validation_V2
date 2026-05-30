// =========================================
// BOQ PARSER
// =========================================

const projectMaster = {

    rooms: [],

    roomItemMap: {},

    itemCategoryMap: {},

    boqRows: []

};

// =========================================
// DOM
// =========================================

const boqInput =
    document.getElementById(
        "boqPdfInput"
    );

const roomDropdown =
    document.getElementById(
        "roomDropdown"
    );

const itemDropdown =
    document.getElementById(
        "itemDropdown"
    );

// =========================================
// BOQ UPLOAD
// =========================================

boqInput?.addEventListener(
    "change",
    handleBOQUpload
);

async function handleBOQUpload(
    event
) {

    const file =
        event.target.files[0];

    if (!file) return;

    try {

        const arrayBuffer =
            await file.arrayBuffer();

        const pdfData =
            new Uint8Array(
                arrayBuffer
            );

        const pdf =
            await pdfjsLib
                .getDocument(pdfData)
                .promise;

        await parseBOQ(pdf);

        populateRoomDropdown();

        console.log(
            "BOQ Parsed",
            projectMaster
        );

        alert(
            "BOQ Successfully Parsed"
        );

    } catch (error) {

        console.error(error);

        alert(
            "Error parsing BOQ"
        );

    }

}
/*extract item name from item code*/
function tryExtractItemFromQIRow(row) {

    if (!row.includes("QI-")) {
        return null;
    }

    const cleanRow =
        row.replace(/\s+/g, " ").trim();

    // Remove QI code

    const withoutCode =
        cleanRow.replace(
            /^QI-[A-Z0-9\-]+\s*/i,
            ""
        );

    const stopWords = [

        "Brand",
        "Location",
        "SqFt",
        "Nos",
        "RFt",
        "RFT",
        "Package",
        "Description",
        "₹"

    ];

    let itemName =
        withoutCode;

    let firstStopIndex =
        itemName.length;

    stopWords.forEach(word => {

        const idx =
            itemName.indexOf(word);

        if (
            idx > 0 &&
            idx < firstStopIndex
        ) {

            firstStopIndex = idx;

        }

    });

    itemName =
        itemName
            .substring(
                0,
                firstStopIndex
            )
            .trim();

    return itemName;

}

// =========================================
// PARSE BOQ
// =========================================

async function parseBOQ(pdf) {

    resetProjectMaster();

    let currentRoom = "";
    let lastDetectedRoom = "";
    let currentItem = "";

    for (let pageNo = 1; pageNo <= pdf.numPages; pageNo++) {

        const page = await pdf.getPage(pageNo);

        const textContent =
            await page.getTextContent();

        const rows =
            buildRowsFromPDF(
                textContent.items
            );

        console.log(
            "PAGE",
            pageNo,
            rows
        );

        for (let i = 0; i < rows.length; i++) {

            const row =
                rows[i]
                .replace(/\s+/g, " ")
                .trim();

            if (!row) continue;

            // =====================
            // ROOM HEADER
            // =====================

            if (
                isActualRoomHeader(
                    row
                )
            ) {

                currentRoom =
                    row;

                lastDetectedRoom =
                    row;

                if (
                    !projectMaster.rooms.includes(
                        currentRoom
                    )
                ) {

                    projectMaster.rooms.push(
                        currentRoom
                    );

                    projectMaster.roomItemMap[
                        currentRoom
                    ] = [];

                }

                continue;
            }

            // =====================
            // ITEM NAME
            // =====================

            const itemName =
    tryExtractItemFromQIRow(
        row
    );

if (
    itemName
) {

    if (
        !currentRoom
    ) {

        currentRoom =
            lastDetectedRoom;
    }

    if (
        currentRoom
    ) {

        currentItem =
            itemName;

        addItemToRoom(
            currentRoom,
            itemName
        );

        console.log(
            "ITEM ADDED",
            currentRoom,
            itemName
        );

    }

}
            // =====================
            // SUPER CATEGORY
            // =====================

            if (
                row.includes(
                    "Super Category"
                )
            ) {

                let superCategory =
                    row
                        .replace(
                            "Super Category",
                            ""
                        )
                        .replace(
                            ":",
                            ""
                        )
                        .trim();

                if (
                    !superCategory &&
                    rows[i + 1]
                ) {

                    superCategory =
                        rows[i + 1]
                        .trim();
                }

                if (
                    currentItem
                ) {

                    ensureItemMap(
                        currentItem
                    );

                    projectMaster
                        .itemCategoryMap[
                        currentItem
                    ]
                        .superCategory =
                        superCategory;
                }

                continue;
            }

            // =====================
            // SUB CATEGORY
            // =====================

            if (
                row.includes(
                    "Sub Super Category"
                )
            ) {

                let subCategory =
                    row
                        .replace(
                            "Sub Super Category",
                            ""
                        )
                        .replace(
                            ":",
                            ""
                        )
                        .trim();

                if (
                    !subCategory &&
                    rows[i + 1]
                ) {

                    subCategory =
                        rows[i + 1]
                        .trim();
                }

                if (
                    currentItem
                ) {

                    ensureItemMap(
                        currentItem
                    );

                    projectMaster
                        .itemCategoryMap[
                        currentItem
                    ]
                        .subCategory =
                        subCategory;
                }

                continue;
            }

            // =====================
            // FALLBACK LOCATION
            // =====================

            if (
                row.includes(
                    "Location"
                )
            ) {

                const fallbackRoom =
                    extractRoomFromDescription(
                        row
                    );

                if (
                    fallbackRoom
                ) {

                    currentRoom =
                        fallbackRoom;

                    lastDetectedRoom =
                        fallbackRoom;

                    if (
                        !projectMaster.rooms.includes(
                            currentRoom
                        )
                    ) {

                        projectMaster.rooms.push(
                            currentRoom
                        );

                        projectMaster.roomItemMap[
                            currentRoom
                        ] = [];
                    }
                }
            }
        }
    }

    populateRoomDropdown();

    console.log(
        "ROOM ITEM MAP"
    );

    console.log(
        JSON.stringify(
            projectMaster.roomItemMap,
            null,
            2
        )
    );

}
// =========================================
// ROOM DETECTION
// =========================================

function isActualRoomHeader(text) {

    const clean =
        text.trim();

    if (
        clean.includes("QI-")
    ) {
        return false;
    }

    if (
        clean.includes("₹")
    ) {
        return false;
    }

    if (
        /\d/.test(clean)
    ) {
        return false;
    }

    const ignore = [

        "ITEM CODE",
        "ITEM NAME",
        "SPECIFICATIONS",
        "DESCRIPTION",
        "UNIT",
        "QTY",
        "SP UNIT",
        "TOTAL PRICE",
        "SKU",
        "CATEGORY",
        "SUB CATEGORY",
        "BRAND",
        "LOCATION"

    ];

    if (
        ignore.some(
            x =>
                clean
                    .toUpperCase()
                    .includes(x)
        )
    ) {

        return false;

    }

    return (

        clean ===
        clean.toUpperCase()

        &&

        clean.length > 2

        &&

        clean.length < 60

    );

}

function extractRoomFromDescription(
    text
) {

    const match =
        text.match(
            /Location\s*:\s*([^:]+)/i
        );

    if (
        match
    ) {

        return match[1]
            .replace(
                /Service On.*/i,
                ""
            )
            .trim();
    }

    return "";

}
// =========================================
// BUILD ROWS
// =========================================

function buildRowsFromPDF(
    items
) {

    const rows = [];

    items.sort(
        (a, b) => {

            const yDiff =
                b.transform[5] -
                a.transform[5];

            if (
                Math.abs(
                    yDiff
                ) > 3
            ) {

                return yDiff;

            }

            return (
                a.transform[4] -
                b.transform[4]
            );

        }
    );

    items.forEach(item => {

        const y =
            item.transform[5];

        let row =
            rows.find(
                r =>
                    Math.abs(
                        r.y - y
                    ) < 3
            );

        if (!row) {

            row = {

                y,

                text: []

            };

            rows.push(
                row
            );

        }

        row.text.push(
            item.str
        );

    });

    return rows.map(
        row =>
            row.text.join(
                " "
            )
    );

}

// =========================================
// EXTRACT VALUE
// =========================================

function extractValue(
    text,
    label
) {

    const index =
        text.indexOf(
            label
        );

    if (
        index === -1
    ) return "";

    return text
        .substring(
            index +
            label.length
        )
        .replace(
            ":",
            ""
        )
        .trim();

}

// =========================================
// ADD ITEM
// =========================================

function addItemToRoom(
    room,
    item
) {

    if (
        !projectMaster.roomItemMap[
            room
        ]
    ) {

        projectMaster.roomItemMap[
            room
        ] = [];

    }

    const alreadyExists =
        projectMaster
            .roomItemMap[
            room
        ]
            .some(
                existing =>

                    existing
                        .trim()
                        .toLowerCase() ===

                    item
                        .trim()
                        .toLowerCase()
            );

    if (
        !alreadyExists
    ) {

        projectMaster
            .roomItemMap[
            room
        ]
            .push(
                item
            );

    }

}

// =========================================
// ITEM CATEGORY OBJECT
// =========================================

function ensureItemMap(
    item
) {

    if (
        !projectMaster
            .itemCategoryMap[
            item
        ]
    ) {

        projectMaster
            .itemCategoryMap[
            item
        ] = {

            superCategory:
                "",

            subCategory:
                ""

        };

    }

}

// =========================================
// LAST ITEM
// =========================================

function getLastRoomItem(
    room
) {

    const items =
        projectMaster
            .roomItemMap[
            room
        ];

    if (
        !items ||
        items.length === 0
    ) {

        return null;

    }

    return items[
        items.length - 1
    ];

}

// =========================================
// POPULATE ROOMS
// =========================================

function populateRoomDropdown() {

    roomDropdown.innerHTML =
        `
        <option value="">
        Select Room
        </option>
        `;

    projectMaster.rooms
        .forEach(room => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                room;

            option.textContent =
                room;

            roomDropdown
                .appendChild(
                    option
                );

        });

}

// =========================================
// ROOM CHANGE
// =========================================

roomDropdown?.addEventListener(
    "change",
    handleRoomChange
);

function handleRoomChange() {

    const room =
        roomDropdown.value;

    itemDropdown.innerHTML =
        "";

    if (
        !room
    ) return;

    const items =
        projectMaster
            .roomItemMap[
            room
        ] || [];

    console.log(
        "ROOM",
        room
    );

    console.log(
        "ITEMS",
        items
    );

    items.forEach(item => {

        const option =
            document.createElement(
                "option"
            );

        option.value =
            item;

        option.textContent =
            item;

        itemDropdown.appendChild(
            option
        );

    });

}

// =========================================
// ITEM CHANGE
// =========================================

itemDropdown?.addEventListener(
    "change",
    autoSuggestCategories
);

function autoSuggestCategories() {

    const selectedItems =
        Array.from(
            itemDropdown.selectedOptions
        ).map(
            option => option.value
        );

    const categories =
        new Set();

    selectedItems.forEach(item => {

        const itemData =
            projectMaster
                .itemCategoryMap[
                item
            ];

        if (!itemData) return;

        [
            itemData.superCategory,
            itemData.subCategory
        ].forEach(value => {

            const mapped =
                CATEGORY_MAPPING[
                    value
                ];

            if (
                mapped
            ) {

                mapped.forEach(
                    category =>
                        categories.add(
                            category
                        )
                );

            }

        });

    });

    Array.from(
        categoryDropdown.options
    ).forEach(option => {

        option.selected =
            categories.has(
                option.value
            );

    });

    generateChecklist();

}

// =========================================
// RESET
// =========================================

function resetProjectMaster() {

    projectMaster.rooms = [];

    projectMaster.roomItemMap = {};

    projectMaster.itemCategoryMap = {};

    projectMaster.boqRows = [];

}
