declare global {
  interface Window {
    version?: string;
  }
}

export const version = window.version || "1.0.0";
