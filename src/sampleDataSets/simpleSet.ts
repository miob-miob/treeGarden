const first = {
  _class: 'left', color: 'black', size: 3, _label: '1'
};
/**
 *  Really simple data set used by unit tests in tree-garden.
 */
export const simpleSet = [
  {
    _class: 'left', color: 'black', size: 3, _label: '1'
  },
  {
    _class: 'left', color: 'black', size: 4, _label: '2'
  },
  {
    _class: 'right', color: 'white', size: 4, _label: '3'
  },
  {
    _class: 'right', color: 'white', size: 2, _label: '4'
  },
  {
    _class: 'right', color: 'white', size: 2, _label: '5'
  }
] as (typeof first)[];
