import { Rule, Declaration } from 'postcss';

console.log('⛽ postcss-property-groups module loaded');
var declarations = new Map();
function postcssPropertyGroups(options) {
    return {
        postcssPlugin: 'postcss-property-groups',
        prepare: function (result) {
            var id = hash(Math.random().toString());
            console.log("".concat(id, " \uD83D\uDEEB Preparing postcss-property-groups plugin"));
            function getPropertyGroupDeclarations(propertyGroupName) {
                if (!declarations.has(propertyGroupName)) {
                    console.log("".concat(id, " \u2753 Unknown property group ").concat(propertyGroupName, ", creating new declarations"));
                    declarations.set(propertyGroupName, []);
                }
                return declarations.get(propertyGroupName);
            }
            return {
                AtRule: {
                    'property-group': function (atRule, helper) {
                        var params = atRule.params.split(' ');
                        var propertyGroupName = params.pop();
                        var selector = params.join(' ');
                        if (propertyGroupName === undefined || !(propertyGroupName === null || propertyGroupName === void 0 ? void 0 : propertyGroupName.startsWith('--'))) {
                            throw new Error("Invalid property group name: ".concat(propertyGroupName));
                        }
                        var propertyGroupDeclarations = getPropertyGroupDeclarations(propertyGroupName);
                        atRule.replaceWith(new Rule({
                            selector: selector,
                            nodes: atRule.nodes.map(function (node) {
                                if (node.type !== 'decl') {
                                    throw new Error("".concat(node, " is not a CSS declaration."));
                                }
                                propertyGroupDeclarations.push(node.prop);
                                return new Declaration({
                                    prop: "".concat(propertyGroupName, "-").concat(node.prop),
                                    value: node.value
                                });
                            })
                        }));
                        console.log("".concat(id, " \uD83C\uDD95 new property group --").concat(propertyGroupName, " with properties ").concat(propertyGroupDeclarations.join(', ')));
                    }
                },
                Declaration: {
                    'apply-property-group': function (decl, helper) {
                        var propertyGroupNames = decl.value.split(' ').map(function (name) { return name.trim(); });
                        var propertyGroupProps = propertyGroupNames.flatMap(function (propertyGroupName) {
                            var propertyGroupDeclarations = getPropertyGroupDeclarations(propertyGroupName);
                            console.log("".concat(id, " \u2705 applying ").concat(propertyGroupName, " with ").concat(propertyGroupDeclarations.length, " properties ").concat(propertyGroupDeclarations.join(', ')));
                            var props = propertyGroupDeclarations.map(function (prop) { return ({
                                prop: prop,
                                value: "var(".concat(propertyGroupName, "-").concat(prop, ")")
                            }); });
                            return props;
                        });
                        decl.replaceWith.apply(decl, propertyGroupProps);
                    }
                }
            };
        }
    };
}
postcssPropertyGroups.postcss = true;
function hash(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash &= hash; // Convert to 32bit integer
    }
    return new Uint32Array([hash])[0].toString(36);
}

export { postcssPropertyGroups as default };
