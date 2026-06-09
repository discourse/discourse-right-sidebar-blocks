import Component from "@glimmer/component";
import { service } from "@ember/service";
import getURL from "discourse/lib/get-url";
import { i18n } from "discourse-i18n";

export default class PopularTags extends Component {
  @service site;
  @service router;

  get excludedTags() {
    if (!this.args.excludedTags) {
      return [];
    }

    if (Array.isArray(this.args.excludedTags)) {
      return this.args.excludedTags;
    }

    return this.args.excludedTags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  get topTags() {
    const tags =
      (this.args.scopeToCategory
        ? this.site.category_top_tags
        : this.site.top_tags) || [];

    let filteredTags = tags;
    if (this.excludedTags.length > 0) {
      filteredTags = tags.filter(
        (tag) => !this.excludedTags.includes(tag.name)
      );
    }

    return filteredTags.slice(0, this.args.count || 10);
  }

  tagUrl(tag) {
    if (tag.url) {
      return tag.url;
    }

    if (tag.id) {
      const slug = tag.slug || `${tag.id}-tag`;
      return getURL(`/tag/${slug}/${tag.id}`);
    }

    return getURL(`/tag/${tag.name.replaceAll(".", "%2E")}`);
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
          <a href={{this.tagUrl tag}} class="popular-tags__tag">
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
