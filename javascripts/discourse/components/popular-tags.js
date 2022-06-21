import GlimmerComponent from "discourse/components/glimmer";
import { getOwner } from "discourse-common/lib/get-owner";
import { tracked } from "@glimmer/tracking";

export default class PopularTags extends GlimmerComponent {
  @tracked topTags = null;

  constructor() {
    super(...arguments);
    const count = this.args?.params?.count || 10;
    const tagController = getOwner(this).lookup("controller:discovery/topics");
    console.log(tagController);

    this.topTags = (tagController.get("model.topic_list.top_tags") || []).slice(
      0,
      count
    );
  }

  willDestroy() {
    this.topTags = null;
  }
}
