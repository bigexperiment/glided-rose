import { Item, GildedRose } from '@/gilded-rose';



describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
  });

  it("The Quality is never negative",()=>{
    const gildedRose = new GildedRose([new Item('non negetive', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeGreaterThanOrEqual(0);
  })

  it("Once the sell by date has passed, Quality degrades twice as fast",()=>{
    const gildedRose = new GildedRose([new Item('foo', 1, 5)]);
    console.log(gildedRose)
    const itemsOnDay0 = gildedRose.updateQuality() //day 1
    expect(itemsOnDay0[0].sellIn).toBe(0)
    expect(itemsOnDay0[0].quality).toBe(4)
    const itemsOnDay1= gildedRose.updateQuality() //day 2
    expect(itemsOnDay1[0].sellIn).toBe(-1)
    expect(itemsOnDay1[0].quality).toBe(2)
  })


  it("Aged Brie actually increases in Quality the older it gets",()=>{
    const payload ={
      name:"Aged Brie",
      sellIn:3,
      quality:2
    }
    const expectedResponse  ={
      ...payload,
      sellIn:2,
      quality:3
    }
    const gildedRose = new GildedRose([new Item(payload.name,payload.sellIn,payload.quality)])
    const reponse =  gildedRose.updateQuality()
    expect(reponse[0].name).toBe(expectedResponse.name)
    expect(reponse[0].sellIn).toBe(expectedResponse.sellIn)
    expect(reponse[0].quality).toBe(expectedResponse.quality)
  })

  it("  Sulfuras, being a legendary item, never has to be sold or decreases in Quality",()=>{
    const payload ={
      name:"Sulfuras, Hand of Ragnaros",
      sellIn:3,
      quality:80
    }
    const expectedResponse  ={
      ...payload,
      sellIn:3,
      quality:80
    }
    const gildedRose = new GildedRose([new Item(payload.name,payload.sellIn,payload.quality)])
    const reponse =  gildedRose.updateQuality()
    expect(reponse[0].name).toBe(expectedResponse.name)
    expect(reponse[0].sellIn).toBe(expectedResponse.sellIn)
    expect(reponse[0].quality).toBe(expectedResponse.quality)
  })


  it("Backstage passes, like aged brie, increases in Quality as its SellIn value approaches. Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less butQuality drops to 0 after the concert",()=>{
    const payload1 ={
      name:"Backstage passes to a TAFKAL80ETC concert",
      sellIn:11,
      quality:20
    }
    const expectedResponse1  ={
      ...payload1,
      sellIn:10,
      quality:21
    }
    let gildedRose = new GildedRose([new Item(payload1.name,payload1.sellIn,payload1.quality)])
    let reponse =  gildedRose.updateQuality()
    expect(reponse[0].name).toBe(expectedResponse1.name)
    expect(reponse[0].sellIn).toBe(expectedResponse1.sellIn)
    expect(reponse[0].quality).toBe(expectedResponse1.quality)

    const payload2 ={
      name:"Backstage passes to a TAFKAL80ETC concert",
      sellIn:9,
      quality:20
    }
    const expectedResponse2  ={
      ...payload2,
      sellIn:8,
      quality:22
    }
     gildedRose = new GildedRose([new Item(payload2.name,payload2.sellIn,payload2.quality)])
     reponse =  gildedRose.updateQuality()
    expect(reponse[0].name).toBe(expectedResponse2.name)
    expect(reponse[0].sellIn).toBe(expectedResponse2.sellIn)
    expect(reponse[0].quality).toBe(expectedResponse2.quality)


    const payload3 ={
      name:"Backstage passes to a TAFKAL80ETC concert",
      sellIn:3,
      quality:20
    }
    const expectedResponse3  ={
      ...payload3,
      sellIn:2,
      quality:23
    }
     gildedRose = new GildedRose([new Item(payload3.name,payload3.sellIn,payload3.quality)])
     reponse =  gildedRose.updateQuality()
    expect(reponse[0].name).toBe(expectedResponse3.name)
    expect(reponse[0].sellIn).toBe(expectedResponse3.sellIn)
    expect(reponse[0].quality).toBe(expectedResponse3.quality)
  })


  it("Conjured items degrade in Quality twice as fast as normal items",()=>{
    const payload ={
      name:"Conjured Mana Cake",
      sellIn:3,
      quality:24
    }
    const expectedResponse  ={
      ...payload,
      sellIn:2,
      quality:22
    }
    const gildedRose = new GildedRose([new Item(payload.name,payload.sellIn,payload.quality)])
    const reponse =  gildedRose.updateQuality()
    expect(reponse[0].name).toBe(expectedResponse.name)
    expect(reponse[0].sellIn).toBe(expectedResponse.sellIn)
    expect(reponse[0].quality).toBe(expectedResponse.quality)
  })
});