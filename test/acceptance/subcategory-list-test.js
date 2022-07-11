import { acceptance, visible } from "discourse/tests/helpers/qunit-helpers";
import { visit } from "@ember/test-helpers";
import { test } from "qunit";

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
});
