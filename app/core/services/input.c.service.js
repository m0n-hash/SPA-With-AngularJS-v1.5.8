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
                        result_input = general.formatString(self.input_ctn, self.input_txt);
                        result_input = general.formatString(result_input, name, extra.color, extra.icon, input, extra.attr_style, extra.model,
                            "txt" + name, extra.max_len, extra.form_err, extra.msg_exp, name);
                        break;
                    case "email":
                        result_input = general.formatString(self.input_ctn, self.input_txt);
                        result_input = general.formatString(result_input, name, extra.color, extra.icon, input, extra.attr_style, extra.model,
                            "txt" + name, extra.max_len, extra.form_err, extra.msg_exp + ",'pattern'", name);
                        break;
                        //compareTo for Msg Exp
                    case "password":
                        var ip1 = general.formatString(self.input_ctn, self.input_pwd1);
                        ip1 = general.formatString(ip1, name, extra.color, extra.icon, input, extra.attr_style, extra.model,
                            "txt" + name, extra.max_len, extra.form_err, extra.msg_exp, name);

                        var ip2 = general.formatString(self.input_ctn, self.input_pwd2);
                        ip2 = general.formatString(ip2, "Confirm " + name, extra.color, extra.icon, input, extra.attr_style, extra.model2,
                            "txtconfirm" + name, extra.model, extra.max_len, extra.form_err, extra.msg_exp, "confirm " + name)
                        console.log(ip2);
                        result_input = ip1 + ip2;
                        break;
                    case "checkbox":
                        result_input = general.formatString(self.input_ctn, self.input_chk);
                        result_input = general.formatString(result_input, name, extra.model, name);
                        break;
                    case "objectlist":
                        result_input = general.formatString(self.input_ctn, self.input_slc);
                        result_input = general.formatString(result_input, name, extra.color, extra.icon, extra.attr_style, extra.model, extra.multi,
                            extra.objs, extra.objToShow, extra.form_err, extra.msg_exp, name);
                        break;
                    case "image":
                        break;
                    case "radio":
                        break;
                    case "map":
                        break;
                    default:
                        break;
                }

                return $sce.trustAsHtml(result_input);
            };
            //Input Container
            self.input_ctn = '<md-input-container class="md-block" flex-gt-xs> {0} </md-input-container>';
            //0.label, 1.color, 2.icon, 3.input_type, 4.input_height, 5.model<rpc.customer[st.request_name]>, 6.attr_name<'txt'+st.name>, 
            //7.input_length, 8.form_error<customerForm['txt'+st.name].$error>, 9.msg_exp<'required', 'minlength', 'maxlength'>, 10, err_msg              
            self.input_txt = '<label>{0}</label>' +
                '<md-icon md-font-icon="material-icons" md-colors="{color:\'{1}\'}">{2}</md-icon>' +
                '<input ng-attr-type="{3}" ng-attr-style="{4}" ng-model="{5}" ng-attr-name="{6}" minlength="1" md-maxlength="{7}" required/>' +
                '<div ng-messages="{8}"><div ng-message-exp="[{9}]">Invalid {10}.</div></div>';
            self.input_eml = '<label>{0}</label>' +
                '<md-icon md-font-icon="material-icons" md-colors="{color:\'{1}\'}">{2}</md-icon>' +
                '<input ng-attr-type="{3}" ng-attr-style="{4}" ng-model="{5}" ng-attr-name="{6}" minlength="1" md-maxlength="{7}" required ng-pattern="/^.+@.+\..+$/>' +
                '<div ng-messages="{8}"><div ng-message-exp="[{9}]">Invalid {10}.</div></div>';

            self.input_pwd1 = '<label>{0}</label>' +
                '<md-icon md-font-icon="material-icons" md-colors="{color:\'{1}\'}">{2}</md-icon>' +
                '<input ng-attr-type="{3}" ng-attr-style="{4}" ng-model="{5}" ng-attr-name="{6}" minlength="1" md-maxlength="{7}" required/>' +
                '<div ng-messages="{8}"><div ng-message-exp="[{9}]">Invalid {10}.</div></div>';
            self.input_pwd2 = '<label>{0}</label>' +
                '<md-icon md-font-icon="material-icons" md-colors="{color:\'{1}\'}">{2}</md-icon>' +
                '<input ng-attr-type="{3}" ng-attr-style="{4}" ng-model="{5}" ng-attr-name="{6}" compare-to="{7}" minlength="1" md-maxlength="{8}" required/>' +
                '<div ng-messages="{9}"><div ng-message-exp="[{10}]">Invalid {11}.</div></div>';
            self.input_slc = '<label>{0}</label>' +
                '<md-icon md-font-icon="material-icons" md-colors="{color:\'{1}\'}">{2}</md-icon>' +
                '<md-select ng-attr-type="{3}" ng-model="{4}" {5}>' +
                '<md-option ng-value="item" ng-repeat="item in {6}">{7}</md-option></md-select>' +
                '<div ng-messages="{8}"><div ng-message-exp="[{9}]">Invalid {10}.</div></div>';
            self.input_chk = "<md-checkbox md-no-ink aria-label='{0}' ng-model='{1}' class='md-primary sd-checkbox'>" +
                "{2}</md-checkbox>";
            return self;
        }
    ]);
})();