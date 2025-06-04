import htmlSafe from "discourse/helpers/html-safe";

const CustomHtmlRsb = <template>{{htmlSafe @params.content}}</template>;

export default CustomHtmlRsb;
