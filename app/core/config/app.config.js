(function () {

    angular.module('common.services', []).constant(
        'config', {
            'APP_NAME': 'CEO System',
            'APP_VERSION': '0.0.1',
            'APP_LOGO': './resources/logo.png',
            'LOADING_SVG': './resources/loading.svg',
            'BASE_URL': 'http://localhost:1337/localhost:8084/master-api/',
            'API_URL': 'http://localhost:1337/localhost:8084/master-api/api/',
            "DEVICE_ID": "864053a3dd15d9b980073ec137889c49ded6eff04d1aa85235b9b7260d768db9",
            "DT_OPTIONS": {
                "iDisplayLength": 15,
                "lengthMenu": [10, 15, 25, 50, 100],
                "language": {
                    "paginate": {
                        "previous": "&laquo;",
                        "next": '&raquo;'
                    }
                }
            }
        });

})();