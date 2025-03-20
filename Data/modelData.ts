export type Subject = "Chemistry" | "Biology" | "Physics" | "Astronomy";

export const subjects: Subject[] = [
  "Chemistry",
  "Biology",
  "Physics",
  "Astronomy",
];

export interface Model {
  name: string;
  file: string;
  id: number;
  description: string; // Add description for each model
}

export const models: Record<Subject, Model[]> = {
  Chemistry: [
    {
      name: "Water molecule",
      file: "drop_of_water.glb",
      id: 1,
      description:
        "The water molecule consists of two hydrogen atoms and one oxygen atom, forming H₂O.",
    },
    {
      name: "Oxygen atom",
      file: "oxy-atom.glb",
      id: 2,
      description:
        "Oxygen is a chemical element with the symbol O and atomic number 8.",
    },
    {
      name: "Diamond",
      file: "diamond.glb",
      id: 3,
      description:
        "Diamond is a solid form of carbon with a crystalline structure.",
    },
    {
      name: "Diamond Molecular Structure",
      file: "diamond_molecule_structure.glb",
      id: 4,
      description:
        "A representation of the molecular structure of diamond, showing its tetrahedral bonding.",
    },
  ],
  Biology: [
    {
      name: "Heart",
      file: "heart.glb",
      id: 5,
      description:
        "The human heart is a muscular organ that pumps blood throughout the body.",
    },
    {
      name: "Heart Internal",
      file: "hollow-heart-2.glb",
      id: 6,
      description:
        "An internal view of the heart showing its chambers and valves.",
    },
    {
      name: "Brain",
      file: "brain.glb",
      id: 7,
      description:
        "The brain is the command center of the human body, controlling thoughts and movements.",
    },
    {
      name: "Brain Internal",
      file: "brain-hollow.glb",
      id: 8,
      description:
        "An internal view of the brain, showing its complex neural structures.",
    },
    {
      name: "Eye",
      file: "eye.glb",
      id: 9,
      description: "The human eye is a sensory organ that allows vision.",
    },
    {
      name: "Eye Internal",
      file: "half-eye.glb",
      id: 10,
      description:
        "A cutaway view of the eye displaying the retina, lens, and optic nerve.",
    },
  ],
  Physics: [
    {
      name: "Magnetic field of solenoid",
      file: "solenoid.glb",
      id: 11,
      description:
        "A solenoid generates a magnetic field when an electric current passes through it.",
    },
    {
      name: "Prism",
      file: "reflectionrefraction_prism.glb",
      id: 12,
      description:
        "A prism refracts and disperses light into its spectral colors.",
    },
    {
      name: "Newton's Cradle",
      file: "newton_craddle.glb",
      id: 13,
      description:
        "Newton’s Cradle demonstrates the conservation of momentum and energy.",
    },
    {
      name: "Nuclear Fission",
      file: "nuclear_fission.glb",
      id: 14,
      description:
        "Nuclear fission is a reaction where a heavy nucleus splits, releasing energy.",
    },
    {
      name: "Cathode Ray",
      file: "cathode_ray_tube_thomsons_experiment.glb",
      id: 15,
      description:
        "Cathode ray tubes were used in early experiments to study electron behavior.",
    },
  ],
  Astronomy: [
    {
      name: "Blackhole",
      file: "black_hole.glb",
      id: 16,
      description:
        "A black hole is a region of spacetime where gravity is so strong that nothing can escape.",
    },
    {
      name: "Earth",
      file: "earth.glb",
      id: 17,
      description:
        "Earth is the third planet from the Sun and the only astronomical object known to support life.",
    },
    {
      name: "Jupiter",
      file: "jupiter.glb",
      id: 18,
      description:
        "Jupiter is the largest planet in the solar system, known for its Great Red Spot.",
    },
    {
      name: "Saturn",
      file: "saturn.glb",
      id: 19,
      description:
        "Saturn is famous for its stunning ring system composed of ice and rock particles.",
    },
    {
      name: "Venus",
      file: "venus.glb",
      id: 20,
      description:
        "Venus is the second planet from the Sun, with a thick, hot atmosphere.",
    },
  ],
};

// Mapping model filenames to asset paths
export const modelSources: Record<string, any> = {
  "black_hole.glb": require("../assets/Models/astronomy/black_hole.glb"),
  "earth.glb": require("../assets/Models/astronomy/earth.glb"),
  "jupiter.glb": require("../assets/Models/astronomy/jupiter.glb"),
  "saturn.glb": require("../assets/Models/astronomy/saturn.glb"),
  "venus.glb": require("../assets/Models/astronomy/venus.glb"),
  "brain-hollow.glb": require("../assets/Models/bio/brain/brain-hollow.glb"),
  "brain.glb": require("../assets/Models/bio/brain/brain.glb"),
  "eye.glb": require("../assets/Models/bio/eye/eye.glb"),
  "half-eye.glb": require("../assets/Models/bio/eye/half-eye.glb"),
  "heart.glb": require("../assets/Models/bio/heart/heart.glb"),
  "hollow-heart-2.glb": require("../assets/Models/bio/heart/heart-hollow-2.glb"),
  "oxy-atom.glb": require("../assets/Models/chem/atom/oxy-atom.glb"),
  "diamond_molecule_structure.glb": require("../assets/Models/chem/diamond/diamond_molecule_structure.glb"),
  "diamond.glb": require("../assets/Models/chem/diamond/diamond.glb"),
  "drop_of_water.glb": require("../assets/Models/chem/water/drop_of_water.glb"),
  "cathode_ray_tube_thomsons_experiment.glb": require("../assets/Models/physics/cathode/cathode__ray_tube_thomsons_experiment.glb"),
  "nuclear_fission.glb": require("../assets/Models/physics/fission/nuclear_fission.glb"),
  "newton_craddle.glb": require("../assets/Models/physics/newton/newton_craddle.glb"),
  "reflectionrefraction_prism.glb": require("../assets/Models/physics/prism/reflectionrefraction_prism.glb"),
  "solenoid.glb": require("../assets/Models/physics/solenoid/solenoid.glb"),
};
