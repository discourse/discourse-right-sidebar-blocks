import { visit } from "@ember/test-helpers";
import { test } from "qunit";
import discoveryFixture from "discourse/tests/fixtures/discovery-fixtures";
import { acceptance, visible } from "discourse/tests/helpers/qunit-helpers";
import { cloneJSON } from "discourse-common/lib/object";

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
  needs.settings({ tagging_enabled: true });

  needs.hooks.beforeEach(() => {
    settings.show_in_routes =
      "discovery.categories|discovery.top|c/bug|c/bug/foo|tag/important";
  });

  needs.hooks.afterEach(() => {
    settings.blocks = "[]";
  });

  needs.site({
    categories: [
      {
        id: 1,
        name: "bug",
        slug: "bug",
      },
      {
        id: 2,
        name: "foo",
        slug: "foo",
        parent_category_id: 1,
      },
    ],
  });

  needs.pretender((server, helper) => {
    server.get(`/c/bug/1/l/latest.json`, () => {
      return helper.response(
        cloneJSON(discoveryFixture["/c/bug/1/l/latest.json"])
      );
    });

    server.get(`/c/bug/foo/2/l/latest.json`, () => {
      return helper.response(
        cloneJSON(discoveryFixture["/c/bug/1/l/latest.json"])
      );
    });

    server.get(`/tag/important/l/latest.json`, () => {
      return helper.response(
        cloneJSON(discoveryFixture["/tag/important/l/latest.json"])
      );
    });
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

  test("Viewing the bug category", async function (assert) {
    await visit("/c/bug/l/latest");
    assert.ok(
      visible(".tc-right-sidebar"),
      "sidebar present under the bug category"
    );
  });

  test("Viewing the foo subcategory", async function (assert) {
    await visit("/c/bug/foo/2");

    assert.ok(
      visible(".tc-right-sidebar"),
      "sidebar present under the foo subcategory"
    );
  });

  test("Viewing the important tag", async function (assert) {
    await visit("/tag/important");

    assert.ok(
      visible(".tc-right-sidebar"),
      "sidebar present under the important tag"
    );
  });
});
