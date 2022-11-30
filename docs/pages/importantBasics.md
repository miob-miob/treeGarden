# Data set and configuration

Let me introduce main terms used in **tree-garden**. 

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


## Decision Tree

Trained tree - output of [growTree](./api/modules.md#growtree) function is as data set just
plain javascript object. You can find more information about its structure in [api doc](./api/modules.md#treegardennode).  

In node.js, you can thus easily store trained trees in json files:
[code_file](docs/code_snippets/storeTrainedTreeInJsonAndLoadItBack.ts)


## Dealing with missing values

tree-garden is ready for dealing with missing values in both - training data sets and also 
in samples we wish to predict. 

In case of training phase, tree-garden preprocess training data 
set and if it meets sample with some missing value it will use strategy defined in [configuration](api/modules.md#treegardenconfiguration)
(**growMissingValueReplacement**) to replace missing value with relevant value obtained from whole data set. This
behaviour can be changed/ reimplemented if you provide other function.

???- info "Default 'growMissingValueReplacement' implementation"
    Most common value for given attribute from whole data set is used instead of missing value.

    If I have data set with 6 samples, 2 of them has field `color='green'`, 3 of them has `color='red'` and last one 
    `color=undefined`, during preprocessing, `color='red'` is added for last sample


In case of classifying samples, we have two options, preprocess samples in similar way like during training phase. 
You would need to pass data set as reference for replacing (referenceDataSetForReplacing) to [getTreePrediction](api/modules.md#gettreeprediction) or
[getRandomForestPrediction](api/modules.md#getrandomforestprediction) functions. In this case 
strategy defined in configuration (**evaluateMissingValueReplacement**) is used.

If you do not pass reference data set to prediction functions, then replacement of value is 
delayed to point where given sample needs missing attribute, while traversing trained tree and **getTagOfSampleWithMissingValueWhileClassifying**
strategy defined in configuration is used.

???- info "Default 'getTagOfSampleWithMissingValueWhileClassifying' implementation"
    Sample is thrown down the tree in same 'direction' as the majority of samples during the 
    training phase.

    If sample reaches node which checks 'color' field and sample does not have this field defined (missing value)
    And majority of samples during training phase goes to 'left' child node, this sample is also send to 
    'left' child node. - This should be strategy used by **c4.5** algorithm

Defaults should be 'good enough' but it is not hard to provide your own implementation or use different preimplemented strategy.


## Random forests 

Tree-garden is also capable of dealing with random forests. Random forests belongs among 
ensemble machine learning algorithms. They are usually combining multiple weak learners in order 
to obtain better performance than one strong learner. 

Main disadvantage of random forest is that model is not easily interpretable by a human.

Check [random forest example](examples/randomForest.md). 


## Tree pruning

Pruning of tree means removing branches and nodes without considerable impact on tree accuracy. We have two types of tree 
pruning:

### Pre-pruning 

Interruption of tree growth to its maximal size during growing(training) phase by employing some criteria like **minimal number 
of samples in node**, or **maximal depth of tree**. These two are implemented in **tree-garden**, if it is not enough for you,
it should be straightforward to implement your own stopping criteria.  
Example usage:
[code_file](docs/code_snippets/prePrunning.ts)
in my case this is output:
```
Full tree:
	 Number of nodes: 1203 Accuracy: 0.9992360580595875
Small tree:
	 Number of nodes: 146 Accuracy: 0.8938120702826585
```
You can see high value of accuracy in case of full tree - because we trained tree on one data set and measured accuracy
on same one!  

Exact values of these parameters should be found by **cross-validation**. Pre-pruning is more important for **random forests**
if we wnt to shrink down computation time.


### Post-pruning 

If we let grow tree to full size without any restriction, we will end up with over-fitted (towards training data set) tree of large size. 
To reduce size and over-fitting of fully grown tree, we can use one of **tree-garden`s post pruning methods**. tree-garden 
implements three **post-pruning** strategies:

- **[getPrunedTreeByReducedErrorPruning](./api/modules/prune.md#getprunedtreebyreducederrorpruning)** - applicable on both,
**regression** trees and **classification** trees. It needs data set against which tree is reduced in bottom up fashion.
  
- **[getPrunedTreeByCostComplexityPruning](./api/modules/prune.md#getprunedtreebycostcomplexitypruning)** - applicable on 
**regression** as well as **classification** trees, it is computationally expensive method (cross validation for 
  obtaining **alpha** parameter), but it does not need data set for pruning. Suitable for small to medium-sized data sets.
  
- **[getPrunedTreeByPessimisticPruning](./api/modules/prune.md#getprunedtreebypessimisticpruning)**  - usable only on 
  **classification** trees, based on statistics - without pruning data set. Computationally effective, method which is 
  used for **[c4.5 algorithm](https://en.wikipedia.org/wiki/C4.5_algorithm)**.
