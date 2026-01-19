# frozen_string_literal: true

require_relative "page_objects/components/popular_tags"

RSpec.describe "Sidebar blocks", system: true do
  let!(:theme) { upload_theme_component }

  fab!(:user)

  before { sign_in(user) }

  describe "popular-tags block" do
    let(:popular_tags) { PageObjects::Components::PopularTags.new }

    fab!(:tag1) { Fabricate(:tag, name: "ruby") }
    fab!(:tag2) { Fabricate(:tag, name: "javascript") }
    fab!(:topic1) { Fabricate(:topic, tags: [tag1]) }
    fab!(:topic2) { Fabricate(:topic, tags: [tag2]) }

    before do
      SiteSetting.tagging_enabled = true

      theme.update_setting(:blocks, "[{\"name\":\"popular-tags\"}]")
      theme.save!
    end

    it "displays popular tags with correct links" do
      visit("/latest")

      expect(popular_tags).to have_tag_item(tag1)
      expect(popular_tags).to have_tag_item(tag2)
    end

    it "does not display tags configured as excluded in theme settings" do
      theme.update_setting(
        :blocks,
        "[{\"name\":\"popular-tags\",\"params\":[{\"name\":\"excludedTags\",\"value\":\"#{tag1.name}\"}]}]",
      )
      theme.save!

      visit("/latest")

      expect(popular_tags).to have_no_tag_item(tag1)
      expect(popular_tags).to have_tag_item(tag2)
    end
  end
end
