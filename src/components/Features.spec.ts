import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Features from "./Features.vue";

describe("Features.vue", () => {
  it("renders the section title and description", () => {
    const wrapper = mount(Features);

    const title = wrapper.find("h2");
    expect(title.text()).toBe("Our Features");

    const description = wrapper.find("p").text();
    expect(description).toContain(
      "Scissors is here to inspire simplicity in a complex world."
    );
  });

  it("renders feature cards correctly", () => {
    const wrapper = mount(Features);

    const featureCards = wrapper.findAll(".feature-card-wrapper");
    expect(featureCards.length).toBe(4);

    featureCards.forEach((card, index) => {
      const title = card.find("h3").text();
      const description = card.find("p").text();

      expect(title).toBe(wrapper.vm.features[index].title);
      expect(description).toBe(wrapper.vm.features[index].description);
    });
  });

  it('has a "Learn more" button', () => {
    const wrapper = mount(Features);
    const button = wrapper.find("button");
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe("Learn more");
  });
});
