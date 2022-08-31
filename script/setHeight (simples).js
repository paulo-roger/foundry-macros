const token = canvas.tokens.controlled[0]
async function setHeight() {
    if (token == null) {
        ui.notifications.warn("Por favor selecione um token.");
        return;
    }
    new Dialog({
        title: "Insira a elevação abaixo:",
        content: `<form>
    <div class="form-group"> <label>Elevação</label> <div class="form-fields"> <input type="number" id="elevation" value="0"> </div> </div>
    </form>`,
        buttons: {
            yes: {
                icon: `<i class="fas fa-check"></i>`,
                label: "Voe",
                callback: async (html) => {
                    let elevation = html[0].querySelector("#elevation").value;
                    let scaleProduct = elevation/5
                    if (scaleProduct < 1)
                        scaleProduct += 1
                    else if (scaleProduct >15)
                        scaleProduct = 10                    
                    return token.document.update({ elevation: elevation, scale: scaleProduct })
                    
                }
            }
        }
    }).render(true);
}
await setHeight()