export function fixPath(path) {
  return path.endsWith("/") ? path : `${path}/`;
}
