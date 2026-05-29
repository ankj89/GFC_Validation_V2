// =========================================
// EXCEL EXPORT MODULE
// =========================================

function exportValidationWorkbook() {

    try {

        const workbook =
            XLSX.utils.book_new();

        // =====================================
        // SHEET 1
        // VALIDATION REGISTER
        // =====================================

        const validationRegister =
            getValidationRegisterData();

        const validationSheet =
            XLSX.utils.json_to_sheet(
                validationRegister
            );

        XLSX.utils.book_append_sheet(

            workbook,

            validationSheet,

            "Validation Register"

        );

        // =====================================
        // SHEET 2
        // SUMMARY REPORT
        // =====================================

        const summaryData =
            getValidationSummary();

        const summarySheet =
            XLSX.utils.json_to_sheet(
                summaryData
            );

        XLSX.utils.book_append_sheet(

            workbook,

            summarySheet,

            "Summary"

        );

        // =====================================
        // SHEET 3
        // DA ACTION ITEMS
        // =====================================

        const actionItems =
            getDAActionData();

        const actionSheet =
            XLSX.utils.json_to_sheet(
                actionItems
            );

        XLSX.utils.book_append_sheet(

            workbook,

            actionSheet,

            "DA Action Items"

        );

        // =====================================
        // SHEET 4
        // MISSING DRAWINGS
        // =====================================

        const missingDrawings =
            getMissingDrawingData();

        const missingSheet =
            XLSX.utils.json_to_sheet(
                missingDrawings
            );

        XLSX.utils.book_append_sheet(

            workbook,

            missingSheet,

            "Missing Drawings"

        );

        // =====================================
        // SHEET 5
        // BOQ COVERAGE
        // =====================================

        const coverageData =
            getCoverageData();

        const coverageSheet =
            XLSX.utils.json_to_sheet(
                coverageData
            );

        XLSX.utils.book_append_sheet(

            workbook,

            coverageSheet,

            "BOQ Coverage"

        );

        // =====================================
        // SHEET 6
        // PROJECT INFO
        // =====================================

        const projectInfo = [

            {
                Metric:
                    "Generated On",

                Value:
                    new Date()
                        .toLocaleString()
            },

            {
                Metric:
                    "Total Rooms",

                Value:
                    projectMaster.rooms
                        .length
            },

            {
                Metric:
                    "Validated Pages",

                Value:
                    validationStore
                        .length
            },

            {
                Metric:
                    "Coverage Items",

                Value:
                    getCoverageData()
                        .length
            }

        ];

        const infoSheet =
            XLSX.utils.json_to_sheet(
                projectInfo
            );

        XLSX.utils.book_append_sheet(

            workbook,

            infoSheet,

            "Project Info"

        );

        // =====================================
        // COLUMN WIDTHS
        // =====================================

        setSheetWidths(
            validationSheet,
            [
                10,
                25,
                50,
                20,
                40,
                15,
                60
            ]
        );

        setSheetWidths(
            actionSheet,
            [
                10,
                25,
                50,
                20,
                40,
                60
            ]
        );

        setSheetWidths(
            missingSheet,
            [
                10,
                25,
                50,
                60
            ]
        );

        setSheetWidths(
            coverageSheet,
            [
                25,
                50,
                15
            ]
        );

        // =====================================
        // FILE NAME
        // =====================================

        const fileName =

            "GFC_Validation_Report_" +

            new Date()
                .toISOString()
                .split("T")[0] +

            ".xlsx";

        XLSX.writeFile(
            workbook,
            fileName
        );

        alert(
            "Excel Report Exported Successfully"
        );

    } catch (error) {

        console.error(
            error
        );

        alert(
            "Excel Export Failed"
        );

    }

}

// =========================================
// SHEET WIDTHS
// =========================================

function setSheetWidths(
    worksheet,
    widths
) {

    worksheet["!cols"] =
        widths.map(width => ({

            wch: width

        }));

}

// =========================================
// QUICK EXPORT
// =========================================

window.exportValidationWorkbook =
    exportValidationWorkbook;

// =========================================
// EXPORT CURRENT PAGE
// =========================================

function exportCurrentPageData() {

    const currentPage =
        getCurrentPageNumber();

    const pageData =
        getValidationByPage(
            currentPage
        );

    if (!pageData) {

        alert(
            "No validation found for current page"
        );

        return;

    }

    const workbook =
        XLSX.utils.book_new();

    const sheet =
        XLSX.utils.json_to_sheet(

            pageData.checklistResults

        );

    XLSX.utils.book_append_sheet(

        workbook,

        sheet,

        `Page_${currentPage}`

    );

    XLSX.writeFile(

        workbook,

        `Page_${currentPage}_Validation.xlsx`

    );

}

// =========================================
// EXPORT BOQ COVERAGE ONLY
// =========================================

function exportCoverageOnly() {

    const workbook =
        XLSX.utils.book_new();

    const coverageSheet =
        XLSX.utils.json_to_sheet(

            getCoverageData()

        );

    XLSX.utils.book_append_sheet(

        workbook,

        coverageSheet,

        "Coverage"

    );

    XLSX.writeFile(

        workbook,

        "BOQ_Coverage_Report.xlsx"

    );

}

// =========================================
// EXPORT DA ACTIONS ONLY
// =========================================

function exportDAActionsOnly() {

    const workbook =
        XLSX.utils.book_new();

    const actionSheet =
        XLSX.utils.json_to_sheet(

            getDAActionData()

        );

    XLSX.utils.book_append_sheet(

        workbook,

        actionSheet,

        "DA Action Items"

    );

    XLSX.writeFile(

        workbook,

        "DA_Action_Items.xlsx"

    );

}
