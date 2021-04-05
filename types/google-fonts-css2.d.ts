declare module "google-fonts-css2/dist/prod" {
  export interface FontFamily {
    family: string;
    styles: (string | number)[];
  }
  export const assembleCommon: (families: FontFamily[], display: "auto" | "swap") => string;
}
