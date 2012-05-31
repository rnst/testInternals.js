testCase ("tipo de datos", {
    "new var is undefined": function() {
        var foo;
        assertUndefined(foo);
    },
    "empty brackets is object": function() {
        assertObject({});
    },
    "digit is number": function() {
        assertNumber(2);
    },
    "digit.digit is number": function() {
        assertNumber(0.5);
    },
    "quoted text is string": function() {
        assertString("foo");
    },
    "empty annonimous function is function": function() {
        assertFunction(function() {});
    },
    "empty named function is function": function() {
        assertFunction(function foo() {});
    },
    "invoking empty annonymous function is undefined": function() {
        assertUndefined(function() {}());
    },
    "invoking empty named function is undefined": function() {
        assertUndefined(function foo() {}());
    },
    "invoking empty annonymous function wrapped in brackets is undefined":
    function() {
        assertUndefined((function() {}()));
    },
    "invoking function which returns number is number": function() {
        assertNumber(function() {return 2;}());
    }
});
  
/**
* vamos a hacer unos tests para demostrar las diferencias entre los
* operadores logicos (devuelven true o false) !== y !=
*/

testCase("comparaciones estrictas", {
    "== da true para mismo valor y mismo tipo": function() {
        assertTrue(3 == 3);
    },
    "== da true para mismo valor y diferente tipo": function() {
        assertTrue(3 == "3");
    },
    "=== da true para mismo valor y mismo tipo": function() {
        assertTrue(3 === 3);
    },
    "=== da false para mismo valor y diferente tipo": function() {
        assertFalse(3 === "3");
    }
});
    
/**
* vamos ha probar algunas propiedades de los objetos
* el acceso a traves de dot notation: objeto.propiedad
* el acceso a traves de corchetes: objeto[propiedad]
*/

testCase ("objetos y propiedades", {
    "object with property": function() {
        var foo = {"name": "john doe"};
        assertObject(foo);
    },
    "accessing object property by dot notation": function() {
        var name = "john doe";
        var foo = {"name": name};
        assertEquals(name, foo.name);
    },
    "accessing object property by corcheting" : function() {
        var name = "john doe";
        var foo = {"name" : name};
        assertEquals(name, foo["name"]);
    },
    "accessing object property by corcheting with var" : function() {
        var x = "name";
        var foo = {"name" : "john doe"};
        assertEquals(foo[x], foo["name"]);
    },
    "accessing object property with string var": function() {
        var objName = "john doe";
        var objAge = 22;
        var obj = {
            "name": objName,
            "age": objAge
        };
        assertEquals(obj["name"], "john doe");
    },
    "accessing object property with var": function() {
        var objName = "john doe";
        var objAge = 22;
        var obj = {
            "name": objName,
            "age": objAge
        };
        var name = "age";
        assertEquals(obj[name], objAge);
    }
});

/**
* Uso de caracteres unicode como variables
*/

testCase("nombres unicode", {
    "var ASCII como variable" : function() {
        var obj = {"€": 22};
        assertEquals(obj["€"], 22);
    }
});
    
/**
* probar como funcionan los operadores de incremento:
* - existe el incremento como prefijo?
* - existe el incremento como postfijo?
* - tienen diferencias como en c?
*/

testCase("operadores de incremento", {
    "pre-incremento incrementa antes" : function() {
        var a = 0;
        assertEquals(1, ++a); 
    },
    "post-incremento no incrementa antes" : function() {
        var a = 0;
        assertNotEquals(1, a++);
    },
    "post-incremento incrementa después" : function() {
        var a = 0;
        a++;
        assertEquals(1, a);
    }
});
    
/**
* he leido que si se comparan dos objetos iguales con === da false
* voy a hacer varios tests para comprobar este comportamiento
* y buscar informacion para descubrir porque
* http://code.google.com/p/js-test-driver/issues/detail?id=119
*/

testCase("comparando objetos", {
    "dos objetos vacios no son estrictamente iguales": function () {
        assertNotSame({}, {});
    },
    "dos objectos vacios no son iguales": function () {
        assertNotEquals({}, {});
    },
    "dos objetos vacios copiados por variable son estrictamente iguales":
    function () {
        var a = {};
        var b = a;
        assertSame(a, b);
    },
    "dos objetos vacios en variables no son iguales": function () {
        var a = {};
        var b = {};
        assertNotEquals(a, b);
    }
});
     
/**
* Scope
*/
    
testCase("scope", {
    "function scope": function() {
        var x = 0,
            y = (function() {
                var x = 1;
                return x;
            }());
        
        assertNotEquals(x, y)
    },
    "no braces scope": function() {
        var x = 0;
        
        if (true) {
            var x = 1;
        }
        
        assertEquals(x, 1); 
    }
});
     
/**
* This object
*/

testCase("el objeto this", {
    "x is undefined in this scope": function() {
        assertFalse(this.x);
    },
    "without var, not using this scope": function() {
        x = 0;
        assertFalse(this.x);
    },
    "using var not means using this scope": function() {
        var x = 1;
        assertFalse(this.x);
    },
    "without var, variable still defined": function() {
        x = 0;
        assertEquals(x, 0);
    }
});
    
/**
* That: a copy of this object
*/
    
testCase("copiando this en that", {
    "using var not means using that scope": function() {
        var that = this;
        var x = 0;
        assertFalse(that.x);
    }
});