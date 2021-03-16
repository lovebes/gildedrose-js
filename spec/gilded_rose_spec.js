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

  it("aged brie increases quality as it gets older", () => {
    const startSellIn = 10;
    const startQuality = 1;
    const gildedRose = new Shop([
      new Item("Aged Brie", startSellIn, startQuality),
    ]);
    let items = gildedRose.updateQuality();

    items = gildedRose.updateQuality();

    const { quality } = items[0];

    expect(quality).toEqual(startQuality + 1 + 1);
  });

  describe("max quality", () => {
    it("quality should not be over 50 for Aged Brie items", () => {
      const startSellIn = 10;
      const startQuality = 50;
      let gildedRose = new Shop([
        new Item("Aged Brie", startSellIn, startQuality),
      ]);
      let items = gildedRose.updateQuality();
      const { quality } = items[0];
      expect(quality).toEqual(startQuality);
    });

    it("quality should be fixed to 50 if given initial quality that's >50", () => {
      const startSellIn = 10;
      const maxQuality = 50;

      const gildedRose = new Shop([new Item("foo", startSellIn, 10000)]);
      const items = gildedRose.updateQuality();

      expect(items[0].quality).toEqual(maxQuality);
    });
  });

  it("should not change quality or sellIn for Sulfuras", () => {
    const startSellIn = 10;
    const startQuality = 100;
    const targetName = "Sulfuras, Hand of Ragnaros";
    const gildedRose = new Shop([
      new Item(targetName, startSellIn, startQuality),
    ]);
    let items = gildedRose.updateQuality();

    items = gildedRose.updateQuality();

    const { quality, sellIn } = items[0];

    expect(quality).toEqual(startQuality);
    expect(sellIn).toEqual(startSellIn);
  });

  describe("backstage passes", () => {
    it("should increase in quality as SellIn value approaches, increase by 2 when 10 days or less", () => {
      const startSellIn = 10;
      const startQuality = 1;
      const itemName = "Backstage passes to a TAFKAL80ETC concert";
      const gildedRose = new Shop([
        new Item(itemName, startSellIn, startQuality),
      ]);
      let items = gildedRose.updateQuality();

      items = gildedRose.updateQuality();

      const { quality } = items[0];

      expect(quality).toEqual(startQuality + 2 + 2);
    });
    it("should increase in quality as SellIn value approaches, increase by 3 when 5 days or less", () => {
      const startSellIn = 5;
      const startQuality = 1;
      const itemName = "Backstage passes to a TAFKAL80ETC concert";
      const gildedRose = new Shop([
        new Item(itemName, startSellIn, startQuality),
      ]);
      let items = gildedRose.updateQuality();

      items = gildedRose.updateQuality();

      const { quality } = items[0];

      expect(quality).toEqual(startQuality + 3 + 3);
    });
  });
});
