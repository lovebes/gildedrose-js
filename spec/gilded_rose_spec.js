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
});
