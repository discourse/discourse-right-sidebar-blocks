# frozen_string_literal: true

module PageObjects
  module Components
    class PopularTags < PageObjects::Components::Base
      SELECTOR = ".popular-tags__container"

      def has_tag_item?(tag)
        has_css?("#{SELECTOR} .popular-tags__tag[href='#{tag.url}']", text: tag.name)
      end

      def has_no_tag_item?(tag)
        has_no_css?("#{SELECTOR} .popular-tags__tag", text: tag.name)
      end
    end
  end
end
