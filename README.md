# Right Sidebar Blocks

Adds ability to display a right-sided sidebar to topic list routes. There are two settings included:

- `blocks`: choose the blocks to display and adjust their ordering
- `show_in_routes`: decide which routes to display the sidebar (by default, it will show on all discovery routes except for `/categories`)

### Included blocks

This theme component includes a few blocks you can use in your sidebar:

- popular-tags
- top-contributors
- recent-replies
- category-topics
- custom-html

You can also use other Ember components as blocks, you just need to use the correct name. For example, core includes a `signup-cta` Ember component, and you can use it in the sidebar as is. (Note that you can't use components that expects a set of parameters.)

### Available block parameters

You can control some features for the provided blocks via parameters.

| name         | description                         | default | available for                                                            |
| ------------ | ----------------------------------- | ------- | ------------------------------------------------------------------------ |
| count        | limits number of results            | varies  | popular-tags<br/>category-topics<br/>recent-replies<br/>top-contributors |
| excerptLimit | limits length of each reply excerpt | 150     | recent-replies                                                           |
| id           | category id                         |         | category-topics                                                          |
