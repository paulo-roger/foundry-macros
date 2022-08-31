//executar macro a partir de outra macro
game.macros.getName("name").execute()

//dentro do objeto Item5e
data.flags["inventory-plus"].category

//dentro do objeto Actor5e
data.flags["inventory-plus"].categorys.ozkd5r.label

const actor = canvas.tokens.controlled[0].actor;
let riderCategory = {
    "label": "Rider",
    "maxWeight": 0,
    "ownWeight": 0,
    "ignoreWeight": false,
    "explicitTypes": [
        {
            "id": "",
            "name": "None",
            "namePl": "None",
            "img": "",
            "isSelected": false,
            "isInventory": true
        },
        {
            "id": "weapon",
            "name": "DND5E.ItemTypeWeapon",
            "namePl": "DND5E.ItemTypeWeaponPl",
            "img": "",
            "isSelected": false,
            "isInventory": true
        },
        {
            "id": "equipment",
            "name": "DND5E.ItemTypeEquipment",
            "namePl": "DND5E.ItemTypeEquipmentPl",
            "img": "",
            "isSelected": false,
            "isInventory": true
        },
        {
            "id": "consumable",
            "name": "DND5E.ItemTypeConsumable",
            "namePl": "DND5E.ItemTypeConsumablePl",
            "img": "",
            "isSelected": false,
            "isInventory": true
        },
        {
            "id": "tool",
            "name": "DND5E.ItemTypeTool",
            "namePl": "DND5E.ItemTypeToolPl",
            "img": "",
            "isSelected": false,
            "isInventory": true
        },
        {
            "id": "loot",
            "name": "DND5E.ItemTypeLoot",
            "namePl": "DND5E.ItemTypeLootPl",
            "img": "",
            "isSelected": false,
            "isInventory": true
        },
        {
            "id": "backpack",
            "name": "DND5E.ItemTypeContainer",
            "namePl": "DND5E.ItemTypeContainerPl",
            "img": "",
            "isSelected": false,
            "isInventory": true
        }
    ],
    "dataset": {
        "type": "rider"
    },
    "collapsed": false,
    "sortFlag": 1000
}
await actor.setFlag("inventory-plus", "categorys.rider", riderCategory);

await actor.updateEmbeddedDocuments("Item");

