import path from "path";
import fs from "fs/promises";
import { series, src, dest, parallel, watch } from "gulp";
import postcss from "gulp-postcss";
import webpackStream from "webpack-stream";

import cssInlineImport from "postcss-import";
import presetEnv from "postcss-preset-env";

/**
 * GLOBALS
 *
 * Shared across tasks
 */

const dir = __dirname;
const sourcePath = path.resolve(dir, "source");
const assetPath = path.resolve(dir, "assets");

const inputDirs = {
  css: path.resolve(sourcePath, "css"),
  js: path.resolve(sourcePath, "js"),
  img: path.resolve(sourcePath, "img"),
};

const outputDirs = {
  css: path.resolve(assetPath, "css"),
  js: path.resolve(assetPath, "js"),
  img: path.resolve(assetPath, "img"),
};

/**
 * GROUPED TASKS
 */
const cleanDir = {
  css: () => fs.rm(outputDirs.css, { recursive: true, force: true }),
  js: () => fs.rm(outputDirs.js, { recursive: true, force: true }),
  img: () => fs.rm(outputDirs.img, { recursive: true, force: true }),
};

const buildAsset = {
  css: () => {
    const plugins = [presetEnv({ stage: 0 }), cssInlineImport()];

    return src(`${inputDirs.css}/**/*.css`)
      .pipe(postcss(plugins))
      .pipe(dest(outputDirs.css));
  },
  js: () => {
    return src(`${inputDirs.js}/common.ts`)
      .pipe(webpackStream(require("./webpack.config.js")))
      .pipe(dest(outputDirs.js));
  },
};

/**
 * COMPOSED PUBLIC TASKS
 */
export const clean = parallel(cleanDir.css, cleanDir.js, cleanDir.img);

export const build = parallel(buildAsset.css, buildAsset.js);

export const development = () => {
  watch(
    `${inputDirs.css}/**/*.css`,
    /**
     * Ensure this runs on first call of watch,
     * not only on subsequent calls
     */
    { ignoreInitial: false },
    series(cleanDir.css, buildAsset.css)
  );

  watch(
    `${inputDirs.js}/**/*.ts`,
    { ignoreInitial: false },
    series(cleanDir.js, buildAsset.js)
  );
};

/**
 * DEFAULT PUBLIC TASK
 */
const defaultTask = series(clean, build);

export default defaultTask;
