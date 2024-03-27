import { visit } from "@ember/test-helpers";
import { test } from "qunit";
import { acceptance, visible } from "discourse/tests/helpers/qunit-helpers";

acceptance("Right Sidebar - Subcategory List", function (needs) {
  const blocksJSON = [
    {
      name: "subcategory-list",
    },
  ];
  needs.hooks.beforeEach(() => {
    settings.blocks = JSON.stringify(blocksJSON);
  });

  needs.hooks.afterEach(() => {
    settings.blocks = "[]";
  });

  test("Viewing a category with subcategories", async function (assert) {
    // dev category in core fixtures has subcategories
    await visit("/c/dev");

    assert.ok(visible(".tc-right-sidebar"), "sidebar element is present");
    assert.ok(
      visible(".subcategory-list--heading"),
      "subcategory-list heading is present"
    );
    assert.ok(
      visible(".subcategory-list--item"),
      "subcategory-list has at least one visible item"
    );
  });

  test("Viewing a tag route works fine", async function (assert) {
    await visit("/tag/important");

    // just check that no errors are raised in other routes
    assert.ok(visible(".topic-list-body"), "main topic list is present");
  });
});
