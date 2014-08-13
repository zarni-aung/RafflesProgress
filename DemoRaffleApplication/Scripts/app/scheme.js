angular.module('main')
    .controller('SchemeController', ['$scope', function ($scope) {
        $scope.schemelist = [];
        $scope.schemeid = 0;
        $scope.sourceMarkets = SOURCE_MARKETS;
        $scope.sourceIndicators = SOURCE_INDICATORS;
        $scope.sourcePatternScanners = SOURCE_PATTERN_SCANNERS;
        $scope.sourceScanners = SOURCE_SCANNERS;
        console.log('sourceMarkets:' + $scope.sourceMarkets);
        $scope.usermarkets = '';
        $scope.selectedFunc = 'init val';
        $scope.functionSources = ['Markets', 'Indicators', 'Pattern Scanners', 'Scanners'];
        $scope.$watchCollection('sourceMarkets', function (nval, oval) {
            var mkts = [];

            $.each(nval, function (k, val) {

                if (val == true) {
                    mkts.push(k);
                }
            });
            $scope.usermarkets = mkts.join(';');
            console.log('markets:' + $scope.usermarkets);
        });

        $scope.$watchCollection('sourceIndicators', function (nval, oval) {
            var mkts = [];

            $.each(nval, function (k, val) {

                if (val == true) {
                    mkts.push(k);
                }
            });
            $scope.userindicators = mkts.join(';');
            console.log('userindicators:' + $scope.userindicators);
        });

        $scope.$watchCollection('sourcePatternScanners', function (nval, oval) {
            var mkts = [];

            $.each(nval, function (k, val) {

                if (val == true) {
                    mkts.push(k);
                }
            });
            $scope.patternscanners = mkts.join(';');
            console.log('sourcePatternScanners:' + $scope.patternscanners);
        });

        $scope.$watchCollection('sourceScanners', function (nval, oval) {
            var mkts = [];

            $.each(nval, function (k, val) {

                if (val == true) {
                    mkts.push(k);
                }
            });
            $scope.scanners = mkts.join(';');
            console.log('sourceScanners:' + $scope.scanners);
        });

        $scope.addScheme = function () {

            if ($.isEmptyObject($scope.name)) {
                return;
            }
            var schm = {};

            $scope.schemeid = $scope.schemeid + 1;
            schm.schemeid = $scope.schemeid;
            schm.name = $scope.name;
            schm.description = $scope.description;
            schm.usermarkets = $scope.usermarkets;
            schm.userindicators = $scope.userindicators;
            schm.userbullbeartest = $scope.userbullbeartest;
            schm.userbacktest = $scope.userbacktest;
            schm.patternscanners = $scope.patternscanners;
            schm.scanners = $scope.scanners;
            schm.isscanner = $scope.isscanner;
            console.log('input scheme:' + schm);
            addDbScheme(schm)
        }

        function addDbScheme(schm) {
            var dbobj = {};
            dbobj.SchemeName = schm.name;
            dbobj.Description = schm.description;
            dbobj.UserMarkets = schm.usermarkets;
            dbobj.UserIndicators = schm.userindicators;
            $http.get('/home/schemecreate',
                {
                    params: dbobj,
                    headers: { 'Content-Type': 'application/json; charset=UTF-8' }
                })
                .success(function (data) {
                    console.log('add db scheme:' + data);
                    clearScheme();
                })
            .error(function (data) {
                console.log('error add db scheme:' + data);
            });

        }

        function clearScheme() {
            $scope.added = true;
            $scope.addedMsg = "New scheme successfully created";
            $scope.schemelist.push(schm);
            $scope.name = "";
            $scope.description = "";
            $scope.usermarkets = "";
            $scope.userindicators = "";
            $scope.userbullbeartest = "";
            $scope.userbacktest = "";
            $scope.patternscanners = "";
            $scope.scanners = "";
            $scope.isscanner = false;
            $scope.showScheme = false;
        }

        function listSchemes() {
            $http.get('/home/schemecreate',
               {
                   params: dbobj,
                   headers: { 'Content-Type': 'application/json; charset=UTF-8' }
               })
               .success(function (data) {
                   console.log('list db scheme:' + data);
                   $.each(data, function (idx, dataval) {
                       schm = {}
                       schm.name = dataval.SchemeName;
                       schm.description = dataval.Description;
                       schm.usermarkets = dataval.UserMarkets;
                       schm.userindicators = dataval.UserIndicators;
                       $scope.schemelist.push(schm);

                   })
               })
           .error(function (data) {
               console.log('error list db scheme:' + data);
           });
        }

        $scope.removeScheme = function (id) {
            var result;
            $.each($scope.schemelist, function (idx, e) {
                if (e.schemeid == id) {
                    result = idx;
                    return;
                }
            });
            $scope.schemelist.splice(result, 1);
        };
    }]);