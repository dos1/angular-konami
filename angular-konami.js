// angular-konami 0.2
// https://github.com/dos1/angular-konami
// based on https://gist.github.com/benajnim/5238495
angular.module('konami', []).directive("konami", ['$document', function($document) {
        return {
            restrict: 'A',
            scope: {
                konami: '&'
            },
            link: function(scope) {
                var konami_keys = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65], konami_index = 0;

                var handler = function(e) {
                    if (e.keyCode === konami_keys[konami_index++]) {
                        if (konami_index === konami_keys.length) {
                            $document.off('keydown', handler);
                            scope.$apply(scope.konami);
                        }
                    } else {
                        konami_index = 0;
                    }
                };

                $document.on('keydown', handler);

                scope.$on('$destroy', function() {
                    $document.off('keydown', handler);
                });
            }
        };
    }]);
