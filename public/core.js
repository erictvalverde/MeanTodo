var meanTodo = angular.module('meanTodo', []);

meanTodo.controller('mainController', ['$scope', '$http', function($scope, $http){
	
	$scope.formData = {};
	$scope.todos = [];
	$scope.todoNumber = 0;

	//When landing on the page get all todos as show them
	$http.get('/api/todos')
		.success(function(data){
			$scope.todos = data;
			$scope.todoNumber = data.length;
			console.log('success: ' + data);
		})
		.error(function(data){
			console.log('error: ' + data);
		});

	// when submitting the add form, send the text to the node API
	$scope.createTodo = function(){

		$scope.todos.push($scope.formData);
		$scope.todoNumber = $scope.todos.length;

		$http.post('/api/todos', $scope.formData)
			.success(function(data) {
				$scope.formData = {} //clear the form

				//$scope.todos = data;
				console.log('todo added success: ' + data);
			})
			.error(function(data){
				console.log('todo added error: ' + data);
			});
			
	};

	//delete todo after checking it
	$scope.deleteTodo = function (id, index) {

	 	//$scope.todos.splice(index, 1);

	 	$scope.todoNumber = $scope.todoNumber-1;

		$http.delete('/api/todos/' + id)
			.success(function(data) {
				//$scope.todos = data;
				console.log('todo delete success: ' + data);
			})
			.error(function (data) {
				console.log('todo delete error: ' + data);
			})
	}

}]);

meanTodo.directive('todoItem',[function(){
	// Runs during compile
	return {
		link: function($scope, iElm, iAttrs, controller) {
			iElm.on('click', function(){
				$(this).addClass('done').find('input').attr('disabled','disabled');
			});
		}
	};
}]);
