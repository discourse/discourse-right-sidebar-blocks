import GlimmerComponent from "discourse/components/glimmer";
import { ajax } from "discourse/lib/ajax";
import { tracked } from "@glimmer/tracking";

export default class TopContributors extends GlimmerComponent {
  @tracked topContributors = null;

  constructor() {
    super(...arguments);

    ajax(`/directory_items.json?period=yearly&order=likes_received`).then(
      (data) => {
        this.topContributors = data.directory_items.slice(1, 6);
      }
    );
  }

  willDestroy() {
    this.topContributors = null;
  }
}
