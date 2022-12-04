# Welcome in tree-garden
  

**Tree-garden** is library for **decision trees** and **random forests** written in a typescript.
These algorithms are versatile, universal and known for long time[^1]. They are not complex to understand, and 
they are still relevant option for machine learning applications. Considerable advantage is fact, that 
learned models are human-readable and can thus be inspected and changed by expert with domain knowledge.


Although in python world there are great implementation of decision trees and random forest [^2], **tree-garden** 
can be a great way, how to become familiar with decision trees if your background is more js/ts oriented.

## Main features

!!! tip "Feature complete and flexible"
    Supports **classification** trees, **regression** trees and  **random forests**.  
    Implements multiple learning and pruning algorithms.

!!! tip "Visualization tools exists!"
    See [tiny library of react components](https://github.com/miob-miob/treeGardenVisualization), that used for exploring your trees.

!!! tip "Extendable and customizable"
    If you do not like included options, it is easy to provide your implementation for crucial parts of algorithm. 


!!! danger "tree-garden can be used also in pure **javascript** projects"
    When I was not familiar with **typescript** I was not sure if you can use
    typescript libraries directly from javascript - typescript packages are bundled to pure
    javascript with type schema files **.d.ts** which are used by IDEs to get proper code completion 
    and type hints!


Now lets get our hands dirty with some machine-learning, lets [install tree-garden](./gettingStarted.md#installation) and [**get
started with tree-garden**](./gettingStarted.md).



For those who are more curios about some design decisions, and use-cases of tree-garden,
continue with philosophy.

## Philosophy of tree-garden

- **What algorithm actually tree-garden implements?**
> There is not just **one** algorithm, all depends on your configuration - you can create your own '**hybrids**'. 
> 
> By default, configuration is set, that it should be near to [**c4.5**](https://en.wikipedia.org/wiki/C4.5_algorithm) algorithm.
> 
> (If you decide to prune your trained tree, by [pessimistic pruning](./api/modules/prune.md#getprunedtreebypessimisticpruning) 
> You in fact run **c4.5** algorithm)

- **  Are there any peer-dependencies/dependencies?**
> No, and I believe it is better for everyone involved - see more on this topic on [installation](./gettingStarted.md#installation) page.

- ** Is tree-garden suitable for real huge data?  What are limitations?** 
> Although main use case for tree-garden is exploring data, getting familiar with 
> decision trees and random forests, if you decide to go for BIG, limitations will be javascript itself ( c/c++ will 
> be more performant) and also fact that for training of single tree your data set must fit in operation 
> memory.  - This can be solved by using multiple trees and using some voting function...
> 
> Also remember, in case you are building some service on the node.js, you **should not** perform 
> computationally intensive tasks on event loop ! See [worker threads](https://nodejs.org/api/worker_threads.html#worker-threads),
> there will be example of that later...
> 
> So in a nutshell it is possible to go **BIG**, question is if it is the best thing you can do...

- ** Why there are not utils for reading data sets from files?**
> It should not be hard task to prepare data set for yourself. [See more on data sets.](importantBasics.md#data-set) 


[^1]: [ID3 algorithm](https://hunch.net/~coms-4771/quinlan.pdf)
[^2]: [Scikit learn decision trees](https://scikit-learn.org/stable/modules/tree.html)

[comment]: <> (TODO: API docs comments in code)
[comment]: <> (TODO: Github link last tag!)
