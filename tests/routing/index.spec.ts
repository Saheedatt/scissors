import { RouteRecordRaw } from "vue-router";
import routes from "../../src/routing/index";

describe("Router Routes", () => {
  it("should have the correct routes defined", () => {
    const expectedRoutes: RouteRecordRaw[] = [
      {
        path: "/",
        name: "Home",
        component: expect.any(Function),
        meta: { requiresAuth: true },
        children: [
          {
            path: "",
            name: "UrlShortener",
            component: expect.any(Function),
          },
          {
            path: "/qr-code",
            name: "QrCode",
            component: expect.any(Function),
          },
          {
            path: "custom-url",
            name: "CustomUrl",
            component: expect.any(Function),
          },
        ],
      },
      {
        path: "/landing",
        name: "Landing",
        component: expect.any(Function),
        meta: { requiresAuth: false },
      },
      {
        path: "/history",
        name: "History",
        component: expect.any(Function),
      },
      {
        path: "/:shortCode",
        name: "RedirectShortUrl",
        component: expect.any(Function),
        meta: { requiresAuth: false },
      },
    ];

    const actualRoutes = routes;

    expect(actualRoutes).toEqual(expectedRoutes);
  });
});
