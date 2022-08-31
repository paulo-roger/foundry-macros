async function getActorWeight(riderActor) {
    let sheet = riderActor.sheet
    if (riderActor._sheet.form === null) {
        await sheet.render(true);
        await new Promise(resolve => setTimeout(resolve, 3000));
    }
    let string = riderActor._sheet.form.elements["data.details.weight"].defaultValue
    let input = ""
    let numero = 0
    //console.log("*******", riderActor._sheet.form)
    await sheet.close();
    for (var i = 0; i < string.length; i++) {
        if (string[i] === "l") {
            //console.log(string[i]);
            //console.log(input);
            numero = parseFloat(input);
            return numero;
        } else {
            input += string[i];
        }
    }
}

let t = canvas.tokens.controlled[0].actor;

console.log(await getActorWeight(t));