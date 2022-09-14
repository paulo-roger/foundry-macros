let tokViewer = canvas.tokens.controlled

if (!tokViewer[0]) {
    ui.notifications.warn('Selecione ao menos um token')
    return
}

for (let i = 0; i < tokViewer.length; i++) {
    let toggleVision = tokViewer[i].document.data.vision == true ? { vision: false } : { vision: true }
    tokViewer[i].document.update(toggleVision)
}