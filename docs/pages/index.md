# Welcome in tree-garden
  

**Tree-garden** is library for **decision trees** and **random forests** written in typescript.
These algorithms are versatile, universal and known for long time[^1]. They are not complex to understand, and 
they are still relevant option for machine learning applications. Considerable advantage is fact, that 
learned models are human-readable and can thus be inspected and changed by expert with domain knowledge.


Although in python world there are great implementation of decision trees and random forest [^2], **tree-garden** 
can be a great way, how to become familiar with decision trees if your background is more js/ts oriented.

## Main features

!!! important "Easily usable out of the box..."
    Defaults are sensible, api should be comfortable for JS devs

!!! important "Visualization tools exists!"
    See [tiny library of react components](https://github.com/miob-miob/treeGardenVisualization), that used for exploring your trees

!!! important "Extendable and customizable"
    If you do not like included options, it is easy to provide your implementation for crucial parts of algorithm. 



Now lets get our hands dirty with some machine-learning, lets [install tree-garden](./gettingStarted.md#installation) and [**get
started with tree-garden**](./gettingStarted.md).



For those who are more curios about some design decisions, and use-cases of tree-garden,
continue with philosophy.

## Philosophy of tree-garden

- **What algorithm actually tree-garden implements?**
> There is not just **one** algorithm, all depends on your configuration - you can create your own '**hybrids**'. 
> 
> By default configuration is set, that it should be near to [**c4.5**](https://en.wikipedia.org/wiki/C4.5_algorithm) algorithm.
> 
> (If you decide to prune your trained tree, by [pessimistic pruning](./api/modules/prune.md#getprunedtreebypessimisticpruning) 
> You in fact run **c4.5** algorithm)




[^1]: [ID3 algorithm](https://hunch.net/~coms-4771/quinlan.pdf)
[^2]: [Scikit learn decision trees](https://scikit-learn.org/stable/modules/tree.html)
