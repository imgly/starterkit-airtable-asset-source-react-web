/**
 * CE.SDK Airtable Asset Source Starterkit - React Entry Point
 *
 * A design editor with Airtable integrated as a custom asset source.
 * Manage and browse your design assets stored in Airtable directly within the editor.
 *
 * @see https://img.ly/docs/cesdk/js/getting-started/
 * @see https://airtable.com/developers/web/api/introduction
 */

import type { Configuration } from '@cesdk/cesdk-js';
import { createRoot } from 'react-dom/client';

import App from './app/App';

// ============================================================================
// Configuration
// ============================================================================

const config: Configuration = {
  // Unique user identifier for analytics (customize for your app)
  userId: 'starterkit-airtable-asset-source-user'

  // Local assets (uncomment and set path for self-hosted assets)
  // baseURL: `/assets/`,

  // License key (required for production)
  // license: 'YOUR_LICENSE_KEY',
};

// ============================================================================
// Initialize React Application
// ============================================================================

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container not found');
}

const root = createRoot(container);
root.render(<App config={config} />);
