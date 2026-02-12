import { visit } from "@ember/test-helpers";
import { test } from "qunit";
import { cloneJSON } from "discourse/lib/object";
import discoveryFixture from "discourse/tests/fixtures/discovery-fixtures";
import { acceptance } from "discourse/tests/helpers/qunit-helpers";

acceptance("Right Sidebar - Subcategory List", function (needs) {
  needs.pretender((server, helper) => {
    server.get("/tag/1/l/latest.json", () =>
      helper.response(
        cloneJSON(discoveryFixture["/tag/important/l/latest.json"])
      )
    );
  });
  const blocksJSON = [
    {
      name: "subcategory-list",
    },
  ];
  needs.hooks.beforeEach(function () {
    settings.blocks = JSON.stringify(blocksJSON);
  });

  needs.hooks.afterEach(function () {
    settings.blocks = "[]";
  });

  test("Viewing a category with subcategories", async function (assert) {
    // dev category in core fixtures has subcategories
    await visit("/c/dev");

    assert.dom(".tc-right-sidebar").exists("sidebar element is present");
    assert
      .dom(".subcategory-list--heading")
      .exists("subcategory-list heading is present");
    assert
      .dom(".subcategory-list--item")
      .exists("subcategory-list has at least one visible item");
  });

  test("Viewing a tag route works fine", async function (assert) {
    await visit("/tag/important/1");

    // just check that no errors are raised in other routes
    assert.dom(".topic-list-body").exists("main topic list is present");
  });
});
