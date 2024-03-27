import { visit } from "@ember/test-helpers";
import { test } from "qunit";
import { acceptance, visible } from "discourse/tests/helpers/qunit-helpers";

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
  needs.hooks.beforeEach(() => {
    settings.blocks = JSON.stringify(blocksJSON);
  });

  needs.hooks.afterEach(() => {
    settings.blocks = "[]";
  });

  test("Viewing latest", async function (assert) {
    await visit("/");

    assert.ok(visible(".tc-right-sidebar"), "sidebar element is present");
    assert.ok(visible(".rs-custom-html"), "custom-html element is present");
    assert.ok(visible(".rs-custom-html b"), "custom-html bold tag is present");
  });
});
