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

// =========================================
// PARSE BOQ
// =========================================

async function parseBOQ(pdf) {

    resetProjectMaster();

    let currentRoom = "";

    for (
        let pageNo = 1;
        pageNo <= pdf.numPages;
        pageNo++
    ) {

        const page =
            await pdf.getPage(
                pageNo
            );

        const textContent =
            await page.getTextContent();

        const rows =
            buildRowsFromPDF(
                textContent.items
            );

        rows.forEach(row => {

            const text =
                row.trim();

            // ==================
            // ROOM HEADER
            // ==================

            if (
                isRoomHeader(text)
            ) {

                currentRoom =
                    text;

                if (
                    !projectMaster.rooms
                        .includes(
                            currentRoom
                        )
                ) {

                    projectMaster.rooms
                        .push(
                            currentRoom
                        );

                    projectMaster
                        .roomItemMap[
                        currentRoom
                    ] = [];

                }

                return;
            }

            // ==================
            // ITEM NAME
            // ==================

            if (
                text.includes(
                    "Item Name"
                )
            ) {

                const itemName =
                    extractValue(
                        text,
                        "Item Name"
                    );

                if (
                    itemName &&
                    currentRoom
                ) {

                    addItemToRoom(
                        currentRoom,
                        itemName
                    );

                }

            }

            // ==================
            // SUPER CATEGORY
            // ==================

            if (
                text.includes(
                    "Super Category"
                )
            ) {

                const category =
                    extractValue(
                        text,
                        "Super Category"
                    );

                const lastItem =
                    getLastRoomItem(
                        currentRoom
                    );

                if (
                    lastItem &&
                    category
                ) {

                    ensureItemMap(
                        lastItem
                    );

                    projectMaster
                        .itemCategoryMap[
                        lastItem
                    ]
                        .superCategory =
                        category;

                }

            }

            // ==================
            // SUB CATEGORY
            // ==================

            if (
                text.includes(
                    "Sub Super Category"
                )
            ) {

                const subCategory =
                    extractValue(
                        text,
                        "Sub Super Category"
                    );

                const lastItem =
                    getLastRoomItem(
                        currentRoom
                    );

                if (
                    lastItem &&
                    subCategory
                ) {

                    ensureItemMap(
                        lastItem
                    );

                    projectMaster
                        .itemCategoryMap[
                        lastItem
                    ]
                        .subCategory =
                        subCategory;

                }

            }

        });

    }

}

// =========================================
// ROOM DETECTION
// =========================================

function isRoomHeader(text) {

    const roomPattern =
        /^[A-Z0-9\s&()\-]+$/;

    return (

        text.length > 2 &&
        text.length < 60 &&

        !text.includes(
            "Item Name"
        ) &&

        !text.includes(
            "Category"
        ) &&

        roomPattern.test(
            text
        )

    );

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
        !projectMaster
            .roomItemMap[
            room
        ]
            .includes(item)
    ) {

        projectMaster
            .roomItemMap[
            room
        ]
            .push(item);

    }

    ensureItemMap(
        item
    );

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

    items.forEach(item => {

        const option =
            document.createElement(
                "option"
            );

        option.value =
            item;

        option.textContent =
            item;

        itemDropdown
            .appendChild(
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
            itemDropdown
                .selectedOptions
        ).map(
            option =>
                option.value
        );

    const categories =
        new Set();

    selectedItems.forEach(
        item => {

            const data =
                projectMaster
                    .itemCategoryMap[
                    item
                ];

            if (
                !data
            ) return;

            const mapped =
                CATEGORY_MAPPING[
                    data
                        .superCategory
                ];

            if (
                mapped
            ) {

                mapped.forEach(
                    category => {

                        categories.add(
                            category
                        );

                    }
                );

            }

        }
    );

    Array.from(
        categoryDropdown
            .options
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
