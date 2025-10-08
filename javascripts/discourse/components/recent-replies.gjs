import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { concat } from "@ember/helper";
import { htmlSafe } from "@ember/template";
import avatar from "discourse/helpers/avatar";
import formatDate from "discourse/helpers/format-date";
import replaceEmoji from "discourse/helpers/replace-emoji";
import { ajax } from "discourse/lib/ajax";
import { i18n } from "discourse-i18n";

function stripHtml(html) {
  let doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

export default class RecentReplies extends Component {
  @tracked replies = null;

  constructor() {
    super(...arguments);
    const excerptLimit = this.args.excerptLimit || 150;
    const count = this.args.count || 5;

    ajax(`/posts.json`).then((data) => {
      let results = [];
      // TODO: would be good to add these params to the endpoint in core
      // post_type and exclude_ops

      // limit to regular posts
      results = data.latest_posts.filter((post) => post.post_type === 1);
      // exclude OPs
      results = results.filter((post) => post.post_number !== 1);

      results.forEach((reply) => {
        reply.excerpt = stripHtml(reply.cooked);

        if (reply.excerpt.length > excerptLimit) {
          reply.excerpt =
            reply.excerpt.substring(0, excerptLimit).trim(this) + "...";
        }
      });
      this.replies = results.slice(0, count);
    });
  }

  willDestroy() {
    super.willDestroy(...arguments);
    this.replies = null;
  }

  <template>
    <h3 class="recent-replies--heading">
      {{i18n (themePrefix "recent_replies.heading")}}
    </h3>

    <div class="recent-replies--container">
      {{#each this.replies as |reply|}}
        <div class="recent-replies--reply">
          <div class="recent-replies--col">
            {{avatar reply imageSize="small"}}
          </div>
          <div class="recent-replies--col">
            <div class="recent-replies--excerpt">
              {{reply.excerpt}}
            </div>
            <div class="recent-replies--topic-title">
              <a
                class="recent-replies--topic-link"
                href={{concat
                  "/t/"
                  reply.topic_slug
                  "/"
                  reply.topic_id
                  "/"
                  reply.post_number
                }}
              >
                {{htmlSafe (replaceEmoji reply.topic_title)}}
              </a>
            </div>
          </div>
          <div class="recent-replies--col">
            <span class="recent-replies--date">
              {{formatDate reply.created_at format="tiny"}}
            </span>
          </div>
        </div>
      {{/each}}
    </div>
  </template>
}
