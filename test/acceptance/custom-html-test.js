import { visit } from "@ember/test-helpers";
import { test } from "qunit";
import { acceptance } from "discourse/tests/helpers/qunit-helpers";

acceptance("Right Sidebar - Top Contributors", function (needs) {
  const blocksJSON = [
    {
      name: "custom-html",
      params: [
        {
          name: "content",
          value: "This is <b>bold</b>",
        },
      ],
    },
  ];
  needs.hooks.beforeEach(function () {
    settings.blocks = JSON.stringify(blocksJSON);
  });

  needs.hooks.afterEach(function () {
    settings.blocks = "[]";
  });

  test("Viewing latest", async function (assert) {
    await visit("/");

    assert.dom(".tc-right-sidebar").exists("sidebar element is present");
    assert.dom(".rs-custom-html").exists("custom-html element is present");
    assert.dom(".rs-custom-html b").exists("custom-html bold tag is present");
  });
});
