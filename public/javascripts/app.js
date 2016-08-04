
angular.module('app', ['ui.router'])

  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: '/partials/main.html',
        controller: 'MainCtrl'
      })
      .state('new', {
        url: '/new',
        templateUrl: '/partials/new.html',
        controller: 'NewCtrl'
      })
  })  

  .controller('MainCtrl', function ($scope, MemberService) {
    MemberService.getList()
      .success(function (data) {
        if (data.ok) {
          $scope.members = data.rows
        } else {
          console.log(data.msg)
        }
      })
      .error(function () {
        console.log('การเชื่อมต่อผิดพลาด')
      });
  })

  .controller('NewCtrl', function ($scope, $state, MemberService) {

    MemberService.getGroups()
      .success(function (data) {
        if (data.ok) {
          $scope.groups = data.rows;
        } else {
          console.log(data.msg);
        }
      })
      .error(function () {
      
      });
    
    $scope.save = function () {
      var member = {
        fullname: $scope.fullname,
        username: $scope.username,
        password: $scope.password,
        group_id: $scope.group_id
      };

      MemberService.save(member)
        .success(function (data) {
          if (data.ok) {
            $state.go('main')
          } else {
            alert(JSON.stringify(data.msg))
          }
        })
        .error(function () {
          console.log('Connection failed!')
        });

    }

  })

  .factory('MemberService', function ($http) {
    return {
      getList: function () {
        return $http.get('/members')
      },
      getGroups: function () {
        return $http.get('/groups')
      },
      save: function (member) {
        return $http.post('/members', { member: member });
      }
    }
  })