module.exports = {
  "inputs": {
    "docPageMetadatas": {
      "id": "573ef066-9a67-49a4-9f2e-f7b91a77524f",
      "friendlyName": "docPageMetadatas",
      "description": "",
      "typeclass": "array",
      "required": true,
      "addedManually": true
    },
    "slug": {
      "id": "f35abb0e-6a92-4f9a-90ce-5aaf68e66653",
      "friendlyName": "slug",
      "description": "The name of the docs section you're trying to navigate to",
      "example": "dance-party",
      "required": true,
      "addedManually": true
    }
  },
  "exits": {
    "error": {
      "example": undefined
    },
    "success": {
      "id": "success",
      "friendlyName": "then",
      "description": "Normal outcome.",
      "example": {
        "templateTitle": "Foo-Bar.ejs",
        "fullPathAndFileName": "creating-a-machinepack/Foo-Bar.ejs",
        "slug": "foo-bar",
        "displayName": "Foo Bar",
        "data": {}
      }
    }
  },
  "defaultExit": "success",
  "fn": function(inputs, exits, env) { // Ensure requested view is one of the allowed nav items.
    var docPageToShow = _.find(inputs.docPageMetadatas, function(page) {
      return page.slug.toLowerCase().match(inputs.slug.toLowerCase());
    });

    if (!docPageToShow) {
      return exits.error();
    }

    return exits.success(docPageToShow)
  },
  "identity": "Fniddocpagetoshow"
};