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

  it("should iterate and affect logic correctly to list of items", () => {
    const propsList = [
      { name: "Aged Brie", sellIn: 1, quality: 2 },
      { name: "foo", sellIn: 3, quality: 4 },
      { name: "Sulfuras, Hand of Ragnaros", sellIn: 5, quality: 80 },
      {
        name: "Backstage passes to a TAFKAL80ETC concert",
        sellIn: 7,
        quality: 8,
      },
    ];

    const itemsList = propsList.map(
      ({ name, sellIn, quality }) => new Item(name, sellIn, quality)
    );

    const gildedRose = new Shop(itemsList);
    let items = gildedRose.updateQuality();

    items.forEach(({ name, sellIn, quality }) => {
      const itemProp = propsList.find(
        ({ name: propName }) => propName === name
      );
      switch (itemProp.name) {
        case "Aged Brie":
          expect(sellIn).toEqual(itemProp.sellIn - 1);
          expect(quality).toEqual(itemProp.quality + 1);
          break;
        case "Sulfuras, Hand of Ragnaros":
          expect(sellIn).toEqual(itemProp.sellIn);
          expect(quality).toEqual(80);
          break;
        case "Backstage passes to a TAFKAL80ETC concert":
          expect(sellIn).toEqual(itemProp.sellIn - 1);
          expect(quality).toEqual(itemProp.quality + 2);
          break;
        default:
          expect(sellIn).toEqual(itemProp.sellIn - 1);
          expect(quality).toEqual(itemProp.quality - 1);
          break;
      }
    });
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

      expect(items[0].quality).toEqual(maxQuality - 1);
    });
  });

  it("should not change quality or sellIn for Sulfuras", () => {
    const startSellIn = 10;
    const startQuality = 100;
    const CORRECT_QUALITY = 80;
    const targetName = "Sulfuras, Hand of Ragnaros";
    const gildedRose = new Shop([
      new Item(targetName, startSellIn, startQuality),
    ]);
    let items = gildedRose.updateQuality();

    items = gildedRose.updateQuality();

    const { quality, sellIn } = items[0];

    expect(quality).toEqual(CORRECT_QUALITY);
    expect(sellIn).toEqual(startSellIn);
  });

  describe("backstage passes", () => {
    it("should increase in quality as SellIn value approaches, increase by 1 when more than 10 days left", () => {
      const startSellIn = 12;
      const startQuality = 1;
      const itemName = "Backstage passes to a TAFKAL80ETC concert";
      const gildedRose = new Shop([
        new Item(itemName, startSellIn, startQuality),
      ]);
      let items = gildedRose.updateQuality();

      const { quality } = items[0];

      expect(quality).toEqual(startQuality + 1);
    });
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
    it("should increase in quality as SellIn value is zero, quality is zero", () => {
      const startSellIn = 1;
      const startQuality = 30;
      const itemName = "Backstage passes to a TAFKAL80ETC concert";
      const gildedRose = new Shop([
        new Item(itemName, startSellIn, startQuality),
      ]);
      let items = gildedRose.updateQuality();

      items = gildedRose.updateQuality();

      const { quality } = items[0];

      expect(quality).toEqual(0);
    });
  });

  describe("Conjured Mana Cake items", () => {
    it("should degrade twice as fast as normal items in quality", () => {
      const startSellIn = 10;
      const startQuality = 30;
      const itemName = "Conjured Mana Cake";
      const gildedRose = new Shop([
        new Item(itemName, startSellIn, startQuality),
      ]);
      let items = gildedRose.updateQuality();

      items = gildedRose.updateQuality();

      const { quality } = items[0];

      expect(quality).toEqual(startQuality - 2 - 2);
    });

    it("should be never negative in quality", () => {
      const startSellIn = 10;
      const startQuality = 1;
      const itemName = "Conjured Mana Cake";
      const gildedRose = new Shop([
        new Item(itemName, startSellIn, startQuality),
      ]);
      let items = gildedRose.updateQuality();

      items = gildedRose.updateQuality();

      const { quality } = items[0];

      expect(quality).toEqual(0);
    });

    it("should degrade four times as fast as normal items past sellIn date", () => {
      const startSellIn = 1;
      const startQuality = 50;
      const itemName = "Conjured Mana Cake";
      const gildedRose = new Shop([
        new Item(itemName, startSellIn, startQuality),
      ]);
      let items = gildedRose.updateQuality();

      items = gildedRose.updateQuality();
      items = gildedRose.updateQuality();

      const { quality } = items[0];

      expect(quality).toEqual(startQuality - 2 - 4 - 4);
    });
  });
});
