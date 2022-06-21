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
