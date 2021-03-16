var { Shop, Item } = require("../src/gilded_rose.js");
describe("Gilded Rose", function () {
  it("should lower both sellIn and quality after one day", function () {
    const startCount = 3;
    const gildedRose = new Shop([new Item("foo", startCount, startCount)]);
    const items = gildedRose.updateQuality();
    const { name, sellIn, quality } = items[0];

    expect(name).toEqual("foo");
    expect(sellIn).toEqual(startCount - 1);
    expect(quality).toEqual(startCount - 1);
  });
  it("should lower quality twice as fast if sell by date has passed", () => {
    const startSellIn = 1;
    const startQuality = 5;
    const gildedRose = new Shop([new Item("foo", startSellIn, startQuality)]);
    gildedRose.updateQuality();

    const items = gildedRose.updateQuality();
    const { name, sellIn, quality } = items[0];

    expect(sellIn).toEqual(startSellIn - 1 - 1);
    expect(quality).toEqual(startQuality - 1 - 2);
  });

  it("should make quality never negative as day passes", () => {
    const startSellIn = 1;
    const startQuality = 1;
    const gildedRose = new Shop([new Item("foo", startSellIn, startQuality)]);
    gildedRose.updateQuality();

    const items = gildedRose.updateQuality();
    const { quality } = items[0];

    expect(quality).toEqual(0);
  });
});
