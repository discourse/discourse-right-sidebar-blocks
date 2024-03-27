import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { ajax } from "discourse/lib/ajax";

function stripHtml(html) {
  let doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

export default class RecentReplies extends Component {
  @tracked replies = null;

  constructor() {
    super(...arguments);
    const excerptLimit = this.args?.params?.excerptLimit || 150;
    const count = this.args?.params?.count || 5;

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
}
