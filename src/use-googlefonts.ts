import { useEffect, useState } from "react";

import FontFaceObserver from "fontfaceobserver";
import { assembleCommon } from "google-fonts-css2/dist/prod";

/**
 * Font family name and styles
 * @see https://fonts.google.com/
 */
export interface GoogleFontFamily {
  /**
   * Font family name. Eg: `Inter`, `Andika New Basic`
   */
  family: string;
  /**
   * Array of styles
   * @example
   * "600..700"
   * "100..200italic"
   * "300italic"
   * "regular"
   * "italic"
   * "500"
   * 444
   * @see https://developers.google.com/fonts/docs/css2
   * @see https://github.com/adriano-tirloni/google-fonts-css2
   */
  styles: (string | number)[];
}

export enum GoogleFontsStatus {
  LOADING = 0,
  LOADED = 1,
  FAILED = -1,
}

export type GoogleFontOptions = {
  /**
   * `"swap"` is recommended.
   */
  display: "swap" | "auto";
};

export const defaultOptions: GoogleFontOptions = {
  display: "swap",
};

/**
 * Returned object from the `useGoogleFonts` hook.
 */
export interface UseGoogleFontsResult {
  /**
   * Generated URL (Google Font css2)
   */
  href: string | undefined;
  /**
   * Current operation status
   */
  status: GoogleFontsStatus;
  /**
   * Error object if `status` is `FAILED` (`-1`).
   */
  error: Error | undefined;
}

/**
 * Load fonts from `fonts` argument by creating a single URL which will be appended to the `<head/>` of the document as `<link href={} rel="stylesheet" />`.
 *
 * If there is any change in the arguments the current `<link />` will be removed and replaced by the new tag.
 *
 * Get the operation status (and `error` if present) via the `status` attribute of the returned object.
 */
export function useGoogleFonts(
  fonts: GoogleFontFamily[] = [],
  options: GoogleFontOptions = defaultOptions,
): UseGoogleFontsResult {
  const [status, setStatus] = useState(GoogleFontsStatus.LOADING);
  const [error, setError] = useState<Error>();

  const href = fonts && options.display ? assembleCommon(fonts, options.display) : undefined;

  useEffect(() => {
    if (!href) return;
    const link = document.createElement("link");
    link.href = href;
    // link.crossOrigin = ""; // TODO: improve performance?
    link.rel = "stylesheet";

    document.head.appendChild(link);

    // TODO: what if deps changes and the previous promise resolves?
    const promises = fonts.map((font) => new FontFaceObserver(font.family).load());
    Promise.all(promises)
      .then(() => {
        setError(undefined);
        setStatus(GoogleFontsStatus.LOADED);
      })
      .catch((err) => {
        setError(err);
        setStatus(GoogleFontsStatus.FAILED);
      });

    return () => {
      setError(undefined);
      setStatus(GoogleFontsStatus.LOADING);
      document.head.removeChild(link);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [href]); // `fonts` dependency is not required since `href` depends on `fonts`

  return { href, status, error };
}
