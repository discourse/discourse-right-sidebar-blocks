import SignupCta from "discourse/components/signup-cta";
import { withPluginApi } from "discourse/lib/plugin-api";
import { applyValueTransformer } from "discourse/lib/transformer";
import CategoryList from "../components/category-list";
import CategoryTopics from "../components/category-topics";
import CustomHtmlRsb from "../components/custom-html-rsb";
import PopularTags from "../components/popular-tags";
import RecentReplies from "../components/recent-replies";
import SubcategoryList from "../components/subcategory-list";
import TopContributors from "../components/top-contributors";

const TRANSFORMER_NAME = "right-sidebar-blocks";

const DefaultBlocks = new Map();
DefaultBlocks.set("popular-tags", PopularTags);
DefaultBlocks.set("top-contributers", TopContributors);
DefaultBlocks.set("recent-replies", RecentReplies);
DefaultBlocks.set("category-topics", CategoryTopics);
DefaultBlocks.set("custom-html", CustomHtmlRsb);
DefaultBlocks.set("category-list", CategoryList);
DefaultBlocks.set("subcategory-list", SubcategoryList);
DefaultBlocks.set("signup-cta", SignupCta);

export function getAvailableBlocks() {
  const results = new Map(DefaultBlocks);
  return applyValueTransformer(TRANSFORMER_NAME, results, null, {
    mutable: true,
  });
}

export default {
  before: "freeze-valid-transformers",
  initialize() {
    withPluginApi((api) => api.addValueTransformerName(TRANSFORMER_NAME));
  },
};
