import fs from "node:fs";
import path from "node:path";
import { parseCsv } from "@/lib/csv";

export type WildfireRecord = {
  id: string;
  name: string;
  year: number;
  startDate: string;
  state: string;
  county: string;
  nearestTown: string;
  nearestPctLandmark: string;
  approxPctMile: string;
  sizeAcres: number;
  cause: string;
  structuresDestroyed: number | null;
  fatalities: number | null;
  dataConfidence: string;
  source: string;
};

export const MEGA_FIRE_THRESHOLD_ACRES = 50_000;

let cachedRecords: WildfireRecord[] | null = null;

function loadRecords(): WildfireRecord[] {
  if (cachedRecords) return cachedRecords;

  const csvPath = path.join(process.cwd(), "public/data/pct-wildfires.csv");
  const raw = fs.readFileSync(csvPath, "utf-8");
  const parsed = parseCsv(raw);

  cachedRecords = parsed.map((r) => ({
    id: r["#"],
    name: r["Fire Name"],
    year: Number(r["Year"]),
    startDate: r["Start Date"],
    state: r["State"],
    county: r["County/Area"],
    nearestTown: r["Nearest Town"],
    nearestPctLandmark: r["Nearest PCT Landmark"],
    approxPctMile: r["Approx. PCT Mile"],
    sizeAcres: Number(r["Size (Acres)"]),
    cause: r["Cause / Notes"],
    structuresDestroyed: r["Structures Destroyed"]
      ? Number(r["Structures Destroyed"])
      : null,
    fatalities: r["Fatalities"] ? Number(r["Fatalities"]) : null,
    dataConfidence: r["Data Confidence"],
    source: r["Source"],
  }));

  return cachedRecords;
}

export type EraStats = {
  label: string;
  startYear: number;
  endYear: number;
  yearCount: number;
  megaFireCount: number;
  megaFiresPerYear: number;
  acresPerYear: number;
  avgMegaFireSize: number;
};

function computeEraStats(
  records: WildfireRecord[],
  label: string,
  startYear: number,
  endYear: number
): EraStats {
  const eraFires = records.filter(
    (r) =>
      r.year >= startYear &&
      r.year <= endYear &&
      r.sizeAcres >= MEGA_FIRE_THRESHOLD_ACRES
  );
  const yearCount = endYear - startYear + 1;
  const totalAcres = eraFires.reduce((sum, r) => sum + r.sizeAcres, 0);

  return {
    label,
    startYear,
    endYear,
    yearCount,
    megaFireCount: eraFires.length,
    megaFiresPerYear: Math.round((eraFires.length / yearCount) * 100) / 100,
    acresPerYear: Math.round(totalAcres / yearCount),
    avgMegaFireSize: eraFires.length
      ? Math.round(totalAcres / eraFires.length)
      : 0,
  };
}

export function getWildfireAnalysis() {
  const records = loadRecords();
  const years = Array.from({ length: 2025 - 2000 + 1 }, (_, i) => 2000 + i);

  const yearlyTrend = years.map((year) => {
    const megaFires = records.filter(
      (r) => r.year === year && r.sizeAcres >= MEGA_FIRE_THRESHOLD_ACRES
    );
    const totalAcres = megaFires.reduce((sum, r) => sum + r.sizeAcres, 0);
    return {
      year,
      megaFires: megaFires.length,
      avgSize: megaFires.length ? Math.round(totalAcres / megaFires.length) : 0,
    };
  });

  const eras: EraStats[] = [
    computeEraStats(records, "2000–2012", 2000, 2012),
    computeEraStats(records, "2013–2019", 2013, 2019),
    computeEraStats(records, "2020–2025", 2020, 2025),
  ];

  const largestFires = [...records]
    .sort((a, b) => b.sizeAcres - a.sizeAcres)
    .slice(0, 6);

  return {
    totalFiresTracked: records.length,
    megaFireThreshold: MEGA_FIRE_THRESHOLD_ACRES,
    megaFireCount: records.filter((r) => r.sizeAcres >= MEGA_FIRE_THRESHOLD_ACRES)
      .length,
    yearRange: { start: 2000, end: 2025 },
    yearlyTrend,
    eras,
    largestFires,
  };
}
