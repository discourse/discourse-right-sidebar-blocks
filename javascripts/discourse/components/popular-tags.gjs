import Component from "@glimmer/component";
import { service } from "@ember/service";
import { i18n } from "discourse-i18n";

export default class PopularTags extends Component {
  @service site;
  @service router;

  get topTags() {
    const excludedTags = this.args.excludedTags || [];
    const tags =
      (this.args.scopeToCategory
        ? this.site.categoryTopTags
        : this.site.topTags) || [];

    let filteredTags = tags;
    if (excludedTags.length > 0) {
      filteredTags = tags.filter((tag) => !excludedTags.includes(tag.name));
    }

    return filteredTags.slice(0, this.args.count || 10);
  }

  get shouldShowBlock() {
    if (this.topTags.length === 0) {
      return false;
    }

    if (this.args.displayInSpecificCategories === undefined) {
      return true;
    }

    return this.args.displayInSpecificCategories
      ?.split(",")
      .map(Number)
      .includes(this.router.currentRoute.attributes?.category?.id);
  }

  <template>
    {{#if this.shouldShowBlock}}
      <h3 class="popular-tags-heading">
        {{i18n (themePrefix "popular_tags.heading")}}
      </h3>

      <div class="popular-tags__container">
        {{#each this.topTags as |tag|}}
          <a href={{tag.url}} class="popular-tags__tag">
            {{tag.name}}
          </a>
        {{/each}}
      </div>

      <a href="/tags" class="popular-tags__view-all">
        {{i18n (themePrefix "popular_tags.view_all")}}
      </a>
    {{/if}}
  </template>
}
