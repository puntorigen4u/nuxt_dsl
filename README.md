# Punto Origen OPEN Framework : ES6 Classes

# API Reference
Concepto VUE DSL Class: A class for compiling vue.dsl Concepto diagrams into VueJS WebApps.


* [vue_dsl](#module_vue_dsl)
    * [.debug_time(id)](#module_vue_dsl+debug_time)
    * [.debug_timeEnd(id)](#module_vue_dsl+debug_timeEnd)

<a name="module_vue_dsl+debug_time"></a>

### vue_dsl.debug\_time(id)
Helper method for measuring (start) time in ms from this method until debug_timeEnd() method and show it in the console.

**Kind**: instance method of [<code>vue\_dsl</code>](#module_vue_dsl)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | id key (which can also have spaces and/or symbols) with a unique id to identify the stopwatch. |

<a name="module_vue_dsl+debug_timeEnd"></a>

### vue_dsl.debug\_timeEnd(id)
Helper method for measuring (end) time in ms from the call of debug_time() method.

**Kind**: instance method of [<code>vue\_dsl</code>](#module_vue_dsl)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | id key used in the call for debug_time() method. |


* * *

&copy; 2020 Pablo Schaffner &lt;pablo@puntorigen.com&gt;.
Documented by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).