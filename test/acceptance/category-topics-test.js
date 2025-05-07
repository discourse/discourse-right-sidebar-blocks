import { visit } from "@ember/test-helpers";
import { test } from "qunit";
import { cloneJSON } from "discourse/lib/object";
import discoveryFixture from "discourse/tests/fixtures/discovery-fixtures";
import { acceptance } from "discourse/tests/helpers/qunit-helpers";

acceptance("Right Sidebar - Category Topics", function (needs) {
  const blocksJSON = [
    {
      name: "category-topics",
      params: [{ name: "id", value: "1" }],
    },
  ];

  needs.hooks.beforeEach(function () {
    settings.blocks = JSON.stringify(blocksJSON);
  });

  needs.hooks.afterEach(function () {
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

    assert.dom(".tc-right-sidebar").exists("sidebar element is present");

    assert
      .dom(".category-topics--topic")
      .exists("at least one category topic is present");

    assert
      .dom(".rs-category-topics a[href='/c/bug/1']")
      .exists("bug category sidebar heading is present");
  });
});
