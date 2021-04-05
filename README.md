# @flayyer/use-googlefonts

React hook to load Google Fonts v2 **when you can't define _a priori_ the expected font on the `<head />`.**

If you know what specific font you require on your project you should omit this library and insert the `<link />` tags directly in the `<head />` of your HTML via `react-helmet` or `next/head` if you are using Next.js.

We made this hook for [Flayyer.com](https://flayyer.com?ref=github) to enable developers to create templates with fonts _on the fly_ to match each user preferred font styling. Those tempates are used to create social and marketing images.

## Usage

Install this dependency:

```sh
yarn add @flayyer/use-googlefonts
```

Common case usage:

```tsx
import React from "react";
import { useGoogleFonts, GoogleFontsStatus } from "@flayyer/use-googlefonts";

function App() {
  const font = useGoogleFonts([
    {
      family: "Cabin", // Family Name
      styles: [
        "600..700", // Range, if family supports it.
        "100..200italic", // Range with italic
        "300italic", // Weight with italic
        "regular", // Shortcut to 400
        "italic", // Shortcut to 400 Italic
        "500", // Regular with weight
        444, // Regular weight for variable font
      ],
    },
    {
      family: "Roboto", // Family Name - Roboto doesn't support ranges
      styles: [
        "300italic", // Weight with italic
        "regular", // Shortcut to 400
        "italic", // Shortcut to 400 Italic
        "500",
        100,
      ],
    },
  ]);

  if (font.status === GoogleFontsStatus.FAILED) {
    console.log(font.error);
  }
  console.log(font.href);
  // https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400;0,444;0,500;0,600..700;1,100..200;1,300;1,400;1,600..700&family=Roboto:ital,wght@0,100;0,400;0,500;1,300;1,400&display=auto
  return (
    <p style={{ fontFamily: "'Cabin', sans-serif" }}>
      Almost before we knew it, we had left the ground.
    </p>
  );
}
```

To improve performance and speed it is recommended to add the following pre-connection tags in the `<head />` of your HTML.

```html
<html>
  <head>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
  </head>
  <body>
    ...
  </body>
</html>
```
