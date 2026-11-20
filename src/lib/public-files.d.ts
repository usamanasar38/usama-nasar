declare module "virtual:public-files" {
  /** Site paths of every file in public/ at build time, e.g. "/images/avatar.webp". */
  const files: ReadonlySet<string>;
  export default files;
}
