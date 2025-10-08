import { htmlSafe } from "@ember/template";

const CustomHtmlRsb = <template>{{htmlSafe @content}}</template>;

export default CustomHtmlRsb;
