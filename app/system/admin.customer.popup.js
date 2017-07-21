angular.module('SundewApp.Controllers').controller('CustomerPopupCtrl', [
    '$scope', '$mdDialog', 'structure', 'status', 'event', 'customer', 'store', 'general', 'progress', 'http', 'config',
    function ($scope, $mdDialog, structure, status, event, customer, store, general, progress, http, config) {
        var self = this;
        self.structure = structure;
        self.status = status;
        self.event = event;
        self.title = "";
        self.customer = customer;

        self.icons = [{}, {
            icon: 'perm_identity',
            color: 'green-A700',
        }, {
            icon: 'email',
            color: 'pink-A700'
        }, {
            icon: 'phone',
            color: 'indigo-800'
        }, {
            icon: 'business',
            color: 'yellow-A700'
        }, {
            icon: 'credit_card',
            color: 'purple-800'
        }, {
            icon: 'streetview',
            color: 'cyan-800'
        }, {
            icon: 'location_city',
            color: 'red-600'
        }, {
            icon: 'public',
            color: 'light-green-A700'
        }, {
            icon: 'speaker_notes',
            color: 'orange-400'
        }, {
            icon: 'date_range',
            color: 'brown-600'
        }];

        self.init = function () {
            if (self.customer.registration_date)
                self.customer.registration_date = new Date(self.customer.registration_date);
            else
                self.customer.registration_date = new Date();

            self.setTitle();
        }

        self.setTitle = function () {
            switch (status) {
                case "I":
                    self.title = "Insert";
                    break;
                case "E":
                    self.title = "Edit";
                    break;
            }
        }

        self.isIdNText = function (name, type) {
            return name != "id" && type == "String";
        }

        self.isIdNDate = function (name, type) {
            return name != "id" && type == "Date";
        }

        self.cancel = function () {
            $mdDialog.cancel();
        }

        self.edit_callback = function (response) {
            if (response.data.code == 202) {
                $mdDialog.hide({
                    "reload": true,
                    "status": "U"
                });
                general.success("Update Success!");
            } else
                general.error("Internal Server Error!");

            progress(false);
        }

        self.insert_callback = function (response) {
            if (response.data.code == 201) {
                $mdDialog.hide({
                    "reload": true,
                    "status": "I"
                });
                general.success("Insert Success!");
            } else
                general.error("Internal Server Error!");

            progress(false);
        }

        self.error_callback = function (response) {
            progress(false);
        }

        self.answer = function () {
            progress(true);
            var cus = self.collectCustomer();
            if (self.customer.id) {
                cus.id = self.customer.id;

                http.PUT(config.API_URL + 'sample/customer/' + self.customer.id, store.HEADER(), cus, self.edit_callback, self.error_callback);
            } else {
                http.POST(config.API_URL + 'sample/customer/', store.HEADER(), cus, self.insert_callback, self.error_callback);
            }
        }

        self.collectCustomer = function () {
            cus = {
                "name": self.customer.name,
                "email": self.customer.email,
                "phone": self.customer.phone,
                "company": self.customer.company,
                "bank_account": self.customer.bank_account,
                "address": self.customer.address,
                "city": self.customer.city,
                "country": self.customer.country,
                "remark": self.customer.remark,
                "registration_date": new Date(self.customer.registration_date).getTime()
            };

            return cus;
        }

        self.init();
    }
]);