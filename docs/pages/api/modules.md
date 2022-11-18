---
hide:
- toc
---

[tree-garden](README.md) / Exports

# tree-garden

## Table of contents

### Type Aliases

- [TreeGardenConfiguration](modules.md#treegardenconfiguration)

### Variables

- [split](modules.md#split)

## Type Aliases

### TreeGardenConfiguration

Ƭ **TreeGardenConfiguration**: `Object`

Oblibenej typ pana kaplana!

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `allClasses?` | `string`[] | - |
| `attributes` | { `[key: string]`: typeof `defaultAttributeConfiguration`;  } | - |
| `biggerScoreBetterSplit` | `boolean` | Vetsi je lepsi kundo! |
| `buildTime?` | `number` | - |
| `calculateOutOfTheBagError` | `boolean` | - |
| `costComplexityPruningKFold` | `number` | - |
| `evaluateMissingValueReplacement` | (`dataSet`: `TreeGardenDataSample`[], `attributeId`: `string`, `configuration`: [`TreeGardenConfiguration`](modules.md#treegardenconfiguration)) => (`sample`: `TreeGardenDataSample`) => `any` | - |
| `excludedAttributes` | `string`[] | - |
| `getAllPossibleSplitCriteriaForContinuousAttribute` | (`attributeId`: `string`, `dataSet`: `TreeGardenDataSample`[], `configuration`: [`TreeGardenConfiguration`](modules.md#treegardenconfiguration)) => `SplitCriteriaDefinition`[] | - |
| `getAllPossibleSplitCriteriaForDiscreteAttribute` | (`attributeId`: `string`, `dataSet`: `TreeGardenDataSample`[], `configuration`: [`TreeGardenConfiguration`](modules.md#treegardenconfiguration)) => `SplitCriteriaDefinition`[] | - |
| `getAttributesForTree` | (`algorithmConfiguration`: [`TreeGardenConfiguration`](modules.md#treegardenconfiguration), `_dataSet`: `TreeGardenDataSample`[]) => `string`[] | - |
| `getClassFromLeafNode` | (`node`: `TreeGardenNode`, `sample?`: `TreeGardenDataSample`) => `string` | - |
| `getScoreForSplit` | (`parentDataSet`: `TreeGardenDataSample`[], `childDataSets`: { `[key: string]`: `TreeGardenDataSample`[];  }, `config`: [`TreeGardenConfiguration`](modules.md#treegardenconfiguration), `splitter`: `SplitCriteriaFn`) => `number` | - |
| `getTagOfSampleWithMissingValueWhileClassifying?` | (`sample`: `TreeGardenDataSample`, `attributeId`: `string`, `nodeWhereWeeNeedValue`: `TreeGardenNode`, `config`: [`TreeGardenConfiguration`](modules.md#treegardenconfiguration)) => `any` | - |
| `getTreeAccuracy` | (`treeRootNode`: `TreeGardenNode`, `dataSet`: `TreeGardenDataSample`[], `configuration`: [`TreeGardenConfiguration`](modules.md#treegardenconfiguration)) => `number` | - |
| `getValueFromLeafNode` | (`node`: `TreeGardenNode`, `sample?`: `TreeGardenDataSample`) => `number` | - |
| `growMissingValueReplacement` | (`dataSet`: `TreeGardenDataSample`[], `attributeId`: `string`, `configuration`: [`TreeGardenConfiguration`](modules.md#treegardenconfiguration)) => (`sample`: `TreeGardenDataSample`) => `any` | - |
| `includedAttributes` | `string`[] | - |
| `keepFullLearningData` | `boolean` | - |
| `majorityVoting` | (`treeRoots`: `TreeGardenNode`[], `dataSample`: `TreeGardenDataSample`, `config`: [`TreeGardenConfiguration`](modules.md#treegardenconfiguration)) => `SingleSamplePredictionResult` | - |
| `mergeClassificationResults` | (`values`: `string`[]) => `string` | - |
| `mergeRegressionResults` | (`values`: `number`[]) => `number` | - |
| `missingValue` | `any` | - |
| `numberOfBootstrappedSamples` | `number` | - |
| `numberOfSplitsKept` | `number` | - |
| `numberOfTrees` | `number` | - |
| `onlyBinarySplits` | `boolean` | - |
| `reducedErrorPruningGetScore` | (`accuracyBeforePruning`: `number`, `accuracyAfterPruning`: `number`, `numberOfRemovedNodes`: `number`) => `number` | - |
| `shouldWeStopGrowth` | (`node`: `TreeGardenNode`, `configuration`: [`TreeGardenConfiguration`](modules.md#treegardenconfiguration)) => `boolean` | - |
| `treeType` | ``"classification"`` \| ``"regression"`` | - |

#### Defined in

[algorithmConfiguration/buildAlgorithmConfiguration.ts:15](https://github.com/miob-miob/treeGarden/blob/941548a/src/algorithmConfiguration/buildAlgorithmConfiguration.ts#L15)

## Variables

### split

• `Const` **split**: `Object`

Magic namespace full of splitter function

#### Type declaration

| Name | Type |
| :------ | :------ |
| `getAllPossibleSplitCriteriaForDataSet` | (`dataSet`: `TreeGardenDataSample`[], `configuration`: { `[key: string]`: `any`;  }, `splitCriteriaAlreadyUsed`: `SplitCriteriaDefinition`[]) => `SplitCriteriaDefinition`[] |
| `getPossibleSpitCriteriaForContinuousAttribute` | (`attributeId`: `string`, `dataSet`: `TreeGardenDataSample`[], `configuration`: { `[key: string]`: `any`;  }) => (`string` \| `number`)[][] |
| `getPossibleSpitCriteriaForDiscreteAttribute` | (`attributeId`: `string`, `dataSet`: `TreeGardenDataSample`[], `configuration`: { `[key: string]`: `any`;  }) => `SplitCriteriaDefinition`[] |
| `getSplitCriteriaFn` | (`attributeId`: `string`, `operator`: ``"=="`` \| ``">="`` \| ``"<="`` \| ``">"`` \| ``"<"`` \| ``"customFn"``, `value?`: `string` \| `number` \| `Function` \| (`string` \| `number`)[]) => (`currentSample`: `TreeGardenDataSample`) => `any` |

#### Defined in

[index.ts:146](https://github.com/miob-miob/treeGarden/blob/941548a/src/index.ts#L146)
