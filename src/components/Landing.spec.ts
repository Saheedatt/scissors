import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Landing from "./Landing.vue";
import { createRouter, createMemoryHistory } from "vue-router";

import { nextTick } from "vue";

vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(() => ({
    currentUser: null,
  })),
  onAuthStateChanged: vi.fn((auth, callback) => {
    callback(null);
  }),
}));

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: "/", name: "Landing", component: Landing },
    {
      path: "/url-shortener",
      name: "UrlShortener",
      component: { template: "<div>Url Shortener</div>" },
    },
  ],
});

describe("Landing.vue", () => {
  beforeEach(async () => {
    router.push("/");
    await router.isReady();
  });

  it("renders all the main elements correctly", () => {
    const wrapper = mount(Landing, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.findComponent({ name: "Navbar" }).exists()).toBe(true);

    expect(wrapper.find(".heading h1").text()).toBe(
      "Shorten Your Links. Sharpen Your Impact!"
    );
    expect(wrapper.find(".heading .subheading").text()).toBe(
      "Scissors: The ultimate URL shortener for the modern world"
    );

    expect(wrapper.findAll("img").length).toBeGreaterThan(0);

    expect(wrapper.findComponent({ name: "Features" }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: "Vision" }).exists()).toBe(true);

    expect(wrapper.findComponent({ name: "Footer" }).exists()).toBe(true);
  });

  it("navigates to UrlShortener when user is authenticated", async () => {
    vi.mock("firebase/auth", () => ({
      getAuth: vi.fn(() => ({
        currentUser: {},
      })),
      onAuthStateChanged: vi.fn((auth, callback) => {
        callback({});
      }),
    }));

    const wrapper = mount(Landing, {
      global: {
        plugins: [router],
      },
    });

    await nextTick();

    await wrapper.find(".start-button button").trigger("click");

    await router.push("/url-shortener");
    await nextTick();

    expect(wrapper.vm.$route.name).toBe("UrlShortener");
  });

  it("navigates to Landing when user is not authenticated", async () => {
    vi.mock("firebase/auth", () => ({
      getAuth: vi.fn(() => ({
        currentUser: null,
      })),
      onAuthStateChanged: vi.fn((auth, callback) => {
        callback(null);
      }),
    }));

    const wrapper = mount(Landing, {
      global: {
        plugins: [router],
      },
    });

    await nextTick();
    await wrapper.find(".start-button button").trigger("click");

    await router.push("/");
    await nextTick();

    expect(wrapper.vm.$route.name).toBe("Landing");
  });
});
