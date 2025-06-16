import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { getOwner } from "@ember/owner";
import curryComponent from "ember-curry-component";
import PluginOutlet from "discourse/components/plugin-outlet";
import lazyHash from "discourse/helpers/lazy-hash";
import CustomHtmlRsb from "./custom-html-rsb";

export default class RightSidebarBlocks extends Component {
  @tracked blocks = [];

  constructor() {
    super(...arguments);

    const blocksArray = [];

    JSON.parse(settings.blocks).forEach((block) => {
      if (block.name === "custom-html") {
        block.component = CustomHtmlRsb;
      } else {
        block.component = getOwner(this).resolveRegistration(
          `component:${block.name}`
        );
      }

      if (block.component) {
        block.classNames = `rs-component rs-${block.name}`;

        const parsedParams = {};
        if (block.params) {
          block.params.forEach((p) => {
            parsedParams[p.name] = p.value;
          });
        }

        // `params` key is for backwards compatibility.
        // New components can use the top level curried arguments
        block.parsedParams = { params: parsedParams, ...parsedParams };

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
