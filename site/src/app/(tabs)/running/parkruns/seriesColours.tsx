// Combined approach: Enum with hex color values
enum ColorName {
  // Original fantastic colors
  PINK = "#e26ee6",
  YELLOW = "#d9ce3f",
  TEAL = "#42f5cb",
  CORAL = "#ff7875",
  LAVENDER = "#b19cd9",
  MINT = "#7dd3c0",
  PEACH = "#ffb347",
  SAGE = "#87a96b",
  PERIWINKLE = "#c5c5ff",
  ROSE_GOLD = "#e8b4cb",
  SEAFOAM = "#93e5ab",
  MAUVE = "#dda0dd",
  APRICOT = "#fbceb1",
  TURQUOISE = "#48cae4",
  LILAC = "#c8a2c8",
  SOFT_BLUE = "#87ceeb",
}

const placeColorMap: Record<string, ColorName> = {
  ArrowValley: ColorName.SOFT_BLUE,
  Birkenhead: ColorName.ROSE_GOLD,
  BlackRocks: ColorName.CORAL,
  CannonHill: ColorName.PEACH,
  ChevinForest: ColorName.MINT,
  Default: ColorName.MAUVE,
  HackneyMarshes: ColorName.SAGE,
  HampsteadHeath: ColorName.LAVENDER,
  MileEnd: ColorName.YELLOW,
  Millfield: ColorName.APRICOT,
  RothayPark: ColorName.TURQUOISE,
  Roundhay: ColorName.SEAFOAM,
  ToottingCommon: ColorName.LILAC,
  VictoriaDock: ColorName.PINK,
  WarwickRacecourse: ColorName.PERIWINKLE,
};

// Helper function to get the actual hex color for a place
const getColorForPlace = (place: string): string => {
  const colorName = placeColorMap[place] || placeColorMap.Default;
  return colorName;
};

const LocationColorMap: Record<string, string> = Object.fromEntries(
  Object.entries(placeColorMap).map(([place, colorName]) => [place, colorName])
);

export { ColorName, getColorForPlace, placeColorMap };
export default LocationColorMap;
