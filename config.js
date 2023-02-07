/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
const deepMerge = require("deepmerge");

const screens = {
  'tablet': '640px',
  // => @media (min-width: 640px) { ... }

  'laptop': '1024px',
  // => @media (min-width: 1024px) { ... }

  'desktop': '1280px',
  // => @media (min-width: 1280px) { ... }
};

const colors = {
  white: "#FFFFFF",
  black: "#000000",
  transparent: "transparent",
  current: "currentColor",
  // Primary
};

const fontSize = {
  xs: "12px",
  sm: "13px",
  md: "14px",
  lg: "16px",
  xl: "18px",
  xxl: "22px",
  "3xl": "24px",
  "4xl": "28px",
  "5xl": "36px",
  "6xl": "48px",
};

const fontWeight = {
  DEFAULT: 400,
  hairline: 100,
  "extra-light": 100,
  thin: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  "extra-bold": 800,
  black: 900,
};

const borderRadius = {
  none: "0px",
  sm: "2px", // tiny
  md: "6px", // medium
  lg: "8px",
  xl: "10px",
  xxl: "16px",
  full: "9999px",
};

const zIndex = {
  "-1": "-1",
  0: "0",
  10: "10",
  20: "20",
  30: "30",
  40: "40", // for drawer
  50: "50", // for Tooltip
  100: "100", // for Dialog, FullScreenDialog...
};

const renderSpacings = (extendSpacings = {}) => {
  const spacing = {
    ...extendSpacings,
  };
  // 0px --> 100px | 0px 5px 10px 15px,...
  for (let i = 0; i < 10; i += 0.5) {
    spacing[i] = `${i * 10}px`;
  }
  // 100px --> 1000px | 100px 110px 120px,...
  for (let i = 10; i < 100; i++) {
    spacing[i] = `${i * 10}px`;
  }
  return spacing;
};

const spacing = renderSpacings({
  full: "100%",
  fit: "fit-content",
  2.4: "24px",
});

const boxShadow = {
  sm: "0 4px 6px rgb(50 50 93 / 10%), 0 1px 3px rgb(0 0 0 / 8%);",
  md: "0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1)",
  lg: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
};

const utilsPlugin = plugin(function ({
  addBase,
  addComponents,
  theme
}) {
  addComponents({
    ".icon-lg": {
      width: "40px",
      height: "40px",
    },
    ".icon-md": {
      width: "24px",
      height: "24px",
    },
    ".icon-sm": {
      width: "20px",
      height: "20px",
    },
    ".icon-tn": {
      width: "16px",
      height: "16px",
    },
    ".move-center-x": {
      left: "50%",
      transform: "translateX(-50%)",
    },
    ".move-center-y": {
      top: "50%",
      transform: "translateY(-50%)",
    },
    ".move-center": {
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
    },
    ".paragraph-with-2-line": {
      display: "-webkit-box",
      "-webkit-line-clamp": 2,
      "-webkit-box-orient": "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    ".center-children": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  });
});

const baseConfig = {
  content: ["./node_modules/react-mac-ui/**/*.js"],
  theme: {
    screens,
    fontSize,
    spacing,
    fontWeight,
    borderRadius,
    zIndex,
    boxShadow,
    maxWidth: {
      ...spacing,
      ...screens
    },
    extend: {
      colors,
    },
  },
  plugins: [utilsPlugin],
};

function arrayMergeFn(destinationArray, sourceArray) {
  return destinationArray.concat(sourceArray).reduce((acc, cur) => {
    if (acc.includes(cur)) return acc;
    return [...acc, cur];
  }, []);
}

/**
 * Merge Windmill and Tailwind CSS configurations
 * @param {object} tailwindConfig - Tailwind config object
 * @return {object} new config object
 */
function wrapper(tailwindConfig) {
  return deepMerge({
    ...tailwindConfig
  }, baseConfig, {
    arrayMerge: arrayMergeFn,
  });
}

module.exports = wrapper;
