import { describe, it, expect } from "vitest";
import router from "../../src/routing";

describe("Router Configuration", () => {
  it("should have the correct number of routes", () => {
    const numberOfRoutes = router.getRoutes().length;
    expect(numberOfRoutes).toBe(7);
  });

  it("should contain the Home route with nested children", () => {
    const homeRoute = router.getRoutes().find((route) => route.name === "Home");
    expect(homeRoute).toBeDefined();
    expect(homeRoute?.children).toHaveLength(3);
  });

  it("should contain the RedirectShortUrl route with the correct path", () => {
    const redirectRoute = router
      .getRoutes()
      .find((route) => route.name === "RedirectShortUrl");
    expect(redirectRoute).toBeDefined();
    expect(redirectRoute?.path).toBe("/:shortCode");
  });
});
