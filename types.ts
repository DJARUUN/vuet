export interface Config {
  /** The directory that vuet will put added components in.
   * It's also the directory that is used to check if a component already exists, so beware of that.
   *
   * Will be created on the first run if needed. */
  componentsDir: string;
}
