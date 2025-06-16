import Component from "@glimmer/component";
import { cached } from "@glimmer/tracking";
import { getOwner } from "@ember/owner";
import curryComponent from "ember-curry-component";
import PluginOutlet from "discourse/components/plugin-outlet";
import lazyHash from "discourse/helpers/lazy-hash";
import deprecated from "discourse/lib/deprecated";
import { getAvailableBlocks } from "../pre-initializers/right-sidebar-blocks-registry";

export default class RightSidebarBlocks extends Component {
  @cached
  get blocks() {
    const availableBlocks = getAvailableBlocks();

    const blocksArray = [];

    JSON.parse(settings.blocks).forEach((block) => {
      const rsbRegistryResult = availableBlocks.get(block.name);
      if (rsbRegistryResult) {
        block.component = rsbRegistryResult;
      } else {
        const emberRegistryResult = getOwner(this).resolveRegistration(
          `component:${block.name}`
        );
        if (emberRegistryResult) {
          block.component = emberRegistryResult;
          deprecated(
            `The block "${block.name}" is not registered in the right-sidebar-blocks registry. Register it using \`api.registerValueTransformer("right-sidebar-blocks", ({ value: blocks }) => blocks.set("${block.name}", MyImportantComponent));\``,
            { id: "discourse.right-sidebar-blocks.component-resolution" }
          );
        }
      }

      if (block.component) {
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

    return blocksArray;
  }

  <template>
    <PluginOutlet @name="above-right-sidebar-blocks" />

    {{#each this.blocks as |block|}}
      <div class={{block.classNames}}>
        {{#let
          (curryComponent block.component block.parsedParams)
          as |CurriedComponent|
        }}
          <CurriedComponent />
        {{/let}}
      </div>

      <PluginOutlet
        @name="below-right-sidebar-block"
        @outletArgs={{lazyHash block=block}}
      />
    {{/each}}

    <PluginOutlet @name="below-right-sidebar-blocks" />
  </template>
}
