import GlimmerComponent from "discourse/components/glimmer";
import { ajax } from "discourse/lib/ajax";
import { tracked } from "@glimmer/tracking";

export default class TopContributors extends GlimmerComponent {
  @tracked topContributors = null;

  constructor() {
    super(...arguments);

    const count = this.args?.params?.count || 5;

    ajax(`/directory_items.json?period=yearly&order=likes_received`).then(
      (data) => {
        this.topContributors = data.directory_items.slice(0, count);
      }
    );
  }

  willDestroy() {
    this.topContributors = null;
  }
}
