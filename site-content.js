/* =====================================================================
   site-content.js — the single source of facts for this website.

   HOW THIS FILE WORKS
   - Every fact shown on the site comes from this file.
   - null            -> that item or section is hidden automatically.
   - "[NEEDS USER INFORMATION: ...]"  -> missing information. Highlighted
        in draft view; removed when settings.publishMode is true.
   - "[VERIFY ...]"  -> a value or wording you must confirm. It stays visible
        (highlighted) until you delete the bracketed marker yourself.
   - "[APPROVE ...]" -> wording you must approve. Same rule as VERIFY.
   - status values: "completed" | "in-progress" | "planned" | null
        (null in a status table = status not yet provided)

   Nothing in this file has been invented. Anything that was not told to
   the site's author is a placeholder or null.
   ===================================================================== */

const siteContent = {

  settings: {
    // false = draft view (placeholders highlighted, draft bar shown).
    // true  = published view: placeholders and the draft bar are hidden.
    publishMode: true
  },

  /* ------------------------------------------------------------------ */
  personal: {
    name: "Patrikios Constanti",   // Display name as chosen by the site owner (no middle name)
    headline: "Aerospace Engineering • Research • Engineering Design",
    // Intro wording supplied and approved by the site owner.
    intro: [
      "Student researcher interested in aerospace engineering, physics, and planetary exploration.",
      "My current work focuses on the design of a Martian rotorcraft, a project that began through mentorship at Queensborough Community College and has since continued independently. Earlier research examined a theoretical approach to increasing oxygen production within NASA’s MOXIE system through AP Research."
    ],
    // About text supplied by the site owner.
    about: [
      "Patrikios Constanti is a high school student at Massapequa High School with a strong interest in engineering and planetary exploration. He is especially drawn to projects that combine physics, 3D modeling, and hands-on experimentation. Outside the classroom, he enjoys archery, spray painting, jet skiing, and martial arts. He hopes to study aerospace engineering and eventually contribute to technologies that support future exploration of Mars."
    ],
    email: "patrikios0319@gmail.com",   // from the owner's résumé; owner said to use it
    resume: {
      file: "assets/resume.pdf",  // owner approved linking this file as is
      label: "Résumé (PDF)"
    }
  },

  /* ------------------------------------------------------------------ */
  featuredProjects: [
    {
      key: "marsRotorcraft",
      layout: "primary",
      title: "Martian Rotorcraft",
      category: "Aerospace design • Independent research (originally mentored)",
      status: "in-progress",
      summary: "Research question: To what extent can next-generation advances in commercial components be integrated to improve the performance of an Ingenuity-inspired rotorcraft? The planning stage and theoretical calculations are complete; blade printing and a Martian test chamber are in progress.",
      highlights: [
        { label: "Completed", value: "Planning stage (poster and presentation), rotor blade model and basic drone model in Autodesk Fusion, theoretical calculations" },
        { label: "In progress", value: "Martian test chamber, rotor blade 3D printing" },
        { label: "Origin", value: "Began through mentorship at Queensborough Community College; now independent" }
      ],
      tags: ["Rotor design", "Autodesk Fusion", "Theoretical calculations", "Martian test chamber"],
      image: "assets/img/rotorcraft-fusion-drone-model.png",
      imageAlt: "Gray 3D model of a basic drone design: a tall square column on a square base, with two pairs of horizontal arms and a thin flat plate at the top.",  // REQUIRED when image is set: describe what the image shows
      imageCaption: "Basic drone model, shown in Bambu Studio.",
      href: "projects/mars-rotorcraft.html",
      linkLabel: "View project"
    },
    {
      key: "moxie",
      layout: "compact",
      title: "MOXIE Research",
      category: "Theoretical analysis • AP Research",
      status: null,
      summary: "A theoretical analysis of how partial carbon monoxide thermal reduction of silicon dioxide could affect oxygen production in NASA’s MOXIE program. The proposal was not experimentally validated.",
      highlights: [
        { label: "AP Research score", value: "5" }
      ],
      tags: ["Oxygen production", "Chemical reduction", "Theoretical analysis"],
      image: "assets/img/moxie-flow-diagram.png",
      imageAlt: "Flow diagram with arrows between steps: CO₂ atmosphere, MOXIE electrolysis, O₂ plus CO, SiO₂ reduction, CO₂ recycled, repeat.",
      imageCaption: "Proposed oxygen-production loop (theoretical).",
      href: "projects/moxie.html",
      linkLabel: "View project"
    }
  ],

  /* ------------------------------------------------------------------ */
  // Listed oldest to newest. type: "mini" (compact) or "major" (links to a page).
  timeline: [
    {
      year: "2023",
      grade: "9th Grade",
      title: "Plant Growth in Microgravity",
      category: "Early experiment • Space biology / microgravity",
      type: "mini",
      status: null,
      summary: "A small microgravity-related experiment supporting a project on growing plants in space. Clover seeds in petri dishes were compared under simulated microgravity and Earth gravity, with and without added water, over two six-day intervals. Excess sunlight was also planned as a variable but could not be studied: those dishes were contaminated with bacteria and both motors failed.",
      details: [
        { label: "Question", value: "What factors are the most effective in stimulating plant growth in microgravity environments?" },
        { label: "Setup", value: "Clover seeds placed in petri dishes filled about 50% of the way with agar powder. Four groups were compared: microgravity water, microgravity control, Earth gravity water, and Earth gravity control. Each dish held 13 seeds. Water was the variable measured. The excess-sunlight dishes were contaminated with bacteria and could not be used." },
        { label: "Microgravity", value: "Simulated by centering the petri dish on a small motor mounted perpendicular to the ground and rotating it at high speed (the motor's highest throttle) to continuously change its orientation relative to gravity. The motor speed was not recorded." },
        { label: "Measurement", value: "Root and stem growth in centimeters over two six-day intervals (12 days in total)." },
        { label: "Conclusion from the data collected", value: "Seeds in microgravity that received excess water grew longer but did not change in growth direction. Time constraints, and the failure of both motors, prevented testing other variables." }
      ],
      figures: [
        {
          image: "assets/img/plant-microgravity-setup.png",
          alt: "A clear petri dish seen at an angle, with a few small green sprouts on pale agar, in front of laboratory equipment.",
          caption: "Example petri dish from the microgravity experiment."
        },
        {
          image: "assets/img/plant-seedlings.png",
          alt: "A petri dish held in a hand, with seedlings sending thin roots outward from a pale agar clump. Letters are written on the dish.",
          caption: "Example seedlings from the microgravity water group (dish labeled W). The Earth-gravity non-water group was labeled O."
        },
        {
          image: "assets/img/plant-growth-chart.png",
          alt: "Grouped bar chart titled Clover Seed Root and Stem Growth Over Two Six-Day Intervals, with four groups: microgravity water, microgravity control, Earth gravity water, and Earth gravity control. Each group has four bars for root and stem growth in the first and second period, with values between 0.6 and 1.1 centimeters.",
          caption: "Clover seed root and stem growth in centimeters over two six-day intervals for the four groups."
        }
      ]
    },
    {
      year: "2024–2026",
      grade: "10th–11th Grade",
      title: "MOXIE Oxygen-Production Analysis",
      category: "Research • AP Research",
      type: "major",
      status: null,
      summary: "A theoretical analysis, written for AP Research, of whether partial carbon monoxide thermal reduction of silicon dioxide could improve oxygen production in NASA’s MOXIE program. The proposal was not experimentally validated.",
      tags: ["Oxygen production", "Chemical reduction", "Theoretical analysis", "AP Research"],
      image: "assets/img/moxie-model-stage-3.png",
      imageAlt: "Diagram of a chamber in which CO rises as arrows toward CO₂, a green plus sign sits over an SiO₂ block between nickel and SPP electrodes, O₂ collects in a top port, and SiO leaves through the right-hand port.",
      imageCaption: "Stage 3 of the proposed model: CO reacts with SiO₂.",
      href: "projects/moxie.html",
      linkLabel: "View project"
    },
    {
      year: "2026",
      grade: "12th Grade",
      title: "Martian Rotorcraft",
      category: "Aerospace design • Independent research (originally mentored)",
      type: "major",
      status: "in-progress",
      summary: "Research and design project on an Ingenuity-inspired rotorcraft for the low-density Martian atmosphere, begun through mentorship at Queensborough Community College and now independent. Planning, CAD models, and theoretical calculations are done; blade printing and a Martian test chamber are in progress.",
      tags: ["Rotor design", "Autodesk Fusion", "Theoretical calculations", "Martian test chamber"],
      image: "assets/img/rotorcraft-design-trade-table.png",
      imageAlt: "Comparison table of NASA components and proposed components for the rotor, brushless motors, brushed motors, solar cells, landing gear and batteries, with measurements for each.",
      imageCaption: "Design comparison of Ingenuity components and proposed commercial components.",
      href: "projects/mars-rotorcraft.html",
      linkLabel: "View project"
    }
  ],

  /* ------------------------------------------------------------------ */
  // Dates as supplied (one month each). Bullet wording is kept as supplied (resume style).
  leadership: [
    {
      role: "Chapter Founder",
      org: "Massapequa SPARKS — STEM Education Chapter",
      dates: "March 2026 – present",
      bullets: [
        "Founded STEM Education Chapter",
        "Built 5-member board",
        "Organize labs/tutoring for 30+ elementary students",
        "Coordinate 10+ volunteers"
      ]
    },
    {
      role: "Service Leader",
      org: "National Honor Society",
      dates: "June 2026 – present",
      bullets: [
        "Lead service initiatives for 283+ members",
        "Manage 50+ students",
        "Coordinate community events w/ leaders",
        "Created monthly NHS newsletter"
      ]
    },
    {
      role: "Vice President",
      org: "National Spanish Honor Society",
      dates: "June 2026 – present",
      bullets: [
        "Help lead 140+ members",
        "Oversee 30 student volunteers",
        "Coordinate 6 Hispanic community events",
        "Regularly communicate in Spanish"
      ]
    }
  ],

  /* ------------------------------------------------------------------ */
  projects: {

    marsRotorcraft: {
      title: "Martian Rotorcraft",
      category: "Aerospace design • Independent research (originally mentored)",
      status: "in-progress",
      summary: "Research and design of an Ingenuity-inspired rotorcraft for flight in the low-density Martian atmosphere.",
      facts: [
        { label: "Type", value: "Independent research and design project, originally mentored" },
        // The mentor is intentionally not named (owner's instruction).
        { label: "Origin", value: "Began through mentorship at Queensborough Community College; now independent" },
        { label: "Support", value: "CUNY STEM Research Academy, through a grant from The Pinkerton Foundation" },
        { label: "CAD software", value: "Autodesk Fusion" },
        { label: "Current stage", value: "Martian test chamber and final rotor blade fabrication in progress" }
      ],

      // status: "completed" | "in-progress" | "planned" | null (null = not yet provided)
      statusTable: [
        { stage: "Planning stage", status: "completed", note: "Poster and presentation at the NYCSRM Consortium Student Research Symposium, held at the American Museum of Natural History on August 13, 2026" },
        { stage: "Rotor blade model (CAD)", status: "completed", note: "Built in Autodesk Fusion" },
        { stage: "Basic drone model (CAD)", status: "completed", note: "A basic model, built in Autodesk Fusion" },
        { stage: "Theoretical calculations", status: "completed", note: "Equations and data kept in an Excel sheet" },
        { stage: "Martian test chamber", status: "in-progress", note: "Intended to measure solar cell efficiency in a simulated Martian environment" },
        { stage: "Thrust stand (brushless motor and rotor blades)", status: "planned", note: null },
        { stage: "Prototype blade manufacturing (3D printing)", status: "in-progress", note: "An initial PLA prototype was printed; fabrication of the final PC-carbon-fiber blade is still in progress" },
        { stage: "Complete drone construction", status: "planned", note: null },
        { stage: "Flight testing", status: "planned", note: null }
      ],

      // Each section: { paragraphs, specs, items, figures } — any may be omitted.
      // null = hidden.
      sections: {
        overview: {
          paragraphs: [
            "An independent research and design project on a rotorcraft inspired by Ingenuity, the Mars helicopter, for flight in the low-density Martian atmosphere.",
            "The project began through mentorship at Queensborough Community College and has since continued independently.",
            "This work was supported by the CUNY STEM Research Academy through a grant from The Pinkerton Foundation.",
            "The planning stage was completed with a poster and presentation at the NYCSRM Consortium Student Research Symposium, held at the American Museum of Natural History on August 13, 2026."
          ],
          figures: [
            {
              image: "assets/img/rotorcraft-symposium-poster.jpg",
              alt: "A trifold poster titled Theoretical analysis on the performance of a next generation Martian rotorcraft, with equations, graphs, tables, and a results section, standing on a draped table beside a small red 3D-printed drone model.",
              caption: "The poster and a model at the symposium (photo dated August 13, 2026)."
            }
          ]
        },

        question: {
          paragraphs: [
            "To what extent can next-generation advances in commercial components be integrated to improve the performance of an Ingenuity-inspired rotorcraft?"
          ]
        },

        design: {
          paragraphs: [
            "The NACA 4412 airfoil was selected after evaluating airfoils against the low Reynolds number on Mars (about 20,000; calculated as roughly 18,261). Ingenuity's CLF5605 airfoil is very thin (about 5%) and has a small stable angle-of-attack range. NACA 4404, the closest NACA airfoil, is thinner still and, under the conditions considered in my analysis, was expected to provide less lift and offer less margin before flow separation. Published work on modified (slotted and grooved) NACA 4412 configurations reports substantially increased lift under the conditions tested, so it was chosen to provide enough lift for a heavier, payload-ready rotorcraft.",
            "The 0.3025 m radius and 0.0705 m chord were decided with respect to Ingenuity, whose blades have a 0.605 m radius and 0.1410 m chord.",
            "A material-collection system based on Spirobs, a tentacle-like spiral arm, is being explored as a possible addition. Its tentacles would likely be made of silicone rubber, which tolerates very low temperatures, or of TPU filament. This is an early concept shown only in sketches; nothing has been built or tested.",
            "A comparison of Ingenuity's components with the proposed commercial components, and a component mass table, are shown below. These are design comparisons, not test results."
          ],
          specs: [
            { label: "Airfoil", value: "NACA 4412" },
            { label: "Rotor radius", value: "0.3025 m" },
            { label: "Chord", value: "0.0705 m" },
            { label: "Primary thrust-test motor", value: "MAD M6C12 IPE 280KV brushless motor" }
          ],
          figures: [
            {
              image: "assets/img/rotorcraft-design-trade-table.png",
              alt: "Comparison table with columns for component, NASA, NASA measurements, proposed, and proposed measurements. Rotor: CLF5605 with radius 0.605 versus NACA 4412 with radius 0.3025. Brushless motors: 425 W at 3300 RPM versus MAD M6C12 280KV at 948.8 W and 5291 RPM. Solar cells: 3.56 g and 2.65 W versus 11.56 g and 6.0 W. Landing gear: 0.120 kg versus 0.035 kg. Batteries: 278 versus 500 Wh/kg.",
              caption: "Ingenuity components (NASA) compared with the proposed commercial components. NASA values come from the NASA sources cited in the research paper."
            },
            {
              image: "assets/img/rotorcraft-component-mass-table.png",
              alt: "Table of component masses with columns for object, weight in kilograms, quantity, and total weight. Rows include brushless motors, brushed motors, batteries, landing gear, blades, camera, radio, heater, and other parts, down to shafts at 0.3 kg.",
              caption: "Component mass table (part 1 of 2)."
            },
            {
              image: "assets/img/rotorcraft-component-mass-table-part2.png",
              alt: "Continuation of the component mass table: bearings for shafts 0.22 kg, cooling hardware 0.12, swashplate linkage rods 0.22, mounting tape 0.12, wiring 0.3, springs 0.04, nine solar panels at 0.01156 each for 0.10386, and a 12S ESC battery at 2.86, followed by a final total of 7.75102.",
              caption: "Component mass table (part 2 of 2), ending in a current calculated total of 7.75102 kg. The earlier poster estimate was about 7.74 kg."
            }
          ]
        },

        theory: {
          paragraphs: [
            "The preparation stage used theoretical calculations built from various equations and data, kept in an Excel sheet. These are calculated values, not measurements.",
            "Lift and drag were calculated with Blade Element Theory: lift is directly proportional to atmospheric density, lift coefficient, chord length, and blade radius, and proportional to the square of the blade's linear velocity. The lift calculation used a slotted NACA 4412 blade with a lift coefficient of 2.09 at an 18 degree angle of attack, taken from published work on that configuration. The 10.4685 N per blade applies only to that slotted configuration. Drag used the same equation with a drag coefficient of 0.1.",
            "Selected inputs and outputs are listed below. The results are modeled under idealized conditions and were not experimentally validated.",
          ],
          specs: [
            { label: "Rotor radius", value: "0.3025 m" },
            { label: "Chord length", value: "0.0705 m" },
            { label: "Rotor speed", value: "5291 RPM (88.18 rev/s)" },
            { label: "Blade-tip speed", value: "167.6 m/s" },
            { label: "Tip Mach number", value: "0.698 (speed of sound 240 m/s)" },
            { label: "Atmospheric density used", value: "0.017 kg/m³" },
            { label: "Reynolds number", value: "18,261.5 (as listed in the sheet)" },
            { label: "Configuration", value: "4 motors, 2 blades per motor, 8 blades in total" },
            { label: "Modeled lift per blade", value: "10.4685 N (slotted NACA 4412, lift coefficient 2.09 at 18°)" },
            { label: "Modeled stable-flight blade speed", value: "101.28 m/s at about 3197 RPM (60% throttle)" },
            { label: "Modeled airtime", value: "2086 s (about 34.8 minutes), compared with Ingenuity's 90 s" },
            { label: "Modeled solar charge time", value: "about 11,148 s, compared with Ingenuity's 88,750 s" },
            { label: "Modeled payload capacity", value: "33.26 N" }
          ],
          figures: [
            {
              image: "assets/img/rotorcraft-blades-vs-acceleration.png",
              alt: "Bar chart of acceleration in meters per second squared under Martian gravity for 2, 4, 8, 12, 16 and 20 blades. The values are about -1.1, 0.6, 3.7, 5.9, 7.5 and 9.0.",
              caption: "Calculated acceleration under Martian gravity for different blade counts (a calculation, not a measurement)."
            },
            {
              image: "assets/img/rotorcraft-flight-phases.png",
              alt: "Three boxes joined by arrows, with rotor blade speed, time, and energy for each phase. Take Off: 167 m/s, 5.3 seconds, 21,996 joules. Stable: 101.28 m/s, 2086 seconds, 3,166,490 joules. Descent: 0 m/s, 3.27 seconds, 1,881 joules.",
              caption: "Calculated values for three flight phases (not measurements). The m/s values are rotor blade speeds, matching the 167.6 m/s and about 101.28 m/s blade speeds on the poster."
            }
          ]
        },

        cad: {
          paragraphs: [
            "A rotor blade model and a basic drone model were built in Autodesk Fusion."
          ],
          figures: [
            {
              image: "assets/img/rotorcraft-airfoil-profile.png",
              wide: true,
              alt: "Side-profile sketch of a thin, curved airfoil on a dark CAD grid, with a dimension line labeled 70.50 between the two end points.",
              caption: "Airfoil side-profile sketch with a 70.50 mm dimension between the end points, matching the 0.0705 m chord."
            },
            {
              image: "assets/img/rotorcraft-sketch-layout.jpg",
              alt: "Hand-drawn pen and pencil sketches on lined paper showing a drone with stacked rotor blades on a central column, with dimensions written beside each part, a stack of segments labeled as a tentacle-like arm, and several airfoil outlines along the bottom.",
              caption: "Hand sketches used to work out the drone's shape and layout, including a proposed Spirobs-style material-collection arm. Early design work, not a final design."
            },
            {
              image: "assets/img/rotorcraft-sketch-solar-array.jpg",
              alt: "Hand-drawn sketch of a three-by-three array of solar cells with overall width and height dimensions written beside it, and smaller sketches of batteries and other components with dimensions below.",
              caption: "Hand sketch of the nine-cell solar array layout and component dimensions, used to plan placement on the drone."
            },
            {
              image: "assets/img/rotorcraft-fusion-front-view.png",
              alt: "Front view of a drone model in a CAD workspace: a tall central column on a square base, two pairs of horizontal arms each carrying a curved rotor-blade sketch, and a thin rotor shape on top.",
              caption: "Front view of the basic drone model in Autodesk Fusion, with rotor-blade arcs sketched on each arm."
            },
            {
              image: "assets/img/rotorcraft-fusion-drone-model.png",
              alt: "Gray 3D model of a basic drone design: a tall square column on a square base, with two pairs of horizontal arms and a thin flat plate at the top.",
              caption: "Basic drone model, shown in Bambu Studio."
            }
          ]
        },

        manufacturing: {
          paragraphs: [
            "An initial PLA prototype was printed; fabrication of the final PC-carbon-fiber blade is still in progress. The blade is modeled in Autodesk Fusion.",
            "A pink printed blade shown in the poster photo was measured at a 70.5 mm chord length.",
            "Complete drone construction and flight testing are planned and have not started."
          ]
        },

        experimentalSetup: {
          paragraphs: [
            "A Martian test chamber is in progress.",
            "The chamber is intended to measure the efficiency of the Sunpower 6.0 W, 0.72 V, 10 A semiflexible mono solar cell (Gen 5) in a simulated Martian environment, using a similar solar source and hematite dust particles to approximate Martian dust as closely as possible.",
            "The chamber attempts to simulate a temperature of about 0 °C. Reaching -60 °C was judged too dangerous. Martian pressure and gas could not be simulated. A wind tunnel will be used for both the solar cell tests and the thrust stand to simulate Martian wind speeds and airflow.",
            "A thrust stand with the brushless motor and rotor blades is planned.",
            "Nine blade variants are laid out for comparison in the table below. Its print time, thrust, torque, mass, and center of gravity rows are empty."
          ],
          figures: [
            {
              image: "assets/img/rotorcraft-planned-blade-variants.png",
              alt: "Table comparing nine planned blade models, Blade One to Blade Nine, by radius 0.3025 m, chord length 0.0705 m, thickness, NACA number 4412, carbon fiber material, twist angle 5, critical angle, boundary layer separation, and aerodynamic center 0.017625 m. Rows for print time, thrust, torque, mass and center of gravity are empty.",
              caption: "Planned blade variants (design table, not test results). Every blade uses the NACA 4412 airfoil, modified to the thickness shown for that blade."
            },
            {
              image: "assets/img/rotorcraft-chamber-components.jpg",
              alt: "Top-down view of a large clear storage container holding a flat panel light source in plastic wrapping, black flexible ducting, round black duct fittings, a power unit and a cardboard box.",
              caption: "Test chamber components: the container, the light source meant to simulate the Martian sun, and tubes and ducts for the wind tunnel."
            },
            {
              image: "assets/img/rotorcraft-solar-cell.jpg",
              alt: "A single flat monocrystalline solar cell with fine parallel silver lines and clipped corners, inside a clear plastic bag lying on a white surface.",
              caption: "One of the purchased solar cells to be tested in the chamber."
            },
            {
              image: "assets/img/rotorcraft-chamber-fan.jpg",
              alt: "Looking into a round black ribbed duct fan with a silver five-bladed impeller around a central hub.",
              caption: "The fan used to simulate Martian winds."
            }
          ]
        },

        testing: null,             // DO NOT DISPLAY UNTIL PROVIDED
        results: null,             // DO NOT DISPLAY UNTIL PROVIDED (no thrust or flight results given)
        problems: {
          heading: "Limitations",
          paragraphs: [
            "The project is theoretical and has no experimental backing. The lift and drag equations did not account for Martian wind or dust, and the solar calculations did not account for the very low temperatures near the Martian surface.",
            "No specific products were chosen for the processor, sensors, landing gear, and radio, so their mass and power figures are estimates. The lift calculations assume a slotted NACA 4412 blade, which has not been tested in high winds or heavy dust."
          ]
        },
        iteration: null,           // DO NOT DISPLAY UNTIL PROVIDED
        learned: null,             // DO NOT DISPLAY UNTIL PROVIDED
        nextSteps: null            // DO NOT DISPLAY UNTIL PROVIDED
      }
    },

    moxie: {
      title: "MOXIE Research",
      category: "Theoretical analysis • AP Research",
      status: null,
      summary: "A theoretical analysis of partial carbon monoxide thermal reduction of silicon dioxide as a way to affect oxygen production in NASA’s MOXIE program.",
      facts: [
        { label: "Paper title", value: "“A Theoretical Systems-Level Analysis of Silicon Dioxide Reduction Pathways Integrated with NASA’s MOXIE Program”" },
        { label: "Type", value: "Theoretical analysis; not experimentally validated" },
        { label: "Course", value: "AP Research" },
        { label: "AP Research score", value: "5" },
        { label: "Period", value: "2024–2026" }
      ],
      statusTable: null,

      sections: {
        overview: {
          paragraphs: [
            "A theoretical analysis of whether carbon monoxide associated with NASA’s MOXIE program could be used to partially reduce silicon dioxide and potentially recycle carbon dioxide back into the oxygen-production process.",
            "This was research and analysis only. The proposed approach was not experimentally validated, and it has not been shown to be practical."
          ],
          figures: [
            {
              image: "assets/img/moxie-flow-diagram.png",
              alt: "Flow diagram with arrows between steps: CO₂ atmosphere, MOXIE electrolysis, O₂ plus CO, SiO₂ reduction, CO₂ recycled, repeat.",
              caption: "Proposed loop (theoretical): CO₂ is electrolyzed into O₂ and CO, the CO reduces SiO₂, and the resulting CO₂ is recycled."
            }
          ]
        },

        question: {
          paragraphs: [
            "To what extent can the partial carbon monoxide thermal reduction of silicon dioxide improve the oxygen production in NASA’s MOXIE program?"
          ]
        },

        design: {
          heading: "Proposed model in four stages",
          paragraphs: [
            "The proposed process is drawn as four stages inside a single chamber with nickel and SPP electrodes and a yttria-stabilized zirconia port connected to negative pressure."
          ],
          figures: [
            {
              image: "assets/img/moxie-model-stage-1.png",
              alt: "Diagram of a chamber with CO₂ entering from the left, nickel and SPP electrodes with an SiO₂ block between them at the bottom, SiO₂, Al₂O₃ and Fe₂O₃ entering from below, and a yttria-stabilized zirconia port at the top connected to negative pressure.",
              caption: "Stage 1: CO₂ and SiO₂ enter the chamber."
            },
            {
              image: "assets/img/moxie-model-stage-2.png",
              alt: "The same chamber with green arrows from two CO₂ molecules toward O₂ and CO. An orange arrow carries the O₂ up through the zirconia port.",
              caption: "Stage 2: CO₂ is split into O₂ and CO, and the O₂ passes through the zirconia to the negative-pressure side."
            },
            {
              image: "assets/img/moxie-model-stage-3.png",
              alt: "The chamber with O₂ collected in the top port, CO with arrows pointing up toward CO₂, a green plus sign over the SiO₂ block, and SiO leaving through the right-hand port with an orange arrow.",
              caption: "Stage 3: CO reacts with SiO₂, forming CO₂ and SiO, and the SiO leaves through the right-hand port."
            },
            {
              image: "assets/img/moxie-model-stage-4.png",
              alt: "The chamber with O₂ in the top port, two CO₂ in the chamber, SiO in the right-hand port, and SiO₂, Al₂O₃ and Fe₂O₃ entering from below.",
              caption: "Stage 4: O₂ collected at the top, SiO in the right-hand port, CO₂ in the chamber, and SiO₂ fed in from below."
            }
          ]
        },

        theory: {
          paragraphs: [
            "MOXIE splits carbon dioxide into oxygen and carbon monoxide, and the carbon monoxide is an underused byproduct. The analysis asks whether that carbon monoxide could partially reduce silicon dioxide, the most abundant compound in Martian regolith, at about 1700 °C, producing silicon monoxide and carbon dioxide. The carbon dioxide would then return to MOXIE-style electrolysis to yield more oxygen. A stoichiometric model was used because experimental validation was not feasible.",
            "Under idealized conditions the model predicted an additional 7.968 g of oxygen on top of MOXIE's baseline of about 6 g, an increase of roughly 132.8%. The sensitivity analysis found that the electrolysis step limits the system: raising its conversion efficiency changes the output far more than raising the reduction step's. These are theoretical results and not evidence that the system would work in practice.",
            "Model assumptions: full collection and reuse of the carbon monoxide, carbon dioxide perfectly filtered into the system, the reduction occurring as written, and no accounting for reaction kinetics or energy and cost requirements. The conversion efficiencies were estimated from literature values obtained under differing conditions, so the outputs are approximations."
          ],
          figures: [
            {
              image: "assets/img/moxie-equation-reduction.png",
              alt: "2SiO₂ + 2CO → 2SiO + 2CO₂",
              caption: "Reduction step: 2SiO₂ + 2CO → 2SiO + 2CO₂"
            },
            {
              image: "assets/img/moxie-equation-electrolysis.png",
              alt: "2CO₂ → O₂ + 2CO",
              caption: "Electrolysis step: 2CO₂ → O₂ + 2CO"
            },
            {
              image: "assets/img/moxie-model-graph.png",
              alt: "Line chart of modeled oxygen yield in grams, from 0 to 50, against conversion efficiency from 10% to 100%, for two series. Electrolysis efficiency rises from about 5 g to about 47 g. Reduction efficiency rises from about 7 g to about 16 g.",
              caption: "Sensitivity graph of modeled oxygen produced (grams) versus percent conversion efficiency (a model, not a measurement). The blue line is oxygen produced as the conversion efficiency of the electrolysis step increases, and the red line is oxygen produced as the conversion efficiency of the reduction step alone increases. The model starts from 1.0 mol of silicon dioxide, an 83% reduction yield taken from literature, and a 30% electrolysis conversion efficiency, which is MOXIE's roughly 6 g of oxygen per 55 g of carbon dioxide compared with the theoretical maximum of about 20 g."
            }
          ]
        },

        cad: null,
        manufacturing: null,
        experimentalSetup: null,
        testing: null,
        results: null,             // DO NOT DISPLAY UNTIL PROVIDED (no experimental results exist)

        problems: {
          heading: "Limitations",
          paragraphs: [
            "The proposal could not be tested experimentally: limited access to specialized materials, equipment, and funding prevented experimental validation.",
            "Beyond the lack of experimental validation, the analysis lacks theoretical thermodynamic backing: the reaction pathway is not experimentally validated in the form modeled, and Gibbs free energy, equilibrium constraints, reaction kinetics, reactor power requirements, thermal losses, and system mass were not evaluated. The yttria-stabilized zirconia oxygen filter used by NASA is not available on public markets, and the separation of silicon dioxide from other regolith compounds was outside the study’s scope. Increased oxygen yield alone does not mean a better system, because the power needed for high-temperature reduction could offset the gain."
          ]
        },

        iteration: null,
        learned: null,             // DO NOT DISPLAY UNTIL PROVIDED
        nextSteps: null            // DO NOT DISPLAY UNTIL PROVIDED
      }
    }
  }
};
