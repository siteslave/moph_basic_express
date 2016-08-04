
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
      .state('edit', {
        url: '/edit/:id',
        templateUrl: '/partials/edit.html',
        controller: 'EditCtrl'
      })
  })  

  .controller('MainCtrl', function ($scope, $state, MemberService) {

    $scope.getList = function () {
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
    }    

    $scope.getList();
    
    $scope.edit = function (id) {
      $state.go('edit', { id: id });
    }

    $scope.remove = function (id) {
      if (confirm('Are you sure?')) {
        MemberService.remove(id)
        .success(function (data) {
          if (data.ok) {
            $scope.getList();
          } else {
            console.log(data.msg);
          }
        })
        .error(function () {
          console.log('Connection failed!')
        });
      }
    }
    
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

  .controller('EditCtrl', function ($scope, $state,
    $stateParams,
    MemberService) {
    var id = $stateParams.id;

    MemberService.getGroups()
      .success(function (data) {
        if (data.ok) {
          $scope.groups = data.rows;
        } else {
          console.log(data.msg);
        }
      });
    
    MemberService.detail(id)
      .success(function (data) {
        if (data.ok) {
          $scope.member = data.member;
          $scope.selectedGroup = $scope.member.group_id;
        } else {
          console.log(data.msg)
        }
      })
      .error(function () {
        console.log('Connection error')
      });
    

    $scope.save = function () {
      var member = {};
      member.id = id;
      member.fullname = $scope.member.fullname;
      member.group_id = $scope.selectedGroup;

      MemberService.update(member)
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
      },
      detail: function (id) {
        return $http.get('/members/' + id)
      },
      update: function (member) {
        return $http.put('/members', { member: member })
      },
      remove: function (id) {
        return $http.delete('/members/' + id)
      }
    }
  })