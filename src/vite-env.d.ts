// The reference to "vite/client" was removed because it could not be resolved,
// causing a TypeScript error. The manual type definitions below are sufficient
// for the project's use of import.meta.env.

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
  readonly MODE: string;
  readonly BASE_URL: string;
  readonly SSR: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
