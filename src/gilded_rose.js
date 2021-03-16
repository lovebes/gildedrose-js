class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const AGED_BRIE = "Aged Brie";
const SULFRAS = "Sulfuras, Hand of Ragnaros";
const BACKSTAGE = "Backstage passes to a TAFKAL80ETC concert";
const CONJURED = "Conjured Mana Cake";
const MAX_QUALITY = 50;
const SULFRAS_QUALITY = 80;

const sanitizeQuality = (quality) => {
  return Math.min(MAX_QUALITY, quality);
};

const handleNormalItem = ({ sellIn, quality, name }) => {
  const newSellIn = sellIn - 1;
  let newQuality = sanitizeQuality(quality);

  if (newSellIn < 0) {
    newQuality -= 2;
  } else {
    newQuality -= 1;
  }
  newQuality = Math.max(0, newQuality);
  return {
    name,
    sellIn: newSellIn,
    quality: newQuality,
  };
};

const handleAgedBrie = ({ sellIn, quality, name }) => {
  const newSellIn = sellIn - 1;
  const newQuality = Math.min(sanitizeQuality(quality) + 1, MAX_QUALITY);

  return {
    name,
    sellIn: newSellIn,
    quality: newQuality,
  };
};

const handleSulfras = ({ sellIn, name }) => {
  const newSellIn = sellIn;
  const newQuality = SULFRAS_QUALITY;

  return {
    name,
    sellIn: newSellIn,
    quality: newQuality,
  };
};

const handleBackstage = ({ sellIn, quality, name }) => {
  const newSellIn = sellIn - 1;

  let newQuality = sanitizeQuality(quality);
  if (newSellIn > 10) {
    newQuality += 1;
  } else if (newSellIn > 5) {
    newQuality += 2;
  } else if (newSellIn >= 0) {
    newQuality += 3;
  } else {
    newQuality = 0;
  }

  return {
    name,
    sellIn: newSellIn,
    quality: newQuality,
  };
};

const handleConjured = ({ sellIn, quality, name }) => {
  const newSellIn = sellIn - 1;

  let newQuality = sanitizeQuality(quality);
  if (newSellIn < 0) {
    newQuality -= 4;
  } else {
    newQuality -= 2;
  }

  newQuality = Math.max(0, newQuality);
  return {
    name,
    sellIn: newSellIn,
    quality: newQuality,
  };
};

const updateItem = (item, newItem) => {
  item.sellIn = newItem.sellIn;
  item.quality = newItem.quality;
};

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      switch (item.name) {
        case AGED_BRIE:
          updateItem(item, handleAgedBrie(item));
          break;
        case SULFRAS:
          updateItem(item, handleSulfras(item));
          break;
        case BACKSTAGE:
          updateItem(item, handleBackstage(item));
          break;
        case CONJURED:
          updateItem(item, handleConjured(item));
          break;
        default:
          updateItem(item, handleNormalItem(item));
          break;
      }
    }

    return this.items;
  }
}
module.exports = {
  Item,
  Shop,
};
