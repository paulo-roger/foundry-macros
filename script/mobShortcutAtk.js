const size = canvas.tokens.controlled.length

if (!size || size < 2) {
    ui.notifications.error('Selecione um grupo!')
    return
}

const target = game.user.targets?.values().next().value?.document

if (!target) {
    ui.notifications.warn('Escolha um alvo');
    return;
}

const targetAC = target.actor.data.data.attributes.ac.value;

const attacks = token.actor.items.filter(item => item.hasAttack);
let buttonData = attacks.map(item => {
    const toHit = item.getAttackToHit();
    return {
        //label: item.name,
        value: {
            item,
            numHits: 0
        },
        toHitEval: new Roll(toHit.parts.join('+'), item.getRollData()).evaluate({ async: true })
    }
})

for (let data of buttonData) {
    data.toHitEval = await data.toHitEval;
}

const LUT = [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 4, 4, 5, 5, 10, 20];

buttonData.forEach(button => {
    const d20Needed = Math.max(targetAC - button.toHitEval.total, 1);
    const numNeeded = LUT[d20Needed - 1];
    button.value.numHits = Math.floor(size / numNeeded);
    button.label = `<style>div#icolbl{ padding-top:2px; line-height:12px !important } img#butico{ width:32px } div#lbl{ display:inline-block; vertical-align:top; padding:10px }</style><div id='icolbl'><img id='butico' src='${button.value.item.img}'> <div id=lbl> ${button.value.item.name}: ${button.value.numHits} hit (+${button.toHitEval.total} to hit, ${numNeeded} required).</div></div>`
})

const chosen = await warpgate.buttonDialog({ buttons: buttonData, title: `Group of ${size} attacks!` }, 'column')
if (!chosen) return;

await ChatMessage.create({ content: `${chosen.numHits} attackers hit ${target.name} with ${targetAC} AC.` })

//For fun, roll a d20, on 20, roll crit damage ;)
for (let i = 0; i < chosen.numHits; i++) {
    const critical = Math.floor(Math.random() * 20) == 19;
    await chosen.item.rollDamage({ critical });
}