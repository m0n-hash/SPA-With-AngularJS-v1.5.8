(function () {
    'use strict';

    angular.module('common.services').factory('inputc', ['$window', 'general', '$sce',
        function ($window, general, $sce) {
            var self = this;

            /*Return Input HTML string according to input
            TODO: Add new possible Input HTML That will be required to generate*/
            self.whInput = function (name, input, extra) {
                var result_input;
                switch (input) {
                    case "text":
                        result_input = general.formatString(self.input_ctn, "", self.input_txt);
                        result_input = general.formatString(result_input, name, extra.color, extra.icon, input, extra.attr_style, extra.model,
                            "ip" + name, extra.max_len, extra.form_err, extra.msg_exp, name);
                        break;
                    case "email":
                        result_input = general.formatString(self.input_ctn, "", self.input_txt);
                        result_input = general.formatString(result_input, name, extra.color, extra.icon, input, extra.attr_style, extra.model,
                            "ip" + name, extra.max_len, extra.form_err, extra.msg_exp + ",'pattern'", name);
                        break;
                        //compareTo for Msg Exp
                    case "password":
                        var ip1 = general.formatString(self.input_ctn, "", self.input_pwd1);
                        ip1 = general.formatString(ip1, name, extra.color, extra.icon, input, extra.attr_style, extra.model,
                            "ip" + name, extra.max_len, extra.form_err, extra.msg_exp, name);

                        var ip2 = general.formatString(self.input_ctn, "", self.input_pwd2);
                        ip2 = general.formatString(ip2, "Confirm " + name, extra.color, extra.icon2, input, extra.attr_style, extra.model2,
                            "ipconfirm" + name, extra.model, extra.max_len, extra.form_err2, extra.msg_exp + ",'compareTo'", "confirm " + name);

                        result_input = "<div>" + ip1 + "</div><div style='padding-top:3px'>" + ip2 + "</div>";
                        break;
                    case "checkbox":
                        result_input = general.formatString(self.input_ctn, "padding-left:35px", self.input_chk);
                        result_input = general.formatString(result_input, name, extra.model, name);
                        break;
                    case "objectlist":
                        result_input = general.formatString(self.input_ctn, "", self.input_select);
                        result_input = general.formatString(result_input, name, extra.color, extra.icon, extra.model, extra.onClose,
                            extra.searchModel, name, name, extra.list, extra.searchModel);
                        /*
                        result_input = general.formatString(self.input_ctn, "", self.input_slc);
                        result_input = general.formatString(result_input, name, extra.color, extra.icon, extra.attr_style, extra.model, extra.multi,
                            extra.objs, extra.objToShow, extra.form_err, extra.msg_exp, name);
                            */
                        break;
                    case "image":
                        result_input = general.formatString(self.input_ctn, "padding-left:20px", self.input_img);
                        result_input = general.formatString(result_input, extra.model, extra.reload, extra.refresh);
                        break;
                    case "radio":
                        break;
                    case "map":
                        break;
                    default:
                        break;
                }
                //TODO: $sce.trustAsHtml(result_input); 
                return result_input;
            };

            self.icons = [{
                    key: "name",
                    data: {
                        icon: 'person',
                        color: 'green-A700',
                    }
                },
                {
                    key: "email",
                    data: {
                        icon: 'email',
                        color: 'pink-A700'
                    }
                },
                {
                    key: "phone",
                    data: {
                        icon: 'phone',
                        color: 'indigo-800'
                    }
                },
                {
                    key: "company",
                    data: {
                        icon: 'business',
                        color: 'yellow-A700'
                    }
                },
                {
                    key: "bank",
                    data: {
                        icon: 'credit_card',
                        color: 'purple-800'
                    }
                },
                {
                    key: "address",
                    data: {
                        icon: 'streetview',
                        color: 'cyan-800'
                    }
                },
                {
                    key: "city",
                    data: {
                        icon: 'location_city',
                        color: 'red-600'
                    }
                },
                {
                    key: "country",
                    data: {
                        icon: 'public',
                        color: 'light-green-A700'
                    }
                },
                {
                    key: "remark",
                    data: {
                        icon: 'speaker_notes',
                        color: 'orange-400'
                    }
                },
                {
                    key: "date",
                    data: {
                        icon: 'date_range',
                        color: 'brown-600'
                    }
                },
                {
                    key: "password",
                    data: {
                        icon: 'vpn_key',
                        icon2: 'done_all',
                        color: 'blue-grey-800'
                    }
                },
                {
                    key: 'roles',
                    data: {
                        icon: 'equalizer',
                        color: 'deep-orange-800'
                    }
                }
            ];

            self.whIcon = function (name) {
                var result = null;
                angular.forEach(self.icons, function (data, key) {
                    if (name.toLowerCase().includes(data.key.toLowerCase())) {
                        result = data;
                    }
                });

                if (result)
                    return result;
                else
                    //Return Default Error icon if not set up!
                    return {
                        key: "ufo",
                        data: {
                            icon: "error",
                            color: "red-900"
                        }
                    };
            };

            //Input Container
            self.input_ctn = '<md-input-container class="md-block" style="{0}" flex-gt-xs> {1} </md-input-container>';
            //0.label, 1.color, 2.icon, 3.input_type, 4.input_height, 5.model<rpc.customer[st.request_name]>, 6.attr_name<'txt'+st.name>, 
            //7.input_length, 8.form_error<customerForm['txt'+st.name].$error>, 9.msg_exp<'required', 'minlength', 'maxlength'>, 10, err_msg              
            self.input_txt = '<label>{0}</label>' +
                '<md-icon md-font-icon="material-icons" md-colors="{color:\'{1}\'}">{2}</md-icon>' +
                '<input type="{3}" ng-attr-style="{4}" ng-model="{5}" ng-attr-name="{6}" minlength="1" md-maxlength="{7}" required/>' +
                '<div ng-messages="{8}"><div ng-message-exp="[{9}]">Invalid {10}.</div></div>';
            self.input_eml = '<label>{0}</label>' +
                '<md-icon md-font-icon="material-icons" md-colors="{color:\'{1}\'}">{2}</md-icon>' +
                '<input type="{3}" ng-attr-style="{4}" ng-model="{5}" ng-attr-name="{6}" minlength="1" md-maxlength="{7}" required ng-pattern="/^.+@.+\..+$/>' +
                '<div ng-messages="{8}"><div ng-message-exp="[{9}]">Invalid {10}.</div></div>';

            self.input_pwd1 = '<label>{0}</label>' +
                '<md-icon md-font-icon="material-icons" md-colors="{color:\'{1}\'}">{2}</md-icon>' +
                '<input type="{3}" ng-attr-style="{4}" ng-model="{5}" ng-attr-name="{6}" minlength="1" md-maxlength="{7}" required/>' +
                '<div ng-messages="{8}"><div ng-message-exp="[{9}]">Invalid {10}.</div></div>';
            self.input_pwd2 = '<label>{0}</label>' +
                '<md-icon md-font-icon="material-icons" md-colors="{color:\'{1}\'}">{2}</md-icon>' +
                '<input type="{3}" ng-attr-style="{4}" ng-model="{5}" ng-attr-name="{6}" compare-to="{7}" minlength="1" md-maxlength="{8}" required/>' +
                '<div ng-messages="{9}"><div ng-message-exp="[{10}]">Invalid {11}.</div></div>';
            self.input_slc = '<label>{0}</label>' +
                '<md-icon md-font-icon="material-icons" md-colors="{color:\'{1}\'}">{2}</md-icon>' +
                '<md-select type="{3}" ng-model="{4}" {5}>' +
                '<md-option ng-value="item" ng-repeat="item in {6}">{7}</md-option></md-select>' +
                '<div ng-messages="{8}"><div ng-message-exp="[{9}]">Invalid {10}.</div></div>';
            self.input_chk = "<md-checkbox md-no-ink aria-label='{0}' ng-model='{1}' class='md-primary sd-checkbox'>" +
                "{2}</md-checkbox>";
            self.input_img = "<sd-img img-model='{0}' p-load='{1}' p-load-img='{2}'></sd-img>";
            self.input_select = '<label>{0}</label>' +
                '<md-icon md-font-icon="material-icons" md-colors="{color:\'{1}\'}">{2}</md-icon>' +
                '<md-select ng-model="{3}" md-on-close="{4}" data-md-container-class="SelectHeader" multiple>' +
                '<md-select-header class="select-header">' +
                '<input ng-keydown="$event.stopPropagation()" ng-model="{5}" type="search" placeholder="Search for a {6}.." class="header-searchbox md-text">' +
                '</md-select-header>' +
                '<md-optgroup label="{7}">' +
                '<md-option ng-value="role" ng-repeat="role in {8} |filter:{9}">{{role.name}} ({{role.description}})</md-option>' +
                '</md-optgroup>' +
                '</md-select>';
            return self;
        }
    ]);
})();