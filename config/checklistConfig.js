// =====================================
// GFC VALIDATION CHECKLIST MASTER
// =====================================

const CHECKLIST_CONFIG = {

    demolition: [

        "Demolition Area Clearly Demarcated in Plan",
        "Demolition Area Celarly demarcated in Elevation",
        "Structural Walls marked in the Plan",
        "Wall Opening Locations Shown with dimensions",
        "Demolition Dimensions Mentioned",
        "Demolition Method Mentioned",
        "Post Demolition Finishing Mentioned"

    ],

    wall: [

        "New Wall Locations Shown",
        "Wall Thickness Mentioned",
        "Wall Length Mentioned",
        "Wall Height Mentioned",
        "Opening Dimensions Mentioned",
        "Lintel Details Mentioned with dimensions",
        "Core Cutting Coordinates Mentioned"

    ],

     wall: [

        "Core cutting shown on elevation with size",
        "Core Cutting xy Co-ordinates shown"
    ],


    flooring: [

        "Flooring Grid plan shown with dimensions",
        "Skirting Layout plan shown with dimensions",
        "Flooring Type shown with legends(Tile/Stone etc)",
        "Floor Tile Start Point Mentioned",
        "Floor Tile Size Mentioned",
        "Slope Direction Mentioned",
        "Skirting Thickness Mentioned",
        "Grouting Details Mentioned"

    ],
pcc: [

        "PCC areas marked on plan with dimensions",
        "Level Difference Marked(if any)",
        "PCC thickness mentioned"

    ],
    
    coba: [

        "Brickbat areas marked on plan with dimensions",
        "Level Difference Marked(if any)",
        "Brickbat thickness mentioned"

    ],

    plaster: [

        "Plaster areas marked on plan with dimensions",
        "Plaster areas marked on elevation with dimensions",
        "Plaster type mentioned",
        "Plaster thickness mentioned"

    ],
       punning: [

        "Punning areas marked on plan with dimensions",
        "Punning areas marked on elevation with dimesions",
        "Punning type mentioned",
        "Punning thickness mentioned"

    ],
     waterproofing: [

        "Waterproofing areas marked on plan with dimensions",
        "Waterproofing areas marked on elevation with dimensions",
        "Waterproofing type mentioned",
        "Waterproofing specifications mentioned"

    ],
    walltiling: [

        "Dado Grid elevation as per tile size with dimensions",
        "Tile Start Point Mentioned",
        "Tile Size Mentioned",
        "Cutouts Shown/marked",
        "Cutout Dimensions Mentioned",
        "Tile Area Dimensions Mentioned",
        "Grouting Details Mentioned"

],
    wallcladding: [

        "Wall Cladding Elevation shown with dimensions",
        "Tile Size Mentioned",
        "Cutouts Shown/marked",
        "Cutout Dimensions Mentioned",
        "Tile Area Dimensions Mentioned"

    ],

    falseCeiling: [

        "Ceiling plan Layout shown with clear dimensions",
        "False Ceiling type mentioned with Legends",
        "Ceiling Sections shown: horizontal & vertical cuts with clear dimensions",
        "False Ceiling levels Mentioned",
        "Band Size Mentioned with clear dimension",
        "Cove Width and section shown with clear dimesnions",
        "Cove levels Mentioned",
        "Beam Locations Shown with clear dimensions",
        "Wardrobe clash checked",
        "Fan/light clash checked",
        "AC pelmet/pocket marked with clear dimensions",
        "Curtain Pelmet/pocket marked with clear dimensions"

    ],

    Pelmet: [

        "AC/Curtain Pelmet elevation shown with clear dimensions",
        "AC/Curtain Pelmet Section shown with drop/cove dimensions",
        "AC/Curtain Pelmet distance from FFL shown",
        "AC/Curtain pelmet shown with dimensions",
        "AC/Curtain pocket shown"

    ],

    electricalWall: [
        
        "New modules Shown in elevation with clear location xy coordinates",
        "Relocation modules shown in elevation with clear location xy coordinates",
        "Existing modules Shown in elevation with clear xy coordinates",
        "Module name and configuration Mentioned with socket(5A/15A)",
        "All Fixtures(lights etc) shown in elevation with xy coordinates",
        "Unique Legend and nomenclature shown for new/relocated/existing boards",
        "Primary and secondary Looping Shown in elevation for wall points/fixtures(lights etc)",
        "Looping Layout Shown for New modules",        
        "Conduit Routing Shown for New and Relocation modules(from nearest board or junction box)",
        "Unique Legend and nomenclature shown for light points",
        "Furniture Clash Checked",
        "RCC clash checked",
        "Accessibility for wiring Checked"

    ],

    electricalCeiling: [
        "All new Fixtures (lights,fan,sprinklers, smoke detectors (etc)) shown in layout in plan",
        "All Fixtures (lights,fan,sprinklers, smoke detectors (etc)) relocations shown(if any) shown in plan",
        "Modules shown in the layout for looping",
        "Primary Looping Shown with modules with color code",
        "Secondary Looping Shown with primary points with color code",
        "Cove light/track light/profile light clear dimensions shown",
        "All Fixtures Locations and dimensions Shown in plan",
        "All Fixture c/c Spacing and xy coordinates mentioned",
        "All Fixture Legend shown"

    ],

    kitchenplumbing: [

        "Plan Layout shown with dimensions",
        "Elevation Layout shown with dimensions",
        "Legend Available",
        "Existing Points shown with xy coordinates",
        "New Points shown with xy co-ordinates",
        "Relocated Points shown with xy co-ordinates",
        "Fixture Locations shown with xy co-ordinates",
        "Drain Points Shown on plan wiyh xy co-ordinats",
        "Waterproofing area Shown on floor and wall"

    ],
     bathroomplumbing: [

        "Plan Layout shown with dimensions",
        "Elevation Layout shown with dimensions",
        "Legend Available",
        "Existing Points shown with xy coordinates",
        "New Points shown with xy co-ordinates",
        "Relocated Points shown with xy co-ordinates",
        "Fixture Locations shown with xy co-ordinates",
        "Drain Points Shown on plan wiyh xy co-ordinats",
        "Waterproofing area Shown on floor and wall",
        "Shower cubicle clash checked",
        "Vanity/furniture clash checked",
        "Fixture heights are as per interior standards"

    ],

    painting: [

        "Paint Layout shown in plan with dimensions",
        "Elevation Layout Available",
        "Paint Area Identified",
        "Paint type  specification/type Mentioned",
        "Geometric/multicolor/block paint elevation shown with dimensions",
        "Texture paint elevation shown with dimensions"

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

    "Furniture plan available and Mandir location clearly identified",

    "All elevations provided (Front, Side and Internal where applicable)",

    "All sections provided (External and Internal wherever required)",

    "Overall dimensions (Length × Width × Height) mentioned",

    "All individual component dimensions mentioned (shelves, drawers, partitions, pedestals, skirting, top, etc.)",
    "All Individual component quantity (drawers, shelves etc) verified with the BOQ description",
    "Shutter details as per BOQ (quantity, size, opening direction and shutter type)",

    "Shutter design details as per BOQ with dimensions (grooves, CNC, glass, jali, fluting, profile, moulding or any decorative element, wherever applicable)",

    "Pocket door details complete (opening mechanism, dimensions, wherever applicable)",

    "Internal layout complete with dimensions for every storage compartment",
    
    "All partition details shown with dimensions (CNC partitions, vertical partitions, horizontal partitions, dividers, etc.)",

    "All material specifications mentioned for every component (Plywood/MDF/HDF/Solid Wood/Glass/Stone/Metal etc.)",

    "Material thickness specified for every component",

    "Finish type specified for every visible surface (Laminate, PU, Veneer, Acrylic, Duco, Paint, Polish, etc.)",

    "Finish code specified for every finished component",

    "Handle details complete (location and quantity)",

    "Lock details complete (location and quantity)",

    "Electrical provisions complete (light points, LED strips, switch placement wherever applicable)"

   

]

    // =====================================
    // WALL PANELLING
    // =====================================

    wallPanelling: [

        "Elevation shown with dimensions",
        "Section shown with dimensions",
        "Lenght, width and dept of panelling mentioned",
        "Any designs on Panelling like groove,T patti shown with dimensions",
        "Material Mentioned with specification(thickness, type)",
        "Laminate Code Mentioned",
        "Both Side Elevations Available",
        "Cove Details (if any) shown in the section with details",
        "Covelight shown along with electrical provision",
        "Skirting Interface Mentioned"

    ],

    // =====================================
    // MIRROR PANELLING
    // =====================================

    mirrorPanelling: [

        "Elevation Available",
        "Section Available",
        "Mirror Thickness Mentioned",
        "Mirror Type Mentioned",
        "Bevel Details Mentioned",
        "Frame Details Mentioned",
        "Backing Material Mentioned",
        "Backing Thickness Mentioned",
        "All Dimensions Mentioned"

    ],

    // =====================================
    // VANITY UNIT
    // =====================================

    vanityUnit: [

        "Plan shown with location shown in furniture layout",
        "Elevation shown with external and internal elevation",
        "Front and side Section shown with dimensions",
        "Internal elevation shown with dimensions and components",
        "Vertical/partition panels shown (As applicable)",
        "L x H X D dimensions are shown",
        "Shutter details shown along with opening side and details of design elements(as applicable)",
        "Internal Layout shown with dimensions (of shelves, drawers etc)",
        "Qty of drawers shown is as per BOQ",
        "Qty of shelves shown is as per BOQ",
        "Channels type is shown and is as per BOQ",
        "Material type and specification is mentioned and matches with BOQ",
        "Material Thickness (Ply,laminate etc) is mentioned and matches with BOQ",
        "Internal Finish Type mentioned and matches with BOQ",
        "External Finish Type mentioned and matches with BOQ",
        "Laminate/Veneer Code Mentioned (as applicable)",
        "All Lock location and Details Mentioned",
        "All Handle locations and Details Mentioned",
         "Any other Hardware details mentioned"

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
