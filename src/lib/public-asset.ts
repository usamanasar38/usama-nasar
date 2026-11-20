import publicFiles from "virtual:public-files";

/** True when `path` ("/images/avatar.webp") exists in public/ at build time. */
export const hasPublicFile = (path: string | undefined): path is string =>
  path !== undefined && publicFiles.has(path);
