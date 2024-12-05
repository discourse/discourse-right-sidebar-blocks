# Right Sidebar Blocks

Adds ability to display a right-sided sidebar to topic list routes. There are two settings included:

- `blocks`: choose the blocks to display and adjust their ordering
- `show_in_routes`: decide which routes to display the sidebar (by default, it will show on all lists except for `/categories`)

### Included blocks

This theme component includes a few blocks you can use in your sidebar:

- popular-tags
- top-contributors
- recent-replies
- category-topics
- custom-html
- subcategory-list
- tag-topics
- top-topics
- category-list

You can also use other Ember components as blocks, you just need to use the correct name. For example, core includes a `signup-cta` Ember component, and you can use it in the sidebar as is. (Note that you can't use components that expect a set of parameters.)

### Available block parameters

You can control some features for the provided blocks via parameters.

| name                        | description                           | default        | value                                            | available for                    |
|-----------------------------|---------------------------------------|----------------| ------------------------------------------------ |----------------------------------|
| count                       | limits number of results              | varies         | number                                           | all except custom-html           |
| excerptLimit                | limits length of each reply excerpt   | 150            | number                                           | recent-replies                   |
| id                          | category id                           |                | category id (category-list uses comma-separated) | category-topics, category-list   |
| content                     | contents to display                   |                | html                                             | custom-html                      |
| scopeToCategory             | only shows in category X              |                | category id                                      | popular-tags                     |
| excludedTags                | list of excluded tags                 |                | tagnames                                         | popular-tags                     |
| displayInSpecificCategories | list of categories to show the widget | all            | comma-separated numbers                          | popular-tags                     |
| id                          | leaderboard id                        |                | number                                           | minimal-gamification-leaderboard |
| tag                         | which tag to display                  |                | tag id                                           | tag-topics                       |
| period                      | time period of top topics             | weekly         | all, yearly, quarterly, monthly, weekly, daily   | top-topics                       |
| title                       | title of the block                    | varies         | string                                           | tag-topics, category-list        |
| excludedGroupNames          | Excludes specified groups             |            | Group names                                      | top-contributors                 |
| order                       | Orders the contributors               | likes_received | String (likes_received or likes_given)       | top-contributors                 |
| period                      | Time period for top contributors      | yearly         | all, yearly, quarterly, monthly, weekly, daily   | top-contributors                 |

### Blocks from other plugins

The Discourse Calendar plugin comes with a block called `upcoming-events-list` that you can use in conjunction with this component. The plugin will need to be installed to access it.
