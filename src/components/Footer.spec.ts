import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Footer from "./Footer.vue";

describe("Footer.vue", () => {
  it("renders the logo and text correctly", () => {
    const wrapper = mount(Footer);

    const logoImages = wrapper.findAll('img[alt="Scissors Icon"]');
    expect(logoImages.length).toBe(2);

    const logoText = wrapper.find("#logo-text");
    expect(logoText.text()).toBe("Scissors");
  });

  it("renders the social media links correctly", () => {
    const wrapper = mount(Footer);

    const socialMediaLinks = wrapper.findAll(".social-media a");
    expect(socialMediaLinks.length).toBe(4);

    expect(socialMediaLinks[0].text()).toBe("Instagram");
    expect(socialMediaLinks[0].attributes("href")).toBe("#");

    expect(socialMediaLinks[1].text()).toBe("Twitter(X)");
    expect(socialMediaLinks[1].attributes("href")).toBe(
      "https://x.com/idontseemyselff"
    );

    expect(socialMediaLinks[2].text()).toBe("Github");
    expect(socialMediaLinks[2].attributes("href")).toBe(
      "https://github.com/Saheedatt"
    );

    expect(socialMediaLinks[3].text()).toBe("Linkedin");
    expect(socialMediaLinks[3].attributes("href")).toBe(
      "https://www.linkedin.com/in/saheedat-afolabi-1a91b5221/"
    );
  });

  it("renders the copyright information correctly", () => {
    const wrapper = mount(Footer);

    const copyrightText = wrapper.find(".copyright p");
    expect(copyrightText.text()).toContain("©");
    expect(copyrightText.text()).toContain("Scissors");
    expect(copyrightText.text()).toContain("All Rights Reserved.");
  });

  it("renders decorative elements correctly", () => {
    const wrapper = mount(Footer);

    const decorationImages = wrapper.findAll(".decoration img");
    expect(decorationImages.length).toBe(2);

    expect(decorationImages[0].attributes("alt")).toBe("Url icon");
    expect(decorationImages[1].attributes("alt")).toBe("Decorative element");
  });
});
