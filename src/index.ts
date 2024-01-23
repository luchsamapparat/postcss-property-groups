import { Declaration, Rule, type Plugin } from "postcss";

const declarations = new Map<string, string[]>();

function postcssPropertyGroups(): Plugin {
  return {
    postcssPlugin: 'postcss-property-groups',
    prepare() {
      function getPropertyGroupDeclarations(propertyGroupName: string) {
        if (!declarations.has(propertyGroupName)) {
          declarations.set(propertyGroupName, []);
        }

        return declarations.get(propertyGroupName)!;
      }

      return {
        AtRule: {
          'property-group': atRule => {
            const params = atRule.params.split(' ');

            const propertyGroupName = params.pop();
            const selector = params.join(' ');

            if (propertyGroupName === undefined || !propertyGroupName?.startsWith('--')) {
              throw new Error(`Invalid property group name: ${propertyGroupName}`);
            }

            const propertyGroupDeclarations = getPropertyGroupDeclarations(propertyGroupName);

            atRule.replaceWith(new Rule({
              selector,
              nodes: atRule.nodes.map(node => {
                if (node.type !== 'decl') {
                  // throw new Error(`${node} is not a CSS declaration.`);
                  return node;
                }

                propertyGroupDeclarations.push(node.prop);

                return new Declaration({
                  prop: `${propertyGroupName}-${node.prop}`,
                  value: node.value
                })
              })
            }));
          }
        },
        Declaration: {
          'apply-property-group': decl => {
            const propertyGroupNames = decl.value.split(' ').map(name => name.trim());

            const propertyGroupProps = propertyGroupNames.flatMap(propertyGroupName => {
              const propertyGroupDeclarations = getPropertyGroupDeclarations(propertyGroupName);

              const props = propertyGroupDeclarations.map(prop => ({
                prop,
                value: `var(${propertyGroupName}-${prop})`
              }));

              return props;
            });

            decl.replaceWith(...propertyGroupProps);
          }
        }
      }
    }
  }
}
postcssPropertyGroups.postcss = true;

export default postcssPropertyGroups;
