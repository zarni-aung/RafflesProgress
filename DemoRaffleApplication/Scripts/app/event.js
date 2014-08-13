angular.module('main')
    .controller('EventController', ['$scope', '$http', 'EventService', function ($scope, $http, EventService) {
        
        $scope.events = [];
        $scope.userevents = EventService.userevents;
        $scope.eventid = EventService.eventid;
        $scope.showEvent = false;
        console.log('even id' + EventService.eventid)

        function getEventCount() {
            $http.get('/Home/EventLists')
            .success(function (data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                console.log(data)
                $scope.eventDbCount = data.RfEvent;
                $scope.events = [];
                $.each(data, function (i, evtdata) {
                    console.log('evtdata: ' + evtdata);
                    var rf = {};
                    rf.eventid = evtdata.Id;
                    rf.name = evtdata.EventName;
                    rf.datetime = evtdata.EventDateTime;
                    rf.location = evtdata.EventLocation;
                    rf.description = evtdata.EventDescription;
                    $scope.events.push(rf);
                });
                console.log('eventDbCount: ' + $scope.eventDbCount);
                updateRegEvents();
            }).
            error(function (data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }

        function addDbEvent(rf) {
            var rfdb = {};
            rfdb.Id = rf.eventid;
            rfdb.EventName = rf.name;
            rfdb.EventDateTime = rf.datetime;
            rfdb.EventLocation = rf.location;
            rfdb.EventDescription = rf.description;
            console.log('db input')
            console.log(rfdb);
            $http.get('/Home/EventCreate', {
                params: rfdb,
                headers: {'Content-Type': 'application/json; charset=UTF-8'}
            })
            .success(function (data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                rf.eventid = rfdb.Id
                //$scope.events.push(rf)

                EventService.eventid = rfdb.Id;

                $scope.name = "";
                $scope.datetime = "";
                $scope.location = "";
                $scope.description = "";

                $scope.added = true;
                $scope.addedCss = "message - success";
                $scope.addedMsg = "Event created successfully";

                getEventCount();

                console.log('addDbEvent: '  + data)                
                
            }).
            error(function (data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }

        $scope.eventDbCount = 0
        getEventCount();
        

        $scope.navtoScheme = function () {
            console.log(location.href);
            location.href = '#/adminscheme'
        }
        $scope.addEvent = function () {
            if ($.isEmptyObject($scope.name)) {
                return;
            }
            var eventobj = {};
            $scope.eventid +=1;
            eventobj.eventid = $scope.eventid;
            eventobj.name = $scope.name;
            eventobj.datetime = $scope.datetime;
            eventobj.location = $scope.location;
            eventobj.description = $scope.description;
           
            console.log(eventobj)

            addDbEvent(eventobj)
            
        };
        $scope.removeEvent = function (id) {
          //  var result ;
          //  $.each($scope.events, function (idx, e) {
          //      if (e.eventid == id) {
          //          result = idx;
          //          return;
          //      }});
            //  $scope.events.splice(result, 1);
            removeDBEvent(id);
        };
        function removeDBEvent(id) {
            $http.get('/home/eventdelete/', {
                params: {'eventid': id},
                headers: { 'Content-Type': 'application/json; charset=UTF-8' }
            })
            .success(function (data, status, headers, config) {
                console.log('delete success:' + data)
                getEventCount();
            })
            .error(function (data, status, headers, config) {

            });
        }
        $scope.registerEvent = function (id) {
            var f = $.inArray(id,$scope.userevents)
            if (f < 0) {
                $scope.userevents.push(id);
                console.log($scope.userevents);
                updateRegEvents();
            } else {
                $scope.userevents.splice(f, 1);
                updateRegEvents();
            }
            
        };

        
        function updateRegEvents() {
            $scope.regEvents = [];
            $.each($scope.events, function (idx, e) {
                var f = $.inArray(e.eventid, $scope.userevents);
                var regEvt = {};
                if (f >= 0) {
                    regEvt.register = "Y";
                }
                regEvt.event = e;
                $scope.regEvents.push(regEvt);
            });
        }
        getEventCount();
        
    }]);