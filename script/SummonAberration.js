let aberrationsFolder = 'Aberrations'

let selectAberrations = '<form><div class="form-group"><label>Choose the Aberration: </label><select id="aberrations">';
game.folders.getName(aberrationsFolder).content.forEach(function (aberration) {
    let optAberration = '<option value="' + aberration.data.name + '">' + aberration.data.name + '</option>';
    selectAberrations += optAberration;
});
selectAberrations += '</select></div></form>'
new Dialog({
    title: "Summon Aberrations",
    content: selectAberrations,
    buttons: {
        yes: {
            icon: '<i class="fas fa-spider"></i>',
            label: "Summon!",
            callback: () => {
                let aberration = $('#aberrations').find(":selected").val();
                warpgate.spawn(aberration, {}, {}, {});
            }
        }
    }
}).render(true);