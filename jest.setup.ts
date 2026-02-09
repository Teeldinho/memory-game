import React from "react";
import "@testing-library/jest-dom";

if (!global.fetch) {
  global.fetch = jest.fn() as unknown as typeof fetch;
}

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({
    fill,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean }) => {
    return React.createElement("img", props);
  },
}));
