
As tree-garden data sets are nothing complex - just arrays of simple objects. You can import 
them as JSON files directly with a typescript. 

For that you need to enable it in **tsconfig.json**:
```json
{
  "compilerOptions": {
    "resolveJsonModule": true,
    "..": "..."
  }
}
```

Suppose I have json file, named **dataSet.json**, with content:
[code_file](docs/code_snippets/dataSet.json)

This can be easily imported by typescript like that:
[code_file](docs/code_snippets/loadingJsonAsDataSet.ts)
