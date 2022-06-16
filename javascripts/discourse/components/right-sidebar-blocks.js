import GlimmerComponent from "discourse/components/glimmer";
import { tracked } from "@glimmer/tracking";

export default class RightSidebarBlocks extends GlimmerComponent {
  @tracked components = [];

  constructor() {
    super(...arguments);

    document.body.classList.add("tc-right-sidebar-enabled");

    const componentsArray = JSON.parse(settings.components);
    componentsArray.forEach((el) => {
      el.classNames = `rs-component rs-${el.name}`;
      el.parsedParams = {};
      el.params.forEach((p) => {
        el.parsedParams[p.name] = p.value;
      });
    });

    this.components = componentsArray;
  }

  willDestroy() {
    document.body.classList.remove("tc-right-sidebar-enabled");
  }
}
