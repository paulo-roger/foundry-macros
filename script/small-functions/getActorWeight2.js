function getActorWeight(riderActor) {
    const string = riderActor._sheet.form.elements["data.details.weight"].defaultValue
    let input = ""
    for (var i = 0; i < string.length; i++) {
        if (string[i] === "l") {
            //console.log(string[i]);
            console.log(input);
            return input;
        } else {
            input += string[i];
        }
    }
}

canvas.tokens.controlled[0].actor