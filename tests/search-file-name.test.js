import { searchFile } from '../index.js'

describe('Search by file name', () => {
  let assets
  const mockJsonDataA = { "key": "Data for A" }
  const mockJsonDataB = { "key": "Data for B" }
  const mockImageA = 'Image A'
  const mockImageB = 'Image B'

  beforeEach(() => {
    jest.mock('./test-files/file_a', () => {
      return mockJsonDataA
    })

    jest.mock('./test-files/image_a.jpg', () => {
      return mockImageA
    })

    jest.mock('./test-files/image_b.png', () => {
      return mockImageB
    })

    assets = {
      file_a_json: require('./test-files/file_a'),
      image_a_jpg: require('./test-files/image_a.jpg'),
      image_b_png: require('./test-files/image_b.png'),
      search: searchFile
    }
  })

  it('Should return file which is matched file name', () => {
    let actual = assets.search('file_a_json')
    expect(actual).toBe(mockJsonDataA)

    actual = assets.search('image_a_jpg')
    expect(actual).toBe(mockImageA)

    actual = assets.search('image_b_png')
    expect(actual).toBe(mockImageB)
  })

  it('should not return any file if there is not matched name', () => {
    let actual = assets.search('image_a')
    expect(actual).toBe(-1)

    actual = assets.search('some_file')
    expect(actual).toBe(-1)

  })
})
