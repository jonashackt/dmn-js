'use strict';

var domClasses = require('min-dom/lib/classes');

function DmnRenderer(eventBus) {

  eventBus.on('row.render', function(event) {
    if(event.data.isClauseRow) {
      domClasses(event.gfx).add('labels');
    }
  });

  eventBus.on('cell.render', function(event) {
    var data = event.data,
        gfx  = event.gfx;

    if(!data.column.businessObject) {
      return;
    }

    if(data.row.isClauseRow) {
      // clause names
      gfx.childNodes[0].textContent = data.column.businessObject.name;
    } else if(data.content) {
      if(!data.content.tagName && data.row.businessObject) {
        // conditions and conclusions
        gfx.childNodes[0].textContent = data.content.text;
      }
    }
    if(!data.row.isFoot) {
      if(!!data.column.businessObject.inputExpression) {
        gfx.classList.add('input');
      } else {
        gfx.classList.add('output');
      }
    }
  });
}

DmnRenderer.$inject = [ 'eventBus' ];

module.exports = DmnRenderer;
