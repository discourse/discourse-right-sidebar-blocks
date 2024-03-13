import Component from "@glimmer/component";
import { getOwner } from "@ember/application";
import { tracked } from "@glimmer/tracking";

const componentNameOverrides = {
  // avoids name collision with core's custom-html component
  "custom-html": "custom-html-rsb",
};

export default class RightSidebarBlocks extends Component {
  @tracked blocks = [];

  constructor() {
    super(...arguments);

    const blocksArray = [];

    JSON.parse(settings.blocks).forEach((block) => {
      block.internalName =
        block.name in componentNameOverrides
          ? componentNameOverrides[block.name]
          : block.name;

      if (getOwner(this).hasRegistration(`component:${block.internalName}`)) {
        block.classNames = `rs-component rs-${block.name}`;
        block.parsedParams = {};
        if (block.params) {
          block.params.forEach((p) => {
            block.parsedParams[p.name] = p.value;
          });
        }
        blocksArray.push(block);
      } else {
        // eslint-disable-next-line no-console
        console.warn(
          `The component "${block.name}" was not found, please update the configuration for discourse-right-sidebar-blocks.`
        );
      }
    });

    this.blocks = blocksArray;
  }
}
