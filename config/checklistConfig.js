// =====================================
// GFC VALIDATION CHECKLIST MASTER
// =====================================

const CHECKLIST_CONFIG = {

    demolition: [

        "Demolition Area Clearly Demarcated",
        "Structural Walls Identified",
        "Wall Opening Locations Shown",
        "Demolition Dimensions Mentioned",
        "Legend Available",
        "Demolition Method Mentioned",
        "Post Demolition Finishing Mentioned",
        "Adjacent Surface Protection Mentioned",
        "Affected Services Identified"

    ],

    wall: [

        "New Wall Locations Shown",
        "Wall Thickness Mentioned",
        "Wall Length Mentioned",
        "Wall Height Mentioned",
        "Opening Dimensions Mentioned",
        "Lintel Details Mentioned",
        "Material Specification Mentioned",
        "Brick Size Mentioned",
        "Plaster Thickness Mentioned",
        "Core Cutting Coordinates Mentioned"

    ],

    flooring: [

        "Flooring Layout Available",
        "Tile Start Point Mentioned",
        "Tile Direction Mentioned",
        "Slope Direction Mentioned",
        "Level Difference Marked",
        "Tile Size Mentioned",
        "Tile Code Mentioned",
        "Skirting Requirement Mentioned",
        "Skirting Thickness Mentioned",
        "Grouting Details Mentioned",
        "Material Specification Available"

    ],

    tiling: [

        "Dado Layout Available",
        "Wall Cladding Layout Available",
        "Tile Start Point Mentioned",
        "Tile Size Mentioned",
        "Tile Code Mentioned",
        "Cutouts Shown",
        "Cutout Dimensions Mentioned",
        "Tile Area Dimensions Mentioned",
        "Grouting Details Mentioned"

    ],

    falseCeiling: [

        "Ceiling Layout Available",
        "Section shown",
        "Ceiling levels Mentioned",
        "Band Size Mentioned",
        "Cove Width Mentioned",
        "Cove levels Mentioned",
        "Beam Locations Shown",
        "Wardrobe clash checked",
        "AC pelmet/pocket shown",
        "Curtain Pelmet/pocket shown"

    ],

    electricalWall: [

        "Switchboard Layout Available",
        "Existing Points Shown",
        "New Points Shown",
        "Shifted Points Tagged",
        "Looping Layout Shown",
        "Conduit Routing Shown",
        "Module name Mentioned with socket(5A/15A)",
        "Wire Specification Mentioned",
        "Switchboard Coordinates Mentioned",
        "Legend Available",
        "Furniture Clash Checked",
        "Accessibility Checked"

    ],

    electricalCeiling: [

        "Fixture Layout Shown",
        "Primary Looping Shown",
        "Secondary Looping Shown",
        "Fixture Location Shown",
        "Fixtures Dimensions Shown",
        "Fixture Spacing Mentioned",
        "Fixture Legend Mentioned",
        "Fan location Mentioned"

    ],

    plumbing: [

        "Plan Layout Available",
        "Elevation Layout Available",
        "Legend Available",
        "Existing Points shown with coordinates",
        "New Points shown with co-ordinates",
        "Relocated Points shown with co-ordinates",
        "Fixture Locations shown with co-ordinates",
        "Drain Points Shown",
        "Waterproofing Extent Shown",
        "Waterproofing Product Mentioned",
        "Fixture heights as per interior standards"

    ],

    painting: [

        "Paint Layout Available",
        "Elevation Layout Available",
        "Paint Area Identified",
        "Paint specification Mentioned",
        "Geometric/play of paint elevation shown",
        "Texture paint elevation shown"

    ],

    cat3: [

        "Product Layout Available",
        "Elevation Available",
        "Procurement Source Mentioned",
        "Product Code Mentioned",
        "Material Specification Mentioned",
        "Dimensions Mentioned",
        "Installation Details Available",
        "Accessory Details Available"

    ],


    // =====================================
    // NEW DOOR / DOOR REFURBISHMENT
    // =====================================

    newDoor: [

        "Plan Available",
        "Elevation Available",
        "Section Available",
        "Door Width Mentioned",
        "Door Height Mentioned",
        "Frame Size Mentioned",
        "Opening Side Shown",

        "Material Mentioned",
        "Material Thickness Mentioned",

        "Handle Size Mentioned",
        "Handle Finish Mentioned",

        "Accessories In Scope Mentioned",

        "Finish Type Mentioned",
        "Finish Code Mentioned",
        "Finish Colour Mentioned",

        "Lintel Height Mentioned",

        "Door Design Dimensioned"

    ],

    // =====================================
    // SLIDING DOOR
    // =====================================

    slidingDoor: [

        "Elevation Available",
        "Section Available",

        "Track Quantity Mentioned",

        "Door Width Mentioned",
        "Door Height Mentioned",

        "Opening Direction Mentioned",

        "Panel Quantity Mentioned",

        "Glass Type Mentioned",
        "Glass Thickness Mentioned",
        "Glass Colour Mentioned",

        "Material Mentioned",
        "Material Thickness Mentioned",

        "Accessories Mentioned"

    ],

    // =====================================
    // UPVC WINDOW
    // =====================================

    upvcWindow: [

        "Elevation Available",
        "Section Available",

        "Track Quantity Mentioned",

        "Window Width Mentioned",
        "Window Height Mentioned",

        "Opening Direction Mentioned",

        "Panel Quantity Mentioned",

        "Glass Type Mentioned",
        "Glass Thickness Mentioned",
        "Glass Colour Mentioned",

        "UPVC Profile Mentioned",

        "Accessories Mentioned"

    ],

    // =====================================
    // ALUMINIUM WINDOW
    // =====================================

    aluminiumWindow: [

        "Elevation Available",
        "Section Available",

        "Track Quantity Mentioned",

        "Window Width Mentioned",
        "Window Height Mentioned",

        "Opening Direction Mentioned",

        "Panel Quantity Mentioned",

        "Glass Type Mentioned",
        "Glass Thickness Mentioned",
        "Glass Colour Mentioned",

        "Aluminium Profile Mentioned",

        "Accessories Mentioned"

    ],

    // =====================================
    // SHOE STORAGE
    // =====================================

    shoeStorage: [

        "Furniture Layout Available",
        "Elevation Available",
        "Section Available",

        "Width Mentioned",
        "Height Mentioned",
        "Depth Mentioned",

        "Material Mentioned",
        "Material Thickness Mentioned",

        "Finish Type Mentioned",
        "Finish Code Mentioned",

        "Internal Layout Available",

        "Shelf Quantity Mentioned",
        "Shelf Sizes Mentioned",

        "Drawer Details Mentioned",

        "Lock Details Mentioned",
        "Handle Details Mentioned",

        "Jali Details Mentioned",

        "Seat Cushion Details Mentioned",
        "Fabric Code Mentioned",
        "Foam Density Mentioned"

    ],

    // =====================================
    // WALL STORAGE
    // =====================================

    wallStorage: [

        "Plan Available",
        "Elevation Available",
        "Section Available",

        "Full Wall Representation Available",

        "Material Mentioned",
        "Material Thickness Mentioned",

        "Finish Type Mentioned",
        "Finish Code Mentioned",

        "Laminate Code Mentioned",

        "Lock Details Mentioned",
        "Handle Details Mentioned",

        "Drawer Channel Details Mentioned",

        "Wall Fixing Details Mentioned"

    ],

    // =====================================
    // TV UNIT
    // =====================================

    tvUnit: [

        "Furniture Layout Available",
        "Elevation Available",
        "Section Available",

        "Procurement Source Mentioned",

        "Height Mentioned",
        "Width Mentioned",
        "Depth Mentioned",

        "TV Size Mentioned",

        "Material Thickness Mentioned",

        "Laminate Code Mentioned",

        "Lock Details Mentioned",
        "Handle Details Mentioned",

        "Channel Details Mentioned",

        "Electrical Connections Shown"

    ],

    // =====================================
    // MANDIR UNIT
    // =====================================

    mandirUnit: [

        "Furniture Layout Available",
        "Elevation Available",
        "Section Available",

        "Procurement Source Mentioned",

        "Height Mentioned",
        "Width Mentioned",
        "Depth Mentioned",

        "Material Thickness Mentioned",

        "Finish Type Mentioned",
        "Finish Code Mentioned",

        "Lock Details Mentioned",
        "Handle Details Mentioned",

        "Channel Details Mentioned",

        "Step Dimensions Mentioned",

        "Bell Details Mentioned",

        "Jali Details Mentioned",

        "Lighting Details Mentioned",

        "Furniture Location Shown"

    ],

    // =====================================
    // WALL PANELLING
    // =====================================

    wallPanelling: [

        "Elevation Available",
        "Section Available",

        "Panel Width Mentioned",
        "Panel Height Mentioned",
        "Panel Depth Mentioned",

        "Material Mentioned",

        "Material Thickness Mentioned",

        "Laminate Code Mentioned",

        "Both Side Elevations Available",

        "Frame Details Mentioned",

        "Skirting Interface Mentioned"

    ],

    // =====================================
    // MIRROR PANELLING
    // =====================================

    mirrorPanelling: [

        "Elevation Available",
        "Section Available",

        "Mirror Thickness Mentioned",

        "Mirror Company Mentioned",

        "Mirror Type Mentioned",

        "Bevel Details Mentioned",

        "Frame Details Mentioned",

        "Backing Material Mentioned",

        "Backing Thickness Mentioned",

        "All Dimensions Mentioned",

        "Pattern Dimensions Mentioned"

    ],

    // =====================================
    // VANITY UNIT
    // =====================================

    vanityUnit: [

        "Plan Available",
        "Elevation Available",
        "Section Available",

        "BWR Ply Mentioned",

        "Material Thickness Mentioned",

        "Finish Code Mentioned",

        "Handle Details Mentioned",

        "Lock Details Mentioned",

        "Drawer Channel Details Mentioned",

        "Internal Layout Available",

        "Shelf Details Mentioned",

        "Sink Support Material Mentioned",

        "Wall Mounted Or Floor Mounted Mentioned"

    ],

    // =====================================
    // LEDGES
    // =====================================

    ledges: [

        "Elevation Available",

        "Plan Available",

        "Ledge Thickness Mentioned",

        "Material Mentioned",

        "Finish Details Mentioned",

        "Bracket Details Mentioned",

        "Shelf Spacing Mentioned"

    ],

    // =====================================
    // WOODEN PARTITION
    // =====================================

    woodenPartition: [

        "Elevation Available",

        "Rafter Size Mentioned",

        "Rafter Material Mentioned",

        "Finish Type Mentioned",

        "Fixing Details Mentioned",

        "Floor Fixing Mentioned",

        "Ceiling Fixing Mentioned",

        "Rafter Spacing Mentioned"

    ],

    // =====================================
    // WOODEN PELMET
    // =====================================

    woodenPelmet: [

        "Plan Available",

        "Front Elevation Available",

        "Side Elevation Available",

        "Material Mentioned",

        "Material Thickness Mentioned",

        "Finish Type Mentioned",

        "Finish Code Mentioned",

        "Pelmet Width Mentioned",

        "Pelmet Depth Mentioned",

        "Pelmet Height Mentioned"

    ],

    // =====================================
    // PLY BOXING
    // =====================================

    plyBoxing: [

        "Plan Available",

        "Front Elevation Available",

        "Side Elevation Available",

        "Material Mentioned",

        "Material Thickness Mentioned",

        "Finish Type Mentioned",

        "Finish Code Mentioned",

        "Boxing Width Mentioned",

        "Boxing Depth Mentioned",

        "Boxing Height Mentioned"

    ],

    // =====================================
    // TRIMS
    // =====================================

    trims: [

        "Elevation Available",

        "Trim Profile Mentioned",

        "Trim Size Mentioned",

        "Trim Material Mentioned",

        "Finish Type Mentioned",

        "Paint Or Polish Mentioned",

        "Paint Colour Mentioned",

        "Trim Spacing Mentioned",

        "Starting Point Mentioned",

        "Wall Offset Mentioned"

    ],

    // =====================================
    // SAFETY DOOR
    // =====================================

    safetyDoor: [

        "Plan Available",

        "Elevation Available",

        "Section Available",

        "Door Width Mentioned",

        "Door Height Mentioned",

        "Opening Side Shown",

        "Material Mentioned",

        "Material Thickness Mentioned",

        "Jali Design Mentioned",

        "Jali Dimensions Mentioned",

        "Lock Details Mentioned",

        "Handle Details Mentioned",

        "Stopper Details Mentioned",

        "Metal Finish Mentioned"

    ],

    // =====================================
    // WINDOW GRILLS
    // =====================================

    windowGrills: [

        "Elevation Available",

        "Grill Layout Available",

        "Width Mentioned",

        "Height Mentioned",

        "Rod Thickness Mentioned",

        "Rod Spacing Mentioned",

        "Grill Type Mentioned",

        "Paint Type Mentioned",

        "Paint Colour Mentioned",

        "Paint Code Mentioned"

    ],

    // =====================================
    // METAL DESIGN ELEMENTS
    // =====================================

    metalDesignElements: [

        "Plan Available",

        "Elevation Available",

        "Section Available",

        "Dimensions Mentioned",

        "Material Mentioned",

        "Material Thickness Mentioned",

        "Fixing Details Mentioned",

        "Finish Type Mentioned",

        "Colour Mentioned",

        "Installation Details Mentioned"

    ],

    // =====================================
    // MS SHED
    // =====================================

    msShed: [

        "Plan Available",

        "Elevation Available",

        "Section Available",

        "Length Mentioned",

        "Width Mentioned",

        "Height Mentioned",

        "MS Section Size Mentioned",

        "Sheet Specification Mentioned",

        "Slope Mentioned",

        "Drainage Direction Mentioned",

        "Paint System Mentioned",

        "Fixing Details Mentioned"

    ],

    // =====================================
    // PERGOLA
    // =====================================

    pergola: [

        "Plan Available",

        "Elevation Available",

        "Section Available",

        "Length Mentioned",

        "Width Mentioned",

        "Height Mentioned",

        "Rafter Size Mentioned",

        "Rafter Spacing Mentioned",

        "Material Mentioned",

        "Finish Mentioned",

        "Fixing Details Mentioned"

    ],

    // =====================================
    // FABRIC HEADBOARD
    // =====================================

    fabricHeadboard: [

        "Plan Available",

        "Elevation Available",

        "Section Available",

        "Length Mentioned",

        "Height Mentioned",

        "Depth Mentioned",

        "Foam Density Mentioned",

        "Fabric Code Mentioned",

        "Fabric Colour Mentioned",

        "Stitch Pattern Mentioned",

        "Starting Height Mentioned"

    ]

    

};
