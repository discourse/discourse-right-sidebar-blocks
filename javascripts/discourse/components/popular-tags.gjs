import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { service } from "@ember/service";
import { i18n } from "discourse-i18n";

export default class PopularTags extends Component {
  @service site;
  @service router;

  @tracked topTags = null;

  willDestroy() {
    super.willDestroy(...arguments);
    this.topTags = null;
  }

  get shouldShowBlock() {
    const currentRoute = this.router.currentRoute;
    const count = this.args.count || 10;
    const excludedTags = this.args.excludedTags || [];
    const scopeToCategory = this.args.scopeToCategory || false;
    const tags =
      (scopeToCategory ? this.site.category_top_tags : this.site.top_tags) ||
      [];
    const category = currentRoute.attributes?.category;

    if (excludedTags.length !== 0) {
      this.topTags = tags
        .filter((tag) => {
          return excludedTags.indexOf(tag) === -1;
        })
        .slice(0, count);
    } else {
      this.topTags = (tags || []).slice(0, count);
    }

    if (this.topTags.length === 0) {
      return false;
    } else if (!this.shouldDisplay(category?.id)) {
      return false;
    } else {
      return true;
    }
  }

  get viewAllUrl() {
    return `/tags`;
  }

  shouldDisplay(categoryId) {
    const displayInSpecificCategories = this.args.displayInSpecificCategories
      ?.split(",")
      .map(Number);

    return (
      displayInSpecificCategories === undefined ||
      displayInSpecificCategories.includes(categoryId)
    );
  }

  <template>
    {{#if this.shouldShowBlock}}
      <h3 class="popular-tags-heading">
        {{i18n (themePrefix "popular_tags.heading")}}
      </h3>

      <div class="popular-tags__container">
        {{#each this.topTags as |t|}}
          <a href="/tag/{{t}}" class="popular-tags__tag">
            {{t}}
          </a>
        {{/each}}
      </div>

      <a class="popular-tags__view-all" href={{this.viewAllUrl}}>
        {{i18n (themePrefix "popular_tags.view_all")}}
      </a>
    {{/if}}
  </template>
}
