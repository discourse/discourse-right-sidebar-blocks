import { visit } from "@ember/test-helpers";
import { test } from "qunit";
import { cloneJSON } from "discourse/lib/object";
import discoveryFixture from "discourse/tests/fixtures/discovery-fixtures";
import { acceptance } from "discourse/tests/helpers/qunit-helpers";

acceptance("Right Sidebar", function () {
  test("Viewing latest", async function (assert) {
    await visit("/");
    assert.dom(".tc-right-sidebar").exists("sidebar element is present");
  });

  test("Viewing categories", async function (assert) {
    await visit("/categories");

    assert
      .dom(".tc-right-sidebar")
      .doesNotExist("sidebar not present under /categories by default");
  });
});

acceptance("Right Sidebar - custom routes", function (needs) {
  needs.settings({ tagging_enabled: true });

  needs.hooks.beforeEach(function () {
    settings.show_in_routes =
      "discovery.categories|discovery.top|c/bug|c/bug/foo|tag/important";
  });

  needs.hooks.afterEach(function () {
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

    assert.dom(".tc-right-sidebar").doesNotExist();
  });

  test("Viewing categories", async function (assert) {
    await visit("/categories");

    assert
      .dom(".tc-right-sidebar")
      .exists("sidebar present under /categories due to theme setting");
  });

  test("Viewing top", async function (assert) {
    await visit("/top");
    assert
      .dom(".tc-right-sidebar")
      .exists("sidebar present under /top due to theme setting");
  });

  test("Viewing the bug category", async function (assert) {
    await visit("/c/bug/l/latest");
    assert
      .dom(".tc-right-sidebar")
      .exists("sidebar present under the bug category");
  });

  test("Viewing the foo subcategory", async function (assert) {
    await visit("/c/bug/foo/2");

    assert
      .dom(".tc-right-sidebar")
      .exists("sidebar present under the foo subcategory");
  });

  test("Viewing the important tag", async function (assert) {
    await visit("/tag/important");

    assert
      .dom(".tc-right-sidebar")
      .exists("sidebar present under the important tag");
  });
});
