new Dialog({
    title: `ChangeVision(Selected)`,
    content: `
      <form>
        <div class="form-group">
          <select id="select-type" name="select-type">
              <option value="120">120º</option>
              <option value="360">360º</option>
              <option value="180">180º</option>
          </select>
        </div>
      </form>
      `,
    buttons: {
      yes: {
        icon: "<i class='fas fa-check'></i>",
        label: `Apply Changes`,
        callback: async (html) => {
              const updates = canvas.tokens.controlled.map(t => {
                  console.log(html.find('[name="select-type"]')[0].value);
              let sightAngle = parseInt(html.find('[name="select-type"]')[0].value); 
             return {_id: t.id, sightAngle};
              });
              await canvas.scene.updateEmbeddedDocuments("Token", updates);
        
          }
        },
      no: {
        icon: "<i class='fas fa-times'></i>",
        label: `Cancel Changes`
      },
    },
    default: "yes",
    close: html => {
      return
    }
  }).render(true);