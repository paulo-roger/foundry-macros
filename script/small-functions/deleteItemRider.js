const token = canvas.tokens.controlled[0];
let mountId = token.document.getFlag("world", "mountId");
//console.log(mountId);

function deleteItemRider(tokenN, mountId) {
    let mountActor = canvas.tokens.get(mountId).actor
    let itemId = mountActor.data.items.find(t => t.name == tokenN).data._id;
    mountActor.deleteEmbeddedDocuments("Item", [itemId]);
}
