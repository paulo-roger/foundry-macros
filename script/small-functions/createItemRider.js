function createItemRider(tokenImg, tokenN, actorW, mountId){
    mountId.createEmbeddedDocuments("Item", [{
        name: tokenN, 
        img: tokenImg, 
        type: "consumable", 
        "data.weight": actorW
    }])
}