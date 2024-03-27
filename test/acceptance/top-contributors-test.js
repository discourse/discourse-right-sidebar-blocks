import { visit } from "@ember/test-helpers";
import { test } from "qunit";
import DirectoryFixtures from "discourse/tests/fixtures/directory-fixtures";
import {
  acceptance,
  queryAll,
  visible,
} from "discourse/tests/helpers/qunit-helpers";

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

    assert
      .dom(".top-contributors--user-likes")
      .doesNotHaveClass("order--likes_given");
    assert
      .dom(".top-contributors--user-likes")
      .hasClass("order--likes_received");

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

acceptance(
  "Right Sidebar - Top Contributors - Custom order, group exclusion and period",
  function (needs) {
    const blocksJSON = [
      {
        name: "top-contributors",
        params: [
          {
            name: "count",
            value: "3",
          },
          {
            name: "order",
            value: "likes_given",
          },
          {
            name: "period",
            value: "weekly",
          },
          {
            name: "excludedGroupNames",
            value: "Team|contributors",
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
      server.get("/directory_items.json", (request) => {
        if (
          request.queryParams.period === "weekly" &&
          request.queryParams.order === "likes_given" &&
          request.queryParams.exclude_groups === "Team|contributors" &&
          request.queryParams.limit === "3"
        ) {
          return helper.response(DirectoryFixtures["directory_items"]);
        }

        return helper.response(400, {}, { error: "Bad Request" });
      });
    });

    test("Viewing latest", async function (assert) {
      await visit("/");

      assert
        .dom(".top-contributors--user-likes")
        .hasClass("order--likes_given");
      assert
        .dom(".top-contributors--user-likes")
        .doesNotHaveClass("order--likes_received");

      assert.dom(".tc-right-sidebar").isVisible("sidebar element is present");
      assert
        .dom(".top-contributors--container")
        .isVisible("top contributors element is present");

      assert
        .dom(".top-contributors--user")
        .exists({ count: 3 }, "custom limit is respected");

      assert
        .dom(".top-contributors--view-all")
        .hasAttribute(
          "href",
          "/u?order=likes_given&period=weekly&exclude_groups=Team|contributors"
        );
    });
  }
);
