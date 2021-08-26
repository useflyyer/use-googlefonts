import { renderHook } from "@testing-library/react-hooks";

import { useGoogleFonts } from "../src/use-googlefonts";

jest.mock("fontfaceobserver", () => {
  return {
    // need to add this nested `default` property
    default: jest.fn().mockImplementation(() => {
      return {
        load() {
          return true;
        },
      };
    }),
  };
});

describe("useGoogleFonts", () => {
  it("is defined", () => {
    expect(useGoogleFonts).toBeDefined();
  });

  it("composes valid Google Font URL", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useGoogleFonts([{ family: "Inter", styles: ["300"] }]));
    await waitForNextUpdate();
    expect(result.current.href).toEqual("https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300&display=swap");
  });

  it("composes empty href for empty array of fonts", async () => {
    const { result } = renderHook(() => useGoogleFonts([]));
    // await waitForNextUpdate(); // Not required here.
    expect(result.current.href).toBeUndefined();
  });

  it("composes empty href for undefined input", async () => {
    const { result } = renderHook(() => useGoogleFonts(undefined));
    // await waitForNextUpdate(); // Not required here.
    expect(result.current.href).toBeUndefined();
  });

  it("composes empty href for null input", async () => {
    const { result } = renderHook(() => useGoogleFonts(null as any));
    // await waitForNextUpdate(); // Not required here.
    expect(result.current.href).toBeUndefined();
  });
});
