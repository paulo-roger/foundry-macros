var token = 0;
const isGM = game.users.get(game.userId).hasRole(4);
if (isGM) {
    token = canvas.tokens.controlled[0];
    let actorSize = token.actor.data.data.traits.size;
    if (token == null || actorSize === "lg" ) {
        ui.notifications.warn("Por favor selecione um Token de tamanho médio.");
        return;
    }
} if (!isGM) {
    const playerTokenName = game.user.character.data.token.name
    token = canvas.tokens.objects.getChildByName(playerTokenName)
}
console.log(token)
const mountFlag = token.document.getFlag("world", "mounted");
if (mountFlag === undefined || mountFlag == 0) {
    let selectMounts = '<form><div class="form-group"><label>Escolha uma montaria: </label><select id="mounts">';
    canvas.tokens.placeables.filter(f => f.actor.data.data.traits.size === "lg" && f.data.disposition === 1).forEach(function (mounts) {
        let optMount = '<option value="' + mounts.document.id + '">' + mounts.document.name + '</option>';
        selectMounts += optMount;
    });
    selectMounts += '</select></div></form>'

    async function getItem(actor, itemName) {
        let itemObject = actor.data.items.find(t => t.name == itemName);
        return itemObject;
    }

    async function createItemRider(tokenImg, tokenN, actorW, mountId) {
        let mountActor = canvas.tokens.get(mountId).actor
        await mountActor.createEmbeddedDocuments("Item", [{
            name: tokenN,
            img: tokenImg,
            type: "equipment",
            //"data.consumableType": 
            "data.weight": actorW
        }])

        let item = await getItem(mountActor, tokenN);
        await item.setFlag("inventory-plus", "category", "rider");
    }

    async function getActorWeight(riderActor) {
        let string = riderActor.data.data.details.weight
        let input = ""
        for (var i = 0; i < string.length; i++) {
            if (string[i] === "l") {
                return parseFloat(input);
            } else {
                input += string[i];
            }
        }
    }

    new Dialog({
        title: "Montarias",
        content: selectMounts,
        buttons: {
            yes: {
                icon: "<i class='fas fa-check'></i>",
                label: "Montar",
                callback: async () => {
                    //console.log(mounts);
                    let mount = $('#mounts').find(":selected").val();
                    let carriedWeight = token.actor.data.flags["variant-encumbrance-dnd5e"].data.totalWeightToDisplay
                    let totalWeight = carriedWeight + await getActorWeight(token.actor);
                    await token.document.setFlag("world", "mounted", "1");
                    await token.document.setFlag("world", "mountId", mount);
                    MountUp.mount(token.document.id, mount);
                    await createItemRider(token.actor.data.img, token.data.name, totalWeight, mount);
                }
            },
            no: {
                icon: "<i class='fas fa-times'></i>",
                label: "Ficar a pé"
            },
        },
        default: "yes",
    }).render(true);
}

if (mountFlag == 1) {
    function deleteItemRider(tokenN, mountId) {
        let mountActor = canvas.tokens.get(mountId).actor
        let itemId = mountActor.data.items.find(t => t.name == tokenN).id;
        mountActor.deleteEmbeddedDocuments("Item", [itemId]);
    }

    let mountId = token.document.getFlag("world", "mountId");
    await token.document.setFlag("world", "mounted", "0");
    deleteItemRider(token.data.name, mountId);
    ui.notifications.info("Montaria liberada.");
    MountUp.dismount(token.document.id);
}