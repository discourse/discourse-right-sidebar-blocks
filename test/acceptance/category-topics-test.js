import { visit } from "@ember/test-helpers";
import { test } from "qunit";
import discoveryFixture from "discourse/tests/fixtures/discovery-fixtures";
import { acceptance, visible } from "discourse/tests/helpers/qunit-helpers";
import { cloneJSON } from "discourse-common/lib/object";

acceptance("Right Sidebar - Category Topics", function (needs) {
  const blocksJSON = [
    {
      name: "category-topics",
      params: [{ name: "id", value: "1" }],
    },
  ];

  needs.hooks.beforeEach(() => {
    settings.blocks = JSON.stringify(blocksJSON);
  });

  needs.hooks.afterEach(() => {
    settings.blocks = "[]";
  });

  needs.pretender((server, helper) => {
    server.get(`/c/1.json`, () => {
      return helper.response(
        cloneJSON(discoveryFixture["/c/bug/1/l/latest.json"])
      );
    });
  });

  test("Viewing homepage", async function (assert) {
    await visit("/");

    assert.ok(visible(".tc-right-sidebar"), "sidebar element is present");

    assert.ok(
      visible(".category-topics--topic"),
      "at least one category topic is present"
    );

    assert.ok(
      visible(".rs-category-topics a[href='/c/bug/1']"),
      "bug category sidebar heading is present"
    );
  });
});
