export type OdysseyStatus = "live" | "coming-soon";

export type OdysseySource = {
  label: string;
  detail?: string;
  url?: string;
};

export type OdysseyDataset = {
  label: string;
  file: string;
  rowCount: number;
  description: string;
};

export type OdysseyCta = {
  title: string;
  body: string;
  linkLabel?: string;
  href?: string;
};

export type Odyssey = {
  slug: string;
  title: string;
  hook: string;
  location: string;
  status: OdysseyStatus;
  theme: "ember" | "desert" | "dusk";
  summary: string;
  problemStatement?: string[];
  analysisIntro?: string[];
  callToAction?: OdysseyCta[];
  sources?: OdysseySource[];
  datasets?: OdysseyDataset[];
  comingSoonNote?: string;
  /** Direct link to this odyssey's specific PSA post. Falls back to the
   * general Instagram feed when not yet published. */
  videoUrl?: string;
};

export const odysseys: Odyssey[] = [
  {
    slug: "al-was-right",
    title: "Al Was Right",
    hook: "25 years of wildfire data along the Pacific Crest Trail says the 2020s aren't a bad stretch — they're the new baseline.",
    location: "Pacific Crest Trail, CA / OR / WA",
    status: "live",
    theme: "ember",
    summary:
      "Comparing the scale and frequency of wildfires along the PCT corridor over the last 25 years.",
    problemStatement: [
      "The Pacific Crest Trail runs 2,650 miles through the exact forests, watersheds, and mountain corridors that have absorbed the worst of the American West's wildfire escalation since 2000. Sections of the trail are now closed most summers — not as a rare event, but as an expected part of the season.",
      "\"Al Was Right\" is a name, not a subtitle: this odyssey is built to test a claim, not assert one. Is the wildfire trend along the PCT actually getting worse, or does it just feel that way because of media coverage? The data settles it.",
    ],
    analysisIntro: [
      "This analysis tracks every wildfire of 50,000 acres or more — the conventional threshold for a \"mega-fire\" — within roughly 50 miles of the PCT corridor from 2000 through 2025, drawn from a broader research pass covering every fire 10,000+ acres in the same corridor (206 fires, published in full below).",
      "The dataset is split into three eras to make the trend legible: 2000–2012, 2013–2019, and 2020–2025. Every figure below is computed directly from the published dataset, not hand-entered — the methodology and every row's individual source are in the downloadable CSV.",
    ],
    callToAction: [
      {
        title: "Back federal wildfire-resilience funding",
        body: "The U.S. Forest Service and National Interagency Fire Center have repeatedly flagged suppression-cost overruns eating into prevention budgets (prescribed burns, forest thinning, defensible-space programs). Tell your representatives that resilience funding — not just suppression funding — is the leverage point.",
      },
      {
        title: "Support defensible-space and WUI building codes",
        body: "Most of the structure loss in this dataset happened in the wildland-urban interface (WUI). Local defensible-space ordinances and fire-hardened building codes are some of the few interventions with direct, measurable effect on outcomes — and they're decided at the city and county level, where individual advocacy matters most.",
      },
      {
        title: "Reduce the emissions that lengthen fire season",
        body: "Longer, drier fire seasons are the mechanism connecting broader climate trends to what's on the ground here. Personal and institutional emissions reduction is a slower lever than local fire policy, but it's the one that changes the baseline this data is measuring.",
      },
    ],
    sources: [
      {
        label: "CAL FIRE incident archive & annual large-fire lists",
        detail: "fire.ca.gov/incidents — year-by-year official California incident data.",
      },
      {
        label: "USFS Pacific Northwest Region annual wildfire summaries",
        detail: "Official National Forest-level rankings of each year's largest Oregon and Washington fires.",
      },
      {
        label: "InciWeb incident archive",
        detail: "National Wildfire Coordinating Group incident information system.",
      },
      {
        label: "Wikipedia state wildfire-season articles & individual fire pages",
        detail: "Cross-referenced against primary agency sources for acreage, cause, structures, and fatalities.",
      },
      {
        label: "Individual fire source citations",
        detail: "Every one of the 206 rows in the published dataset carries its own specific source in the \"Source\" column — see the downloadable CSV below for row-level citations.",
      },
    ],
    datasets: [
      {
        label: "PCT Wildfire Dataset (2000–2026)",
        file: "/data/pct-wildfires.csv",
        rowCount: 206,
        description:
          "Every wildfire ≥10,000 acres identified within roughly 50 miles of the PCT corridor, 2000 through mid-2026: name, year, location, acreage, cause, structures destroyed, fatalities, financial damage, data-confidence flag, and source.",
      },
      {
        label: "PCT Trail Points",
        file: "/data/pct-trail-points.csv",
        rowCount: 86,
        description:
          "86 waypoints along the full PCT (US/Mexico to US/Canada border) — entry/exit points, resupply towns, and landmarks — for geographic context on where these fires sit relative to the trail.",
      },
    ],
  },
  {
    slug: "utah-national-monuments",
    title: "Utah National Monuments Odyssey",
    hook: "A 14-day journey through Utah's dry, windy, high-desert national monuments — documenting land and climate change impacts firsthand.",
    location: "Utah high desert",
    status: "coming-soon",
    theme: "desert",
    summary:
      "A 14-day field research trip through Utah's national monuments, tracking land-use and climate impacts on high-desert ecosystems.",
    comingSoonNote:
      "Field research and data collection for this odyssey are in progress. The full Problem Statement, Analysis, Call to Action, Sources, and Datasets will publish here once the trip is complete.",
  },
  {
    slug: "joshua-tree",
    title: "Joshua Tree Odyssey",
    hook: "Forecasts project the loss of roughly 90% of Joshua trees in Joshua Tree National Park over the next 50 years.",
    location: "Joshua Tree National Park, CA",
    status: "coming-soon",
    theme: "dusk",
    summary:
      "A forecasted story projecting the loss of the park's namesake species over the next half-century.",
    comingSoonNote:
      "Sourcing and analysis for this forecast are still being produced. The full Problem Statement, Analysis, Call to Action, Sources, and Datasets will publish here once research is complete.",
  },
];

export function getOdyssey(slug: string): Odyssey | undefined {
  return odysseys.find((o) => o.slug === slug);
}

export function getLiveOdysseys(): Odyssey[] {
  return odysseys.filter((o) => o.status === "live");
}
