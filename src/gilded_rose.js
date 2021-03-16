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
const MAX_QUALITY = 50;
const SULFRAS_QUALITY = 80;

const handleNormalItem = ({ sellIn, quality, name }) => {
  const newSellIn = sellIn - 1;
  let newQuality = quality;
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
  const newQuality = Math.min(quality + 1, MAX_QUALITY);

  return {
    name,
    sellIn: newSellIn,
    quality: newQuality,
  };
};

const handleSulfras = ({ sellIn, quality, name }) => {
  const newSellIn = sellIn;
  const newQuality = SULFRAS_QUALITY;

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

      // updateItem(item, handleNormalItem(item));
      // updateItem(item, handleAgedBrie(item));
      updateItem(item, handleSulfras(item));

      // if (this.items[i].name != AGED_BRIE && this.items[i].name != BACKSTAGE) {
      //   if (this.items[i].quality > 0) {
      //     if (this.items[i].name != SULFRAS) {
      //       this.items[i].quality = this.items[i].quality - 1;
      //     }
      //   }
      // } else {
      //   if (this.items[i].quality < 50) {
      //     this.items[i].quality = this.items[i].quality + 1;
      //     if (this.items[i].name == BACKSTAGE) {
      //       if (this.items[i].sellIn < 11) {
      //         if (this.items[i].quality < 50) {
      //           this.items[i].quality = this.items[i].quality + 1;
      //         }
      //       }
      //       if (this.items[i].sellIn < 6) {
      //         if (this.items[i].quality < 50) {
      //           this.items[i].quality = this.items[i].quality + 1;
      //         }
      //       }
      //     }
      //   }
      // }
      // if (this.items[i].name != SULFRAS) {
      //   this.items[i].sellIn = this.items[i].sellIn - 1;
      // }
      // if (this.items[i].sellIn < 0) {
      //   if (this.items[i].name != AGED_BRIE) {
      //     if (this.items[i].name != BACKSTAGE) {
      //       if (this.items[i].quality > 0) {
      //         if (this.items[i].name != SULFRAS) {
      //           this.items[i].quality = this.items[i].quality - 1;
      //         }
      //       }
      //     } else {
      //       this.items[i].quality =
      //         this.items[i].quality - this.items[i].quality;
      //     }
      //   } else {
      //     if (this.items[i].quality < 50) {
      //       this.items[i].quality = this.items[i].quality + 1;
      //     }
      //   }
      // }
    }

    return this.items;
  }
}
module.exports = {
  Item,
  Shop,
};
