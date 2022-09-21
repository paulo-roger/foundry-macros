let actorName = 'Anastasia'
let spellName = 'Summon Aberration'

const actor = game.actors.getName(actorName);
const item = actor.items.getName(spellName);

//dnd5e specific helper -- rolls the item and retrieves the final spell level chosen to cast (i.e. upcasting)
const level = await warpgate.dnd5e.rollItem(item);

// Computing values needed for scaling attacks/DCs
const summonerDc = actor.data.data.attributes.spelldc;
const summonerAttack = summonerDc - 8;

const buttonData = {
    buttons: [{
        label: 'Beholderkin',
        value: {
            token: { name: "Beholderkin" },
            actor: { name: "Beholderkin" },
            embedded: {
                Item: {
                    "Eye Ray": {
                        'data.damage.parts' : [[`1d8 + 3 + ${level}`]],
                        'data.attackBonus' : `- @mod - @prof + ${summonerAttack}`,
                    },
                    "Claws": warpgate.CONST.DELETE,
                    "Regeneration": warpgate.CONST.DELETE,
                    "Psychic Slam": warpgate.CONST.DELETE,
                    "Whispering Aura": warpgate.CONST.DELETE
                }
            }
        }
    }, {
        label: 'Slaad',
        value: {
            actor: { name: "Slaad" },
            token: { name: "Slaad" },
            embedded: {
                Item: {
                    "Claws": {
                        'data.damage.parts' : [[`1d10 + 3 + ${level}`]],
                        'data.attackBonus' : `- @mod - @prof + ${summonerAttack}`,
                    },
                    "Eye Ray": warpgate.CONST.DELETE,
                    "Psychic Slam": warpgate.CONST.DELETE,
                    "Whispering Aura": warpgate.CONST.DELETE
                }
            }
        }
    }, {
        label: 'Star Spawn',
        value: {
            actor: { name: "Star Spawn" },
            token: { name: "Star Spawn" },
            embedded: {
                Item: {
                    "Psychic Slam": {
                        'data.damage.parts' : [[`1d8 + 3 + ${level}`]],
                        'data.attackBonus' : `- @mod - @prof + ${summonerAttack}`,
                    },
                    "Claws": warpgate.CONST.DELETE,
                    "Regeneration": warpgate.CONST.DELETE,
                    "Eye Ray": warpgate.CONST.DELETE
                }
            }
        }
    }
    ], title: 'Choose aberration type'
};

let aberrant = await warpgate.buttonDialog(buttonData);

/* Craft the updates that are common to all spiritual badgers */
let updates = {
    token: { "displayName": CONST.TOKEN_DISPLAY_MODES.HOVER },
    actor: {
        'data.attributes.ac.flat': 11 + level,
        'data.attributes.hp': { value: 40 + 10 * (level - 4), max: 40 + 10 * (level - 4) },
    },
    embedded: {
        Item: {
            "Multiattack": { name: `Multiattack (${Math.floor(level / 2)} attacks)` }
        }
    }

}

/* Combine the general and specific updates */
updates = mergeObject(updates, aberrant);
await warpgate.spawn("Aberrant Spirit", updates);