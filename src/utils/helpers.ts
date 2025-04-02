// Variable to hold the manifest data
import { ManifestEntry } from '*.json';

let manifest: Record<string, ManifestEntry> | null = null;

// Function to load the manifest dynamically
export const loadManifest = async () => {
  if (!manifest && import.meta.env.MODE === 'production') {
    try {
      const data = await import('../../dist/.vite/manifest.json');
      manifest = data.default;
      return manifest;
    } catch (error) {
      console.error("Error loading manifest:", error);
    }
  }
};
