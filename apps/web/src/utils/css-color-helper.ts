import hexRgb from "hex-rgb";

export const obj = {
  "--reddit-0": "#141415",
  "--reddit-1:": "#19191a",
  "--reddit-2": "#28282a",
  "--reddit-3": "#f40",
  "--primary-0": "#102a42",
  "--primary-1": "#243a52",
  "--primary-2": "#324d67",
  "--primary-3": "#48647f",
  "--primary-4": "#617d98",
  "--primary-5": "#829ab0",
  "--primary-6": "#9eb2c7",
  "--primary-7": "#bcccdc",
  "--primary-8": "#dae2ec",
  "--primary-9": "#f1f5f8",
  "--secondary-0": "#d7be69",
  "--secondary-1": "#486581",
  "--secondary-2": "#9fb3c8",
  "--accents-0": "#1a1d1e",
  "--accents-1": "#414442",
  "--accents-2": "#7d7d7d",
  "--accents-3": "#a3a3a3",
  "--accents-4": "#cfcece",
  "--accents-5": "#e3e3e3",
  "--accents-6": "#f5f4f0",
  "--fade50": "#fbf9ef",
  "--fade100": "#f3ecd2",
  "--fade200": "#e6d8a1",
  "--fade300": "#d7be69",
  "--fade400": "#d0ad4f",
  "--fade500": "#c6933a",
  "--fade600": "#af7530",
  "--fade700": "#92592b",
  "--fade800": "#784728",
  "--fade900": "#633b24",
  "--fade950": "#381e10",
  "--fadegray": "#565656",
  "--fadedark50": "#bf9f33",
  "--fadedark100": "#af922f",
  "--fadedark200": "#a0852b",
  "--fadedark300": "#907826",
  "--fadedark400": "#816b22",
  "--fadedark500": "#715e1e",
  "--fadedark600": "#62511a",
  "--fadedark700": "#524516",
  "--fadedark800": "#433812",
  "--fadedark900": "#332b0e",
  "--fadedark1000": "#241e0a",
  "--fadedark1100": "#141105",
  "--fadedark1200": "#050401",
  "--customgray50": "#fafafa",
  "--customgray100": "#f4f4f5",
  "--customgray200": "#e4e4e7",
  "--customgray300": "#d4d4d8",
  "--customgray400": "#a1a1aa",
  "--customgray500": "#71717a",
  "--customgray600": "#52525b",
  "--customgray700": "#3f3f46",
  "--customgray800": "#27272a",
  "--customgray900": "#18181b",
  "--customgray1000": "#09090b",
  "--customgray1100": "#111113",
  "--customgray1200": "#0a0a0b",
  "--woodsmoke50": "#f6f6f6",
  "--woodsmoke100": "#e7e7e7",
  "--woodsmoke200": "#d1d1d1",
  "--woodsmoke300": "#b0b0b0",
  "--woodsmoke400": "#888888",
  "--woodsmoke500": "#6d6d6d",
  "--woodsmoke600": "#5d5d5d",
  "--woodsmoke700": "#4f4f4f",
  "--woodsmoke800": "#454545",
  "--woodsmoke900": "#3d3d3d",
  "--woodsmoke950": "#151515",
  "--fuscousgray50": "#f6f6f6",
  "--fuscousgray100": "#e7e7e7",
  "--fuscousgray200": "#d1d1d1",
  "--fuscousgray300": "#b0b0b0",
  "--fuscousgray400": "#888888",
  "--fuscousgray500": "#6d6d6d",
  "--fuscousgray600": "#5d5d5d",
  "--fuscousgray700": "#505050",
  "--fuscousgray800": "#454545",
  "--fuscousgray900": "#3d3d3d",
  "--fuscousgray950": "#262626"
} as const;

export const hexToRgbForTailwindBaseLayer = () => {
  return Object.entries(obj).map(([key, val]) => {
    const toArr = hexRgb(val, { format: "array" });
    return `${key}: ${toArr.slice(0, 3).join(" ")}` as const;
  });
};

type ExciseDashDash<T> = T extends `--${infer U}` ? U : T;

export const twConfigFormatHelper = (cssVar: keyof typeof obj) => {
  const getKey = cssVar.split(/--/g).join("").trim() as ExciseDashDash<
    typeof cssVar
  >;
  const getVal = `rgb(var(${cssVar}))` as const;
  return [getKey, getVal] as const;
};

export const cssVarsToTailwindConfigFormat = () => {
  const objKeys = Object.entries(obj).map(([key, _val]) => {
    const k = key as keyof typeof obj;

    return twConfigFormatHelper(k);
  });
  return Object.fromEntries(objKeys);
};
