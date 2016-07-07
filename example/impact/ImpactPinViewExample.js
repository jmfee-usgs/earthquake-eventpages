'use strict';


var ImpactPinView = require('impact/ImpactPinView'),
    Xhr = require('util/Xhr');


var el;

el = document.querySelector('.impact-pin-view-example');

Xhr.ajax({
  url: '/events/us10004u1y.json',
  success: function (data) {
    var ev;

    ev = CatalogEvent(data);

    ImpactPinView({
      el: el,
      model: ev.getPreferredOriginProduct(),
      event: ev
    }).render();
  },

  error: function () {
    el.innerHTML = '<p class="alert error">Failed to load event details.</p>';
  }
});

