// Variable to hold the manifest data
import { ManifestEntry } from '*.json';

let manifest: Record<string, ManifestEntry> | null = null;

// Function to load the manifest dynamically
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const loadManifest = async () => {
  if (!manifest && import.meta.env.MODE === 'production') {
    try {
      const response = await fetch('./.vite/manifest.json');
      if (!response.ok) return;
      manifest = await response.json();
      return manifest;
    } catch (error) {
      console.error('Manifest not found, skipping:', error);
      return null;
    }
  }
};
