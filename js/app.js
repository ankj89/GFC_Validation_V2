// =========================================
// APP CONTROLLER
// =========================================

document.addEventListener(
    "DOMContentLoaded",
    initializeApplication
);

// =========================================
// INITIALIZE
// =========================================

function initializeApplication() {

    console.log(
        "GFC Validation Tool Initialized"
    );

    bindGlobalEvents();

    initializeDefaults();

}

// =========================================
// DEFAULTS
// =========================================

function initializeDefaults() {

    document.getElementById(
        "drawingMissingReason"
    ).style.display = "none";

}

// =========================================
// EVENTS
// =========================================

function bindGlobalEvents() {

    bindDrawingAvailability();

    bindReportGeneration();

    bindExcelExport();

    bindProjectReset();

}

// =========================================
// DRAWING NOT AVAILABLE
// =========================================

function bindDrawingAvailability() {

    const checkbox =
        document.getElementById(
            "drawingNotAvailable"
        );

    const reasonBox =
        document.getElementById(
            "drawingMissingReason"
        );

    checkbox?.addEventListener(
        "change",
        function () {

            if (this.checked) {

                reasonBox.style.display =
                    "block";

            } else {

                reasonBox.style.display =
                    "none";

                reasonBox.value = "";

            }

        }
    );

}

// =========================================
// REPORT GENERATION
// =========================================

function bindReportGeneration() {

    const reportButton =
        document.getElementById(
            "generateReportBtn"
        );

    reportButton?.addEventListener(
        "click",
        function () {

            generateAllReports();

        }
    );

}

// =========================================
// EXCEL EXPORT
// =========================================

function bindExcelExport() {

    const exportButton =
        document.getElementById(
            "exportExcelBtn"
        );

    exportButton?.addEventListener(
        "click",
        function () {

            exportValidationWorkbook();

        }
    );

}

// =========================================
// PROJECT RESET
// =========================================

function bindProjectReset() {

    window.resetProject =
        function () {

            const confirmed =
                confirm(
                    "Reset entire project?"
                );

            if (!confirmed)
                return;

            resetProjectMaster();

            validationStore = [];

            clearValidationForm();

            document.getElementById(
                "reportContainer"
            ).innerHTML = "";

            document.getElementById(
                "roomDropdown"
            ).innerHTML =
                '<option value="">Select Room</option>';

            document.getElementById(
                "itemDropdown"
            ).innerHTML = "";

            alert(
                "Project Reset Completed"
            );

        };

}

// =========================================
// PAGE CHANGE CALLBACK
// =========================================

function onPageChanged(
    pageNumber
) {

    console.log(
        "Current Page:",
        pageNumber
    );

    loadPageValidation(
        pageNumber
    );

}

// =========================================
// PAGE SAVE CALLBACK
// =========================================

function onPageSaved(
    pageData
) {

    console.log(
        "Page Saved",
        pageData
    );

}

// =========================================
// PROJECT STATUS
// =========================================

function getProjectStatus() {

    const totalPages =
        getPdfInfo().totalPages;

    const validatedPages =
        validationStore.length;

    const pendingPages =
        totalPages -
        validatedPages;

    return {

        totalPages,

        validatedPages,

        pendingPages

    };

}

// =========================================
// DASHBOARD SUMMARY
// =========================================

function refreshDashboardSummary() {

    const status =
        getProjectStatus();

    console.log(
        "Project Status",
        status
    );

}

// =========================================
// VALIDATION COMPLETENESS
// =========================================

function getValidationCompleteness() {

    const pdfInfo =
        getPdfInfo();

    if (
        pdfInfo.totalPages === 0
    ) {

        return 0;

    }

    return Math.round(

        (
            validationStore.length /
            pdfInfo.totalPages
        ) * 100

    );

}

// =========================================
// BOQ COVERAGE
// =========================================

function getBOQCoverage() {

    const coverage = [];

    Object.keys(
        projectMaster.roomItemMap
    ).forEach(room => {

        projectMaster
            .roomItemMap[room]
            .forEach(item => {

                const found =
                    validationStore.some(
                        page =>

                            page.room === room &&

                            page.items.includes(
                                item
                            )
                    );

                coverage.push({

                    room,

                    item,

                    validated:
                        found

                });

            });

    });

    return coverage;

}

// =========================================
// HEALTH CHECK
// =========================================

function applicationHealthCheck() {

    return {

        pdfLoaded:
            getPdfInfo().loaded,

        boqLoaded:
            projectMaster.rooms
                .length > 0,

        validationCount:
            validationStore.length

    };

}

// =========================================
// DEBUG
// =========================================

window.debugApp =
    function () {

        console.log(
            "Project Master",
            projectMaster
        );

        console.log(
            "Validation Store",
            validationStore
        );

        console.log(
            "Coverage",
            getBOQCoverage()
        );

        console.log(
            "Health",
            applicationHealthCheck()
        );

    };

// =========================================
// AUTO SAVE (OPTIONAL)
// =========================================

setInterval(() => {

    if (
        validationStore.length === 0
    ) return;

    localStorage.setItem(
        "gfcValidationBackup",
        JSON.stringify(
            validationStore
        )
    );

}, 30000);

// =========================================
// RESTORE BACKUP
// =========================================

(function restoreBackup() {

    const backup =
        localStorage.getItem(
            "gfcValidationBackup"
        );

    if (!backup)
        return;

    try {

        validationStore =
            JSON.parse(
                backup
            );

        console.log(
            "Backup Restored"
        );

    } catch (error) {

        console.error(
            error
        );

    }

})();
