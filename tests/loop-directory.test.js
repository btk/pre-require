import { loopDirectory } from '../index.js'
import { assetsLength } from './utils'

describe('Loop directory Test', () => {
  it('Should return the files length in folder', async () => {
    const assets = await loopDirectory('./test-assets', {});
    expect(assetsLength(assets)).toBe(10);
  })
})