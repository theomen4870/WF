// Check for broken or missing nodes

'use strict';
const helpers = require('./include/helpers.js')
const fs = require('fs');

let rawdata = fs.readFileSync('./json/islands.json');
let islands = JSON.parse(rawdata);
rawdata = fs.readFileSync('./resourceTypes.json');
let resourceTypes = JSON.parse(rawdata);
let types = {};
var resources = {};
var animals = {};

for (var island in islands) {
    var i = islands[island];
    for (var resource in i.resources) {
        resource = resource.replace(/ \(Rock\)/g, '');
        if (!resources[resource])
            resources[resource] = {
                count: 0,
                type: resourceTypes[resource]
            };
        if (!resources[resource].type) {
            console.log("Missing " + resource)
        }
        resources[resource].count++;
    }
}

for (var type in resourceTypes) {
    types[resourceTypes[type]] = new Array();
}

for (var type in types) {
    for (var resource in resources) {
        if (resources[resource].type === type) {
            let add = {};
            add[resource] = resources[resource].count;
            types[type].push(add);
        }
    }
}

fs.writeFileSync('./json/resourceCheck.json', JSON.stringify(types, null, "\t"));