import {
  acceptance,
  queryAll,
  visible,
} from "discourse/tests/helpers/qunit-helpers";
import { visit } from "@ember/test-helpers";
import { test } from "qunit";
import DirectoryFixtures from "discourse/tests/fixtures/directory-fixtures";

acceptance("Right Sidebar - Top Contributors", function (needs) {
  const blocksJSON = [
    {
      name: "top-contributors",
    },
  ];
  needs.hooks.beforeEach(() => {
    settings.blocks = JSON.stringify(blocksJSON);
  });

  needs.hooks.afterEach(() => {
    settings.blocks = "[]";
  });

  needs.pretender((server, helper) => {
    server.get("/directory_items.json", () => {
      return helper.response(DirectoryFixtures["directory_items"]);
    });
  });

  test("Viewing latest", async function (assert) {
    await visit("/");

    assert.ok(visible(".tc-right-sidebar"), "sidebar element is present");
    assert.ok(
      visible(".top-contributors--container"),
      "top contributors element is present"
    );

    assert.strictEqual(
      queryAll(".top-contributors--user").length,
      5,
      "default limit is 5"
    );
  });
});

acceptance("Right Sidebar - Top Contributors - Custom count", function (needs) {
  const blocksJSON = [
    {
      name: "top-contributors",
      params: [
        {
          name: "count",
          value: "3",
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

  needs.pretender((server, helper) => {
    server.get("/directory_items.json", () => {
      return helper.response(DirectoryFixtures["directory_items"]);
    });
  });

  test("Viewing latest", async function (assert) {
    await visit("/");

    assert.ok(visible(".tc-right-sidebar"), "sidebar element is present");
    assert.ok(
      visible(".top-contributors--container"),
      "top contributors element is present"
    );

    assert.strictEqual(
      queryAll(".top-contributors--user").length,
      3,
      "custom limit is respected"
    );
  });
});
