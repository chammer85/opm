declare module '*.json' {
  export interface ManifestEntry {
    file: string;
    src: string;
    css?: string[];
    assets?: string[];
    isEntry?: boolean;
  }
}
