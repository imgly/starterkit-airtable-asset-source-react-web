/**
 * CE.SDK Airtable Asset Source - Main App Component
 *
 * This component manages the CE.SDK instance and the Airtable sidebar,
 * providing a complete image editing experience with Airtable integration.
 */

import { useEffect, useRef } from 'react';
import CreativeEditorSDK from '@cesdk/cesdk-js';
import { initAirtableImageEditor, AirtableEditorOptions } from '../imgly';
import AirtableSidebar from './AirtableSidebar/AirtableSidebar';
import styles from './App.module.css';

// ============================================================================
// CE.SDK Configuration
// ============================================================================

const config = {
  userId: 'starterkit-airtable-asset-source-user',

  // IMG.LY CDN (for quick testing only, NOT recommended for production)
  // baseURL: `https://cdn.img.ly/packages/imgly/cesdk-js/${CreativeEditorSDK.version}/assets`,

  // Local assets for development
  ...(import.meta.env.CESDK_USE_LOCAL && {
    baseURL: import.meta.env.VITE_CESDK_ASSETS_BASE_URL
  })

  // license: 'YOUR_LICENSE_KEY',
};

// ============================================================================
// Airtable Editor Options
// ============================================================================

// Configuration options (pick ONE):
//
// Option 1: Proxy URL (recommended for production)
//   - Set VITE_AIRTABLE_PROXY_URL in your .env file
//   - Your proxy server adds the API key server-side
//
// Option 2: API Key (for development/testing only)
//   - Set VITE_AIRTABLE_API_KEY in your .env file
//   - WARNING: This exposes your API key in client-side code
//
const editorOptions: AirtableEditorOptions = {
  // Use proxy URL if available, otherwise fall back to API key
  proxyUrl: import.meta.env.VITE_AIRTABLE_PROXY_URL,
  apiKey: import.meta.env.VITE_AIRTABLE_API_KEY
};

/**
 * Main App Component
 *
 * Sets up the CE.SDK instance with Airtable integration and displays
 * the editor alongside an embedded Airtable sidebar.
 */
export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  // ============================================================================
  // CE.SDK Initialization
  // ============================================================================

  useEffect(() => {
    let cesdk: CreativeEditorSDK | null = null;
    let mounted = true;

    const initializeCesdk = async () => {
      if (!containerRef.current) return;

      try {
        cesdk = await CreativeEditorSDK.create(containerRef.current, config);

        if (!mounted) {
          cesdk.dispose();
          return;
        }

        // Debug access (remove in production)
        (window as any).cesdk = cesdk;

        // Initialize Airtable integration
        await initAirtableImageEditor(cesdk, editorOptions);
      } catch (error) {
        console.error('Failed to initialize CE.SDK:', error);
      }
    };

    initializeCesdk();

    return () => {
      mounted = false;
      if (cesdk) {
        cesdk.dispose();
      }
    };
  }, []);

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <div className={styles.appWrapper}>
      <div ref={containerRef} className={styles.cesdkContainer} />
      <AirtableSidebar />
    </div>
  );
}
