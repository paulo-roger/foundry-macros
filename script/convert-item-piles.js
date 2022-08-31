//console.log("--------------------------------------------")
//console.log(args[1])

let token = canvas.tokens.get(args[1]);

if(args[0] === "on"){
const chanceOfDamagedItems = 0.7
const damagedItemsMultiplier = 0.15
const removeDamagedItems = false
let actor = token.actor;

updates = _getLootableItems({
    token,
    chanceOfDamagedItems,
    damagedItemsMultiplier,
    removeDamagedItems,
});

await actor.updateEmbeddedDocuments("Item", updates);

// Remove natural weapons, natural armor, class features, spells, and feats.
function _getLootableItems({
  token,
  chanceOfDamagedItems,
  damagedItemsMultiplier,
  removeDamagedItems,
})
{
  return token.actor.data.items
    .map((item) => {
      return item.toObject();
    })
    .filter((item) => {
      if (_isItemDamaged(item, chanceOfDamagedItems)) {
        if (removeDamagedItems) return false;

        item.name += ' (Damaged)';
        item.data.price *= damagedItemsMultiplier;
      }

      return true;
    })
}

function _isItemDamaged(item, chanceOfDamagedItems)
{
  const rarity = item.data.rarity;
  if (!rarity) return false;

  // Never consider items above common rarity breakable
  if (rarity.toLowerCase() !== 'common' && rarity.toLowerCase() !== 'none')
    return false;

  return Math.random() < chanceOfDamagedItems;
}

await new Promise(resolve => setTimeout(resolve, 3000));
ItemPiles.API.turnTokensIntoItemPiles(token);

const tokenImg = token.data.img;
// stores the string
await token.document.setFlag("world", "originalTokenImage", tokenImg);

const imgDead = 'https://odvwwfoundry1988.s3.sa-east-1.amazonaws.com/img/assets/Dead_Human.webp';
await token.document.update({img: imgDead, vision: false});
}

if(args[0] === "off"){
const formerTokenImage = token.document.getFlag("world", "originalTokenImage"); // returns the saved string
console.log("***", formerTokenImage);
ItemPiles.API.revertTokensFromItemPiles(token);
await token.document.update({img: formerTokenImage, vision: true});
}