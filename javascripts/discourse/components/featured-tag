import Component from "@glimmer/component"
import { ajax } from "discourse/lib/ajax"
import { tracked } from "@glimmer/tracking"

export default class FeaturedTag extends Component {
  @tracked featured = null

  constructor() {
    super(...arguments)
    const count = this.args?.params?.count || 5
    const featured = "/tag/" + this.args?.params?.tag + ".json"

    ajax("/site.json").then((data) => {
      let categories = []
      categories = data.categories
      categories = categories.sort((a, b) => {
        if (a.id < b.id) {
          return -1
        }
      })
      ajax(featured).then((data2) => {
        let results = []
        results = data2.topic_list.topics
        this.featured = results.slice(0, count)
        this.featured.forEach((topic) => {
          const id = topic.category_id - 1
          topic["category_name"] = categories[id].name
          topic["category_logo"] = categories[id].uploaded_logo
        })
      })
    })
  }

  willDestroy() {
    this.featured = null
  }
}
