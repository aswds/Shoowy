import { PresetType } from "./Preset";

export type ShowerType = "Contrast" | "Cold";
export type WarmColdShower = "Warm" | "Cold";
export type WarmColdTime = {
  warm: number;
  cold: number;
};

export type TimeType = Pick<
  PresetType,
  "cold_time" | "general_time" | "warm_time"
>;
