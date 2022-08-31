var tokenRider = 0;
const isGM = game.users.get(game.userId).hasRole(4);

if (isGM) {
    tokenRider = canvas.tokens.controlled[0];
    if (token == null) {
        ui.notifications.warn("Por favor selecione um token de tamanho médio.");
        return;
    }
    else if (tokenRider.actor.data.data.traits.size === "lg") {
        ui.notifications.warn("Por favor selecione um token de tamanho médio.");
        return;
    }
} if (!isGM) {
    let playerTokenName = game.user.character.data.token.name
    tokenRider = canvas.tokens.objects.getChildByName(playerTokenName)
}

const mountFlag = tokenRider.document.getFlag("world", "mounted");

if (mountFlag === undefined || mountFlag == 0) {
    async function montar(mountId) {
        let carriedWeight = tokenRider.actor.data.flags["variant-encumbrance-dnd5e"].data.totalWeightToDisplay
        let totalWeight = carriedWeight + await getActorWeight(tokenRider.actor);
        await tokenRider.document.setFlag("world", "mounted", "1");
        await tokenRider.document.setFlag("world", "mountId", mountId);
        MountUp.mount(tokenRider.document.id, mountId);
        await createItemRider(tokenRider.actor.data.img, tokenRider.data.name, totalWeight, mountId);
    }

    async function vacancyCheck(mountId, numberRiders) {
        if (numberRiders == 1) {
            return new Dialog({
                title: 'Montaria compartilhada',
                content: 'Essa montaria já está sendo usada, deseja subir na garupa?<br><br>',
                buttons: {
                    yes: {
                        icon: "<i class='fas fa-check'></i>",
                        label: "Montar",
                        callback: async () => {
                            await montar(mountId);
                        }
                    },
                    no: {
                        icon: "<i class='fas fa-times'></i>",
                        label: "Ficar a pé",
                        callback: async () => {
                            return; 
                        }
                    },
                },
                default: "yes",
            }).render(true);
        }
        else
            ui.notifications.error('Lotação máxima atingida.')
        
    }

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

    let selectMounts = '<form><div class="form-group"><label>Escolha uma montaria: </label><select id="mounts">';
    canvas.tokens.placeables.filter(f => f.actor.data.data.traits.size === "lg" && f.data.disposition === 1).forEach(function (mounts) {
        let optMount = '<option value="' + mounts.document.id + '">' + mounts.document.name + '</option>';
        selectMounts += optMount;
    });
    selectMounts += '</select></div></form>'

    new Dialog({
        title: "Montarias",
        content: selectMounts,
        buttons: {
            yes: {
                icon: "<i class='fas fa-check'></i>",
                label: "Montar",
                callback: async () => {
                    //console.log(mounts);
                    let mountId = $('#mounts').find(":selected").val();
                    let riders = canvas.tokens.get(mountId).actor.items.filter(item => item.getFlag("inventory-plus", "category") === "rider")
                    let numberRiders = riders.length
                    if (numberRiders > 0)
                    await vacancyCheck(mountId, numberRiders);
                    else
                    await montar(mountId);
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
    
    let mountId = tokenRider.document.getFlag("world", "mountId");
    await tokenRider.document.setFlag("world", "mounted", "0");
    deleteItemRider(tokenRider.data.name, mountId);
    ui.notifications.info("Montaria liberada.");
    MountUp.dismount(tokenRider.document.id);
}