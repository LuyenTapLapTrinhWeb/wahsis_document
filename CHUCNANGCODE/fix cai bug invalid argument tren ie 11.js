
48
down vote
accepted
I was able to get everything working correctly in IE using the ng-attr-placeholder directive instead of binding directly to the attribute in the DOM. For example:

/* thay placeholder = ng-attr-placeholder */
<textarea ng-attr-placeholder="Description of the {{ name }}"></textarea>