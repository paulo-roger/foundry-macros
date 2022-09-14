const orcs = canvas.tokens.controlled;
const start = game.tables.getName("name of table here");
const end = game.tables.getName("name of table here");
const starts = await start.drawMany(orcs.length, {displayChat: false});
const ends = await end.drawMany(orcs.length, {displayChat: false});
const prepends = starts.results.map(i => i.getChatText());
const appends = ends.results.map(i => i.getChatText());
const updates = [];
for ( let i = 0; i < orcs.length; i++ ) {
  const pre = Math.random();
  const name = pre > 0.5 ? `${prepends[i]} ${orcs[i].name}` : `${orcs[i].name} ${appends[i]}`;
  updates.push({_id: orcs[i].id, name});
}
await canvas.scene.updateEmbeddedDocuments("Token", updates);