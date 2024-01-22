import { Plugin } from "postcss";
declare function postcssPropertyGroups(options?: unknown): Plugin;
declare namespace postcssPropertyGroups {
    var postcss: boolean;
}
export { postcssPropertyGroups as default };
