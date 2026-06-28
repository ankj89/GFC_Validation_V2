// =====================================
// GLOBAL
// =====================================

let projectMaster = null;
let currentVisibleItems = [];
// =====================================
// SAVE PROJECT MASTER
// =====================================

function saveProjectMaster() {

const rows =
    document.querySelectorAll(
        "#boqReviewBody tr"
    );

if (
    rows.length === 0
) {

    alert(
        "No review rows found"
    );

    return;

}

const rooms = {};

const errors = [];

let masterRFV = "";
let masterOrder = "";
let masterPID = "";

rows.forEach(row => {

    const rfvId =
        row.querySelector(
            ".rfv-input"
        )?.value.trim() || "";

    const orderId =
        row.querySelector(
            ".order-input"
        )?.value.trim() || "";

    const pid =
        row.querySelector(
            ".pid-input"
        )?.value.trim() || "";

    const room =
        row.querySelector(
            ".room-input"
        )?.value.trim() || "";

    const qty =
        Number(
            row.querySelector(
                ".qty-input"
            )?.value || 0
        );

    const item =
        row.querySelector(
            ".item-input"
        )?.value.trim() || "";

    const category =
        row.querySelector(
            ".category-input"
        )?.value.trim() || "";

    if (
        !masterRFV &&
        rfvId
    ) {

        masterRFV = rfvId;

    }

    if (
        !masterOrder &&
        orderId
    ) {

        masterOrder = orderId;

    }

    if (
        !masterPID &&
        pid
    ) {

        masterPID = pid;

    }

    if (!room) {

        errors.push(
            `${item || "Unknown SKU"} : Room Missing`
        );

    }

    if (!item) {

        errors.push(
            "SKU Missing"
        );

    }

    if (!qty) {

        errors.push(
            `${item || "Unknown SKU"} : Qty Missing`
        );

    }

    if (
        !room ||
        !item ||
        !qty
    ) {

        return;

    }

    if (
        !rooms[room]
    ) {

        rooms[room] = [];

    }

   rooms[room].push({

    room,

    item,

    qty,

    category,

    display:
        `${qty}|${room}|${item}`

});

});

if (
    errors.length > 0
) {

    alert(

        "Cannot Save Project Master\n\n" +

        errors.join("\n")

    );

    return;

}

const fullHomeItems = [];

Object.values(
    rooms
).forEach(items => {

    items.forEach(item => {

        fullHomeItems.push(
            item
        );

    });

});

rooms[
    "FULL HOME"
] =
    fullHomeItems;

projectMaster = {

    sourceType:
        window.sourceType || "",

    gfcId:
        document
        .getElementById(
            "gfcIdInput"
        )
        ?.value || "",

    rfvId:
        masterRFV,

    orderId:
        masterOrder,

    pid:
        masterPID,

    rooms

};

console.log(
    projectMaster
);

populateRoomDropdown();

document
.getElementById(
    "validationSection"
)
.classList
.remove(
    "hidden"
);

alert(
    "Project Master Saved"
);


}


// =====================================
// ROOM DROPDOWN
// =====================================

function populateRoomDropdown() {

    const dropdown =
        document.getElementById(
            "roomDropdown"
        );

    dropdown.innerHTML = "";

    const blankOption =
        document.createElement(
            "option"
        );

    blankOption.value = "";

    blankOption.textContent =
        "-- Select Room --";

    dropdown.appendChild(
        blankOption
    );

    Object.keys(
        projectMaster.rooms
    ).forEach(room => {

        const option =
            document.createElement(
                "option"
            );

        option.value =
            room;

        option.textContent =
            room;

        dropdown.appendChild(
            option
        );

    });

}

// =====================================
// ITEM DROPDOWN
// =====================================

function populateItemDropdown() {

    const room =
        document.getElementById(
            "roomDropdown"
        )
        .value;

    const dropdown =
        document.getElementById(
            "itemDropdown"
        );

    dropdown.innerHTML = "";

    if (
        !room
    ) {
        return;
    }

    currentVisibleItems =
    projectMaster.rooms[
        room
    ] || [];

const items =
    currentVisibleItems;

    items.forEach(item => {

        const option =
            document.createElement(
                "option"
            );

    option.textContent =
    item.display;

        option.value =
            JSON.stringify(
                item
            );

        dropdown.appendChild(
            option
        );

    });

}

// =====================================
// PROJECT INFO
// =====================================
function filterVisibleItems() {

    const searchText =
        document
        .getElementById(
            "itemSearch"
        )
        .value
        .toLowerCase();

    const dropdown =
        document
        .getElementById(
            "itemDropdown"
        );

    dropdown.innerHTML = "";

    currentVisibleItems

    .filter(item => {

        const text =
    item.display.toLowerCase();

        return text.includes(
            searchText
        );

    })

    .forEach(item => {

        const option =
            document.createElement(
                "option"
            );

        option.textContent =
    item.display;

        option.value =
            JSON.stringify(
                item
            );

        dropdown.appendChild(
            option
        );

    });

}
function getProjectInfo() {

    return {

        gfcId:
            projectMaster?.gfcId || "",

        rfvId:
            projectMaster?.rfvId || "",

        orderId:
            projectMaster?.orderId || "",

        pid:
            projectMaster?.pid || "",

        sourceType:
            projectMaster?.sourceType || ""

    };

}

// =====================================
// EVENTS
// =====================================

document
.getElementById(
    "saveProjectMasterBtn"
)
.addEventListener(
    "click",
    saveProjectMaster
);

document
.getElementById(
    "roomDropdown"
)
.addEventListener(
    "change",
    populateItemDropdown
);
document
.getElementById(
    "itemSearch"
)
.addEventListener(
    "input",
    filterVisibleItems
);
