// Register `addressMap` component, along with its associated controller and template
addressMap.component('addressMap', {  // This name is what AngularJS uses to match to the `<address-map>` element.
    restrict: "EA",
    bindings: { item: '=' },
    css: "setting/apartment/addressMapModule/addressMap.css",
    templateUrl: 'setting/apartment/addressMapModule/addressMap.template.html',
    controller: addressMapController
});