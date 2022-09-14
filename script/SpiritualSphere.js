const origin = args[0].itemUuid;
if (origin) {
    const removeList = actor.effects.filter(ae => ae.data.origin === origin && getProperty(ae.data, "flags.dae.transfer") !== 3).map(ae=>ae.id);
    await actor.deleteEmbeddedDocuments("ActiveEffect", removeList)
}
const updates = {
    Item: {
    "Bludgeon": {
      "data.attackBonus": args[0].actor.data.attributes.spelldc-8+args[0].actor.data.bonuses.msak.attack,
      "data.damage.parts":[[`${1 + Math.floor((args[0].spellLevel-2)/2)}d8 + ${args[0].actor.data.abilities[args[0].actor.data.attributes.spellcasting]?.mod || ""}`,"force"]]
    }
  }
}
const result = await warpgate.spawn("Spiritual Sphere",  {embedded: updates}, {}, {});
if (result.length !== 1) return;
const targetUuid = `Scene.${canvas.scene.id}.Token.${result[0]}`;


await actor.createEmbeddedDocuments("ActiveEffect", [{
    label: "Summon", 
    icon: args[0].item.img, 
    origin,
    duration: {second: 60, rounds:10},
    "flags.dae.stackable": false,
    changes: [{key: "flags.dae.deleteUuid", mode: CONST.ACTIVE_EFFECT_MODES.ADD, value: [targetUuid]}]
}]);