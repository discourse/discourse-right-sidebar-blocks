import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { inject as service } from "@ember/service";

export default class PopularTags extends Component {
  @service site;
  @tracked topTags = null;

  constructor() {
    super(...arguments);
    const count = this.args?.params?.count || 10;
    this.topTags = (this.site.get("top_tags") || []).slice(0, count);
  }

  willDestroy() {
    this.topTags = null;
  }
}
