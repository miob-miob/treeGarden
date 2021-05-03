import { getPessimisticErrorOfNode } from './pessimisticPrunning';


test('getPessimisticErrorOfNode', () => {
  // @ts-ignore
  expect(getPessimisticErrorOfNode({ classCounts: { cunt: 1, l: 1 } })).toBeCloseTo(1.575);
});
