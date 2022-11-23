# Data set and configuration



## Data set


Tree-garden dataset is in general just array of simple javascript objects. You can see 
[simple data set](https://github.com/miob-miob/treeGarden/blob/master/src/sampleDataSets/simpleSet.ts) bundled with tree-garden. 
There are two fields: **`size`** and **`color`** and two **metadata** fields:**`_class`** and **`_label`**.


All metadata fields starts with **underscore**.
There are three metadata fields that can be found among tree-garden datasets:  

 -  **_class** - it is the most important one and means class (for classification trees), or target
    value (regression trees). It is required to be present on each sample of training data set.
    

 -  **_label** - human-readable identifier of sample - it is not required, but it is used in some error messages.


 -  **_id** - used for calculation of [out of bag error](https://en.wikipedia.org/wiki/Out-of-bag_error) when training
    random forests. It is automatically generated when it is needed and not provided by user.
    
    
### Constructing data sets

Tree-garden do not have any IO utilities - like read csv/xml/json as files as data set. Preparation of data sets from 
various sources is thus solely on tree-garden user.  
It should not be hard task for js/ts developer :wink:.
See how to [import data set from json](./examples/importJsonWithTypescript.md).


## Configuration

Configuration holds whole settings of algorithm. See [definition of particular fields in API doc](./api/modules.md#treegardenconfiguration).
Configuration is needed when you're training trees,
as well when you classify unknown samples with trained tree. It basically drives everything within tree-garden.

Configuration is object which values are not only primitive types, but also functions,
it acts as dependency injection container, which enables us to provide custom
implementations into an algorithm.

You can write configuration completely by hand, but i would not recommend it. The easiest way to obtain configuration
is to use [buildAlgorithmConfiguration](./api/modules.md#buildalgorithmconfiguration) function. 

You will pass data set to this function and your partial config. Its get merged with
[default config](./api/modules.md#defaultconfiguration) and from data set it will build fields 
and their types. Everything can be overridden by second argument.

See [example](examples/configurationFromSingleDataSample.md), 
of more complex configuration.

Also [example](examples/configurationFromSingleDataSample.md) how to build configuration just from single data sample.






