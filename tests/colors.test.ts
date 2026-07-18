import { describe, expect, it } from "vitest";
import { cardGradient, tagColor } from "../src/lib/colors";

describe("tagColor", () => {
  it("is deterministic", () => {
    expect(tagColor("ai")).toBe(tagColor("ai"));
    expect(tagColor("some-new-tag")).toBe(tagColor("some-new-tag"));
  });
  it("returns a CSS color for known and unknown tags", () => {
    expect(tagColor("ai")).toMatch(/^#|^hsl/);
    expect(tagColor("zzz-unknown")).toMatch(/^#|^hsl/);
  });
});

describe("cardGradient", () => {
  it("is deterministic and a valid gradient", () => {
    expect(cardGradient("My Article")).toBe(cardGradient("My Article"));
    expect(cardGradient("My Article")).toMatch(/^linear-gradient\(/);
  });
  it("differs across seeds", () => {
    expect(cardGradient("aaa")).not.toBe(cardGradient("zzz"));
  });
});
