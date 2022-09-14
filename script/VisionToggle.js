let tokViewer = canvas.tokens.controlled[0]

if (!tokViewer){
    ui.notifications.warn('Selecione ao menos um token')
    return
}

let toggleVision = tokViewer.document.data.vision == true ? {vision: false} : {vision: true}

tokViewer.document.update(toggleVision)