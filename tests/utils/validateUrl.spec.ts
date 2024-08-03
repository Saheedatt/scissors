import { validateUrl } from "../../src/utils/validateUrl";

describe("validateUrl", () => {
  it("should return true for a valid URL entry", () => {
    const url = "https://github.com";
    expect(validateUrl(url)).toBe(true);
  });

  it("should return false for an invalid URL entry", () => {
    const url = "invalid-url";
    expect(validateUrl(url)).toBe(false);
  });
});
