const token = canvas.tokens.controlled[0]
function setHeight() {
    if (token == null) {
        ui.notifications.warn("Por favor selecione um token.");
        return;
    }
    let climbrate = 0.8
    let turns = 0
    let hipotenusa = token.speed
    new Dialog({
        title: "Insira a elevação abaixo:",
        content: `<form>
    <div class="form-group"> <label>Elevação</label> <div class="form-fields"> <input type="number" id="elevation" value="0"> </div> </div>
    </form>`,
        buttons: {
            roll: {
                icon: `<i class="fas fa-dice"></i>`,
                label: "Roll",
                callback: async (html) => {
                    const elevation = html[0].querySelector("#elevation").value;
                    await 


                    
                }
            }
        }
    }).render(true);
}




async function pitagoras(hipotenusa, climbrate, elevation)
{
    let copo = climbrate * elevation;
    let cadj = Math.sqrt(Math.pow(hipotenusa, 2) - Math.pow(copo, 2));
    return cadj
}

Considerando um indice de subida de climbrate (o que pode ser considerado elevado) serão necessários turns turnos usando dash action.

return new Roll(`1d20 + ${modifier} + ${boons}d6kh - ${banes}d6kh`).toMessage({
    flavor: "your flavor text here"
});