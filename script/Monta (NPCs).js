const token = canvas.tokens.controlled[0]
if (token == null) {
    ui.notifications.warn("Por favor selecione seu Token.");
    return;
}

const mountFlag = token.document.getFlag("world", "mount");

if (mountFlag === undefined || mountFlag == 0){

await token.document.setFlag("world", "mount", "1");

let selectMounts = '<form><div class="form-group"><label>Escolha uma montaria: </label><select id="mounts">';

canvas.tokens.placeables.filter(f => f.actor.labels.creatureType === "Beast (Mount)").forEach(function (mounts) {
    let optMount = '<option value="' + mounts.data._id + '">' + mounts.data.name + '</option>';
    selectMounts += optMount;
});

selectMounts += '</select></div></form>'

new Dialog({
    title: "Montar",
    content: selectMounts,
    buttons: {
        yes: {
            icon: "<i class='fas fa-check'></i>",
            label: "Montar",
            callback: () => {
                let mount = $('#mounts').find(":selected").val();
                MountUp.toggleMount(token.data._id, mount)
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

if (mountFlag == 1){
await token.document.setFlag("world", "mount", "0");
ui.notifications.warn("Montaria liberada.");
MountUp.dismount(token.data._id);
}