import htmlSafe from "discourse/helpers/html-safe";

const CustomHtmlRsb = <template>{{htmlSafe @content}}</template>;

export default CustomHtmlRsb;
