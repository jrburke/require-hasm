
requirejs.config({
    paths: {
        hasm: '../../hasm'
    }
});

require(['hasm!has/array!array-isarray?isArray:noIsArray'], function (hasArray) {
    hasArray();
});
