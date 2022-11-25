from csv import DictReader
from json import dumps
from typing import List, Dict, Callable


def read_files(paths):
    result = []
    for path in paths:
        with open(path) as csv_file:
            result += list(DictReader(csv_file))
    return result


def transform(data_set: List[Dict], transform_functions: List[Callable]):
    result = []
    for sample in data_set:
        transformed_sample = sample
        for transform_fn in transform_functions:
            transformed_sample = transform_fn(transformed_sample.copy())
            if transformed_sample is None:
                raise ValueError('All transform function must return sample, they receive!')
        result.append(transformed_sample)
    return result


def output_to_ts_file(data_set: List[Dict], out_file_path: str, variable_name: str):
    with open(out_file_path, 'w') as out_file:
        out_file.write(f"export const {variable_name} = [\n")
        last_item = data_set.pop()
        for sample in data_set:
            out_file.write(f"\t{dumps(sample)},\n")

        # last item without coma :S
        out_file.write(f"\t{dumps(last_item)}\n")
        out_file.write("];\n")


def rename_field(original_field_name: str, new_field_name: str, value_if_not_exists=None):
    def transform_rename_field(sample: Dict):
        original_field_value = sample.get(original_field_name, "value_if_not_exists")
        try:
            del sample[original_field_name]
        except KeyError:
            print(f"Sample {dumps(sample)} does not have field: '{original_field_name}'")
        sample[new_field_name] = original_field_value
        return sample

    return transform_rename_field


def lower_case_field_names(sample: Dict):
    new_sample = {}
    for key in sample.keys():
        new_sample[key.lower()] = sample[key]
    return new_sample


def fields_to_numbers(fields_to_convert: List[str]):
    def transform_fields_to_numbers(sample: Dict):
        for field_name in fields_to_convert:
            try:
                sample[field_name] = float(sample[field_name])
            except ValueError as e:
                print(
                    f"Cannot convert field: '{field_name}' with value '{sample[field_name]}' into float! Sample :{dumps(sample)}, skipping")

        return sample

    return transform_fields_to_numbers


# -----------------------
# set extractors


def titanic():
    # merge in following files
    files_to_include = [
        'train.csv',
        'test.csv'

    ]

    # read them into list of samples (can be problematic with big data sets - it is not using iterators)
    data_set = read_files(files_to_include)

    # human readable form of class
    def human_class(sample):
        value = sample["_class"]
        sample["_class"] = 'Yes' if value == "1" else "No"
        return sample

    # transformations performed on each sample
    transformed_data_set = transform(data_set, [
        lower_case_field_names,
        rename_field("survived", "_class"),
        rename_field("passengerid", "_label"),
        fields_to_numbers(["pclass", "age", "sibsp", "fare", "parch"]),
        human_class
    ])

    # create ts file with exported variable with dataset
    output_to_ts_file(transformed_data_set, 'titanic.ts', 'titanicSet')


if __name__ == '__main__':
    titanic()
