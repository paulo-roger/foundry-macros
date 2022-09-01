var tokenFollower = 0;
const isGM = game.users.get(game.userId).hasRole(4);

if (isGM) {
    tokenFollower = canvas.tokens.controlled[0];
    if (token == null) {
        ui.notifications.warn("Por favor selecione um token");
        return;
    }
} if (!isGM) {
    let playerTokenName = game.user.character.data.token.name
    tokenFollower = canvas.tokens.objects.getChildByName(playerTokenName)
}

const followFlag = tokenFollower.document.getFlag("world", "following");

if (followFlag === undefined || followFlag == 0) {
    await tokenFollower.document.setFlag("world", "following", "1");
    (async () => {
        let targets = Array.from(game.user.targets);
        if (targets.length > 0) {
            if (targets.length > 1) return ui.notification.error("Can't follow more then one token!");
            ui.chat.processMessage(`I follow ${targets[0].name}`);
            await tokenAttacher.attachElementToToken(tokenFollower, targets[0], true);
            await tokenAttacher.setElementsLockStatus(tokenFollower, false, true);
        }
    })();
}
else {
    await tokenFollower.document.setFlag("world", "following", "0");
    (async () => {
        let targets = Array.from(game.user.targets);
        if (targets.length > 0) {
            if (targets.length > 1) return ui.notification.error("Can't unfollow more then one token!");
            await tokenAttacher.detachElementsFromToken(tokenFollower, targets[0], true);
            ui.chat.processMessage(`I walk my own path again.`);
        }
    })();
}

