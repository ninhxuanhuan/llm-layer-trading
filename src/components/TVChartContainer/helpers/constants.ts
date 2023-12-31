export const SUPPORTED_RESOLUTIONS = {
  240: "4h",
  480: "8h",
  1440: "1d"
}

export const FAVORITES_INTERVAL = ["240", "480", "1440"];

export const CHART_PERIODS = {
  "4h": 60 * 60 * 4,
  "8h": 60 * 60 * 8,
  "1d": 60 * 60 * 24
};

export const LAST_BAR_REFRESH_INTERVAL = 15000; // 15 seconds
export const TV_CHART_RELOAD_INTERVAL = 15 * 60 * 1000; // 15 minutes
export const DEFAULT_LIBRARY_URL = "https://chart.oraidex.io/charting_library.standalone.js";
