var Machine = require("machine");
module.exports = {
    'find': function(req, res) {
        Machine.build({
            inputs: {},
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Resolve path
                sails.machines['2806adc7-0289-473a-8843-020526771565_1.1.0'].resolve({
                    "paths": ["views/partials/doc-menus/getting-started" + ".jsmenu"]
                }).exec({
                    "error": function(resolvePath) {
                        return exits.error({
                            data: resolvePath,
                            status: 500
                        });

                    },
                    "success": function(resolvePath) {
                        // Read JSON file
                        sails.machines['8f8944e3-49b6-429d-a4c5-c77fe3ae878d_3.0.0'].readJson({
                            "source": resolvePath,
                            "schema": [{
                                templateTitle: "Foo-Bar.ejs",
                                fullPathAndFileName: "idk.ejs",
                                data: {}
                            }]
                        }).exec({
                            "error": function(readJSONFile) {
                                return exits.error({
                                    data: readJSONFile,
                                    status: 500
                                });

                            },
                            "doesNotExist": function(readJSONFile) {
                                return exits.error({
                                    data: readJSONFile,
                                    status: 500
                                });

                            },
                            "couldNotParse": function(readJSONFile) {
                                return exits.error({
                                    data: readJSONFile,
                                    status: 500
                                });

                            },
                            "success": function(readJSONFile) {
                                // Marshal menu metadata
                                sails.machines['_project_3549_0.0.22'].MarshaldocPageMetadata({
                                    "docPageMetadatas": readJSONFile
                                }).exec({
                                    "error": function(marshalMenuMetadata) {
                                        return exits.error({
                                            data: marshalMenuMetadata,
                                            status: 500
                                        });

                                    },
                                    "success": function(marshalMenuMetadata) {
                                        return exits.respond({
                                            data: {
                                                sections: marshalMenuMetadata
                                            },
                                            action: "display_view",
                                            status: 200,
                                            view: "get-started.ejs"
                                        });

                                    }
                                });

                            }
                        });

                    }
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    }
};