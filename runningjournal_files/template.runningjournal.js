(function(){
Template.body.addContent((function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("currentUser"));
  }, function() {
    return [ " \n  ", HTML.DIV({
      "class": "container"
    }, "\n    ", HTML.HEADER("\n      ", HTML.H1("How far did you run today?"), "\n        \n      ", HTML.FORM({
      "class": "new-entry"
    }, "\n      \n        ", HTML.DIV({
      "class": "form-horizontal"
    }, "  \n        ", HTML.INPUT({
      type: "number",
      name: "text",
      placeholder: ""
    }), "\n          \n        ", HTML.INPUT({
      "class": "btn",
      type: "radio",
      name: "units",
      value: "miles",
      checked: "",
      id: "miles"
    }), " Miles\n        ", HTML.INPUT({
      "class": "btn",
      type: "radio",
      name: "units",
      value: "kilometers",
      id: "kilometers"
    }), " Kilometers\n            "), "\n      "), "\n          \n      ", HTML.DIV({
      align: "right",
      "class": "login"
    }, Spacebars.include(view.lookupTemplate("loginButtons"))), "\n        \n    "), "\n\n    ", HTML.UL({
      "class": "nav nav-pills"
    }, "\n      ", HTML.LI({
      role: "presentation",
      "class": "active"
    }, HTML.A({
      href: "#",
      a: "",
      "data-toggle": "tab",
      "class": "week"
    }, "This Week")), "\n      ", HTML.LI({
      role: "presentation"
    }, HTML.A({
      "data-toggle": "tab",
      href: "#",
      "class": "month"
    }, "This Month")), "\n      ", HTML.LI({
      role: "presentation"
    }, HTML.A({
      "data-toggle": "tab",
      href: "#",
      "class": "all"
    }, "All")), "\n    "), "\n      \n    ", HTML.UL("\n      ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("entries"));
    }, function() {
      return [ "\n        ", Spacebars.include(view.lookupTemplate("entry")), "\n      " ];
    }), "\n    "), "\n      \n    ", HTML.P({
      align: "center"
    }, "Total: ", Blaze.View(function() {
      return Spacebars.mustache(view.lookup("totalDistance"));
    }), " ", Blaze.View(function() {
      return Spacebars.mustache(view.lookup("units"));
    })), "\n  "), "\n  " ];
  }, function() {
    return [ "\n  ", HTML.DIV({
      "class": "container"
    }, "\n    ", HTML.DIV({
      id: "menu"
    }, "\n        \n        ", HTML.DIV({
      "class": "button-group"
    }, "\n        \n            ", HTML.A({
      href: "#",
      "class": "btn-secondary",
      id: "testbtn"
    }, "Sign In"), "\n            \n        "), "\n      \n    "), "\n      \n    ", HTML.DIV({
      id: "content-container"
    }, "\n        ", HTML.H1("Make an account"), "\n        ", Spacebars.include(view.lookupTemplate("loginButtons")), "\n    \n    "), "\n      \n    \n\n  "), "\n  " ];
  });
}));
Meteor.startup(Template.body.renderToDocument);

Template.__checkName("entry");
Template["entry"] = new Template("Template.entry", (function() {
  var view = this;
  return HTML.LI("\n        ", HTML.DIV({
    "class": "list-container"
  }, "\n            ", HTML.DIV({
    "class": "value"
  }, Blaze.If(function() {
    return Spacebars.call(view.lookup("miles"));
  }, function() {
    return Blaze.View(function() {
      return Spacebars.mustache(view.lookup("valueMi"));
    });
  }, function() {
    return Blaze.View(function() {
      return Spacebars.mustache(view.lookup("valueKm"));
    });
  }), " ", HTML.SPAN({
    "class": "units"
  }, Blaze.View(function() {
    return Spacebars.mustache(view.lookup("units"));
  }))), "\n            ", HTML.DIV({
    "class": "date"
  }, Blaze.View(function() {
    return Spacebars.mustache(view.lookup("displayDate"));
  })), "\n        "), "\n    ");
}));

})();
