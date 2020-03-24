function greetFilter() {
    return function (full_name) {
        return 'Hello, ' + full_name + '!';
    };
}