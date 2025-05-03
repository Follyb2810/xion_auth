import { Buffer } from "buffer";

type WindowType = typeof window;

export const polyfillBuffer = () => {
  if (typeof window !== "undefined" && (window as WindowType).Buffer == null) {
    (window as WindowType).Buffer = Buffer;
  }
};
