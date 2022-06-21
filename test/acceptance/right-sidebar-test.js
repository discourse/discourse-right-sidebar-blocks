import { acceptance, visible } from "discourse/tests/helpers/qunit-helpers";
import { visit } from "@ember/test-helpers";
import { test } from "qunit";

acceptance("Right Sidebar", function () {
  test("Viewing latest", async function (assert) {
    await visit("/");

    assert.ok(visible(".tc-right-sidebar"), "sidebar element is present");
  });

  test("Viewing categories", async function (assert) {
    await visit("/categories");

    assert.notOk(
      visible(".tc-right-sidebar"),
      "sidebar not present under /categories by default"
    );
  });
});

acceptance("Right Sidebar - custom routes", function (needs) {
  needs.hooks.beforeEach(() => {
    settings.show_in_routes = "discovery.categories|discovery.top";
  });

  needs.hooks.afterEach(() => {
    settings.blocks = "[]";
  });

  test("Viewing latest", async function (assert) {
    await visit("/");

    assert.notOk(
      visible(".tc-right-sidebar"),
      "sidebar element is not present"
    );
  });

  test("Viewing categories", async function (assert) {
    await visit("/categories");

    assert.ok(
      visible(".tc-right-sidebar"),
      "sidebar present under /categories due to theme setting"
    );
  });

  test("Viewing top", async function (assert) {
    await visit("/top");

    assert.ok(
      visible(".tc-right-sidebar"),
      "sidebar present under /top due to theme setting"
    );
  });
});
