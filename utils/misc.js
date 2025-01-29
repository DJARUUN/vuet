/**
 * @param {string} path
 * @returns {string}
 */
export function fixPath(path) {
  return path.endsWith("/") ? path : `${path}/`;
}
