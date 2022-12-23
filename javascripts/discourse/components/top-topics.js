import Component from "@glimmer/component"
import { ajax } from "discourse/lib/ajax"
import { tracked } from "@glimmer/tracking"

export default class TopTopics extends Component {
  @tracked toptopics = null

  constructor() {
    super(...arguments)
    const count = this.args?.params?.count || 5
    const period = this.args?.params?.period || "weekly"
    const topjson = "/top.json?period=" + period.toString()

    ajax("/site.json").then((data) => {
      let categories = []
      categories = data.categories
      categories = categories.sort((a, b) => {
        if (a.id < b.id) {
          return -1
        }
      })
      ajax(topjson).then((data2) => {
        let results = []
        results = data2.topic_list.topics
        this.toptopics = results.slice(0, count)
        this.toptopics.forEach((topic) => {
          const id = topic.category_id - 1
          topic["category_name"] = categories[id].name
          topic["category_logo"] = categories[id].uploaded_logo
        })
      })
    })
  }

  willDestroy() {
    this.toptopics = null
  }
}
