# Data set and configuration


buildding blocks of tree-garden

 - describe in general how configuration looks like
 - describe how to create data set

## Data set

See example of [minimalistic data set](https://github.com/miob-miob/treeGarden/blob/master/src/sampleDataSets/simpleSet.ts)
for tree garden. There are two fields: **`size`** and **`color`** and two **metadata** fields:
**`_class`** and **`_label`**.
All metadata fields starts with **underscore**.
If you are constructing data set for tree garden only **required** field is **`_class`**
There is also **`_label`** (for visualization purposes) and **`_id`** (used for calculation
of [out of bag error](https://en.wikipedia.org/wiki/Out-of-bag_error) - generated if not provided)

## Configuration

Configuration holds whole settings of algorithm. See [Api doc - Configuration](./api/modules.md#treegardenconfiguration)
This object is needed when you're training trees,
as well when you classify unknown samples with trained tree it basically drives everything within tree-garden.

As configuration is object which values are not only primitive types, but also functions,
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






