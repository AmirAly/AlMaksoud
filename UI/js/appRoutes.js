var almaksoud = angular.module("almaksoud", ['ngRoute']).run(function ($templateCache, $http) {
    $http.get('views/templates/login.html', { cache: $templateCache });
    $http.get('views/templates/dashboard.html', { cache: $templateCache });
    $http.get('views/templates/users.html', { cache: $templateCache });
    $http.get('views/templates/gl.html', { cache: $templateCache });
    $http.get('views/templates/createnewentry.html', { cache: $templateCache });
    $http.get('views/templates/editentry.html', { cache: $templateCache });
});

almaksoud.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            controller: "LoginController",
            templateUrl: "views/templates/login.html"
        })
    
    .when("/dashboard", {
        controller: "DashboardController",
        templateUrl: "views/templates/dashboard.html"
    })
    
    .when("/users", {
        controller: "UsersController",
        templateUrl: "views/templates/users.html"
    })

    .when("/gl", {
        controller: "GlController",
        templateUrl: "views/templates/gl.html"
    })
    .when("/createnewentry", {
        controller: "CreatenewentryController",
        templateUrl: "views/templates/createnewentry.html"
    })
    .when("/editentry", {
        controller: "EditentryController",
        templateUrl: "views/templates/editentry.html"
    })

    //.when("/leadprofile/:leadId?/:action?", {
    //    controller: "LeadprofileController",
    //    templateUrl: "views/templates/leadprofile.html"
    //})
    
    $routeProvider.otherwise({ "redirectTo": "/" });
});

