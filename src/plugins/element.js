import Vue from "vue";
import { 
    Button, 
    Loading,
    Message,
    Select,
    Option,
    Divider,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Form,
    FormItem,
    Input
} from "element-ui";

Vue.use(Button)
    .use(Select)
    .use(Option)
    .use(Divider)
    .use(Dropdown)
    .use(DropdownItem)
    .use(DropdownMenu)
    .use(Form)
    .use(FormItem)
    .use(Input)
    .use(Loading.directive);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$message=Message