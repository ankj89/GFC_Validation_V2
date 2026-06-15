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

        "Flooring Grid Layout Available as per size",
        "Skirting Layout Available",
        "Floor Tile Start Point Mentioned",
        "Floor Tile Size Mentioned",
        "Slope Direction Mentioned",
        "Skirting Thickness Mentioned",
        "Grouting Details Mentioned"

    ],
pcc: [

        "PCC areas marked on plan",
        "Level Difference Marked(if any)",
        "PCC thickness mentioned"

    ],
    
    coba: [

        "Brickbat areas marked on plan",
        "Level Difference Marked(if any)",
        "Brickbat thickness mentioned"

    ],

    plaster: [

        "Plaster areas marked on plan",
        "Plaster areas marked on elevation",
        "Plaster type mentioned",
        "Plaster thickness mentioned"

    ],
       punning: [

        "Punning areas marked on plan",
        "Punning areas marked on elevation",
        "Punning type mentioned",
        "Punning thickness mentioned"

    ],
     waterproofing: [

        "Waterproofing areas marked on plan with dimensions",
        "Waterproofing areas marked on elevation with dimensions",
        "Waterproofing type mentioned",
        "Waterproofing specifications mentioned"

    ],
    walltilingorcladding: [

        "Dado Grid Layout as per tile size",
        "Tile Start Point Mentioned",
        "Tile Size Mentioned",
        "Cutouts Shown/marked",
        "Cutout Dimensions Mentioned",
        "Tile Area Dimensions Mentioned",
        "Grouting Details Mentioned",
        "Wall Cladding Elevation shown"

    ],

    falseCeiling: [

        "Ceiling plan Layout Available",
        "False Ceiling type mentioned",
        "Legends shown",
        "Ceiling Sections shown: horizontal & vertical cuts",
        "False Ceiling levels Mentioned",
        "Band Size Mentioned",
        "Cove Width and section shown",
        "Cove levels Mentioned",
        "Beam Locations Shown",
        "Wardrobe clash checked",
        "AC pelmet/pocket shown",
        "Curtain Pelmet/pocket shown"

    ],

    electricalWall: [

        "Switchboard(s) present in elevation Layout",
        "Switchboard(s) present in plan Layout",
        "Existing modules Shown in elevation",
        "All Fixtures(lights etc) shown in elevation",
        "New modules Shown with location coordinates",
        "Relocation modules Tagged with location coordinates",
        "Looping Layout Shown for New modules",
        "Primary and secondary Looping Layout Shown for wall points/fixtures(lights etc)",
        "Conduit Routing Shown for New and Relocation modules",
        "Wire thickness Mentioned (as per BOQ)",
        "Module name Mentioned with socket(5A/15A)",
        "Legend Available for all modules",
        "Furniture Clash Checked",
        "Accessibility Checked"

    ],

    electricalCeiling: [
        "All Fixtures (lights,fan,sprinklers, smoke detectors (etc)) shown in layout in plan",
        "All Fixtures (lights,fan,sprinklers, smoke detectors (etc)) relocations shown(if any)",
        "Primary Looping Shown with modules",
        "Secondary Looping Shown with primary point",
        "All Fixtures Locations and dimensions Shown in plan",
        "All Fixture c/c Spacing Mentioned",
        "All Fixture Legend Mentioned"

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

    Doors: [

        "Plan Available with location shown in furniture layout",
        "Front and back Elevation Available",
        "All Section Available",
        "Door L X H mentioned",
        "Any Design on door, dimensions provided(Like trims,grooves,tpatti,moulding, grills etc)",
        "Frame type and dimensions Mentioned",
        "Opening Side Shown",
        "Door frame panelling dimensions and details shown (elevation and section, as applicable)",
        "Material types Mentioned for door and design elements",
        "Door Thickness Mentioned",
        "Handle location Mentioned",
        "Handle specification Mentioned",
        "All Accessories Mentioned(like door closer,Locks, tower bolt etc) ",
        "Finish Type Mentioned for door along with design elements mentioned",
        "Finish Code Mentioned",
        "Accesibility checked (not clashing with existing furniture, fixtures or creating space constraints)"
    ],

    // =====================================
    // SLIDING DOOR
    // =====================================

    slidingDoor: [

        "Plan Available with location shown in furniture layout",
        "Front and back Elevation Available",
        "All Section Available, moving and fixed",
        "L X H mentioned",
        "Any Design on door, dimensions provided(Like trims,grooves,tpatti,moulding, grills etc)",
         "Track location shown",
         "Hardware details mentioned, tracks, channel",
        "Opening direction Shown",
        "Material types Mentioned for door and design elements",
        "Door Thickness Mentioned",
        "Handle location Mentioned",
        "Handle specification Mentioned",
        "All Accessories deatils Mentioned(like door closer,Locks, tower bolt etc) ",
        "Finish Type Mentioned for door along with design elements mentioned",
        "Finish Code Mentioned",
        "Accesibility checked (not clashing with existing furniture, fixtures or creating space constraints)",
         "Glass Type Mentioned",
        "Glass Thickness Mentioned",
        "Glass Colour Mentioned"

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

        "Plan Available with location shown in furniture layout",
        "Elevation Available",
        "Front and side Section Available (external and interal elevations)",
        "L x H X D mentioned",
        "Shutter details shown along with opening side and details of design elements(as applicable)",
        "Internal Layout shown with dimensions (of shelves, drawers, partiitons etc)",
        "All Material type and specs Mentioned",
        "All Material Thickness Mentioned",
        "All Finish Type Mentioned",
        "All Finish Code Mentioned",
        "All Lock location and Details Mentioned",
        "All Handle locations and Details Mentioned",
        "All Hardware details mentioned",
        "Seat Cushion Details Mentioned",
        "Fabric Code Mentioned",
        "Foam Density Mentioned"

    ],

        beds: [

        "Plan Available with location shown in furniture layout",
        "Fornt and side Elevation Available",
        "Front and side Section Available (external and interal elevations)",
        "L x H X D mentioned",
        "Internal Layout shown with dimensions",
        "Type of bed mentioned",
        "All Material type and specifications Mentioned",
        "All Material Thickness Mentioned",
        "All Finish Type Mentioned",
        "All Finish Code Mentioned",
        "All hardware location and Details Mentioned"

    ],

      headboards: [

        "Plan Available with location shown in furniture layout",
        "Fornt Elevation Available",
        "Front and side Section Available (external and interal elevations)",
        "L x H X D mentioned",
        "Any curvature dimentions mentioned",
        "Any design details (like pleating etc) mentioned with dimensions",
        "All Material type and specifications Mentioned",
        "All Material Thickness Mentioned",
        "All Finish Types Mentioned",
        "All Finish Code (fabric, laminate etc) Mentioned",
        "Foam Density Mentioned"

    ],

    // =====================================
    // ANY STORAGE
    // =====================================

    anyStorages: [
        "Plan Available with location shown in furniture layout",
        "Elevation Available",
        "Front and side Section Available (external and interal elevations)",
        "L x H X D mentioned",
        "Shutter details shown along with opening side and details of design elements(as applicable)",
        "Internal Layout shown with dimensions (of shelves, drawers, partiitons etc)",
        "All Material type and specification Mentioned",
        "All Material Thickness Mentioned",
        "All Finish Type Mentioned",
        "All Finish Code Mentioned",
        "All Lock location and Details Mentioned",
        "All Handle locations and Details Mentioned",
         "All Hardware details mentioned"
    ],

    // =====================================
    // TV UNIT
    // =====================================

    tvUnit: [

        "Elevation Available",
        "Section Available",

        "Height Mentioned",
        "Width Mentioned",
        "Depth Mentioned",

        "TV Size Mentioned",

        "Material Thickness Mentioned",

        "Laminate Code Mentioned",

        "Electrical Connections Shown"

    ],

    // =====================================
    // MANDIR UNIT
    // =====================================

    mandirUnit: [
        "Plan Available with location shown in furniture layout",
        "Elevation Available",
        "Front and side Section Available (external and interal elevations)",
        "L x B X H mentioned",
        "Shutter details shown along with opening side and details of design elements(as applicable)",
        "Internal Layout shown with dimensions (of shelves, drawers, partiitons etc)",
        "CNC/any other partition details mentioned",
        "All Material type and specification Mentioned",
        "All Material Thickness Mentioned",
        "All Finish Type Mentioned",
        "All Finish Code Mentioned",
        "All Lock location and Details Mentioned",
        "All Handle locations and Details Mentioned",
        "All Electrical provisions shown?",
        "All Hardware details mentioned"

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

        "Plan Available with location shown in furniture layout",
        "Elevation Available",
        "Front and side Section Available (external and interal elevations)",
        "L x H X D mentioned",
        "Shutter details shown along with opening side and details of design elements(as applicable)",
        "Internal Layout shown with dimensions (of shelves, drawers, partiitons etc)",
        "All Material type and specification Mentioned",
        "All Material Thickness Mentioned",
        "All Finish Type Mentioned",
        "All Finish Code Mentioned",
        "All Lock location and Details Mentioned",
        "All Handle locations and Details Mentioned",
         "All Hardware details mentioned"

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

    trimsormouldings: [

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

    ]


    

};
