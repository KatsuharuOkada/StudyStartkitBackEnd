import SoundPlayer from './sound-player';
import { mocked } from 'ts-jest/utils';
let mockPlaySoundFile = jest.fn().mockImplementation(() => console.log('wth'));
// jest.mock('./sound-player', () => {
//   return {
//     default: jest.fn().mockImplementation(() => {
//       return {
//         playSoundFile: mockPlaySoundFile,
//       };
//     }),
//   };
// });
describe('sound-player 1', () => {
  const mockSoundPlayer = mocked(SoundPlayer);
  beforeAll(() => {
    jest
      .spyOn(SoundPlayer.prototype, 'playSoundFile')
      .mockImplementation(() => console.log('cool'));
    // Clear all instances and calls to constructor and all methods:
  });

  it('We can check if the consumer called the class constructor', () => {
    const soundPlayerConsumer = new SoundPlayer();
    // Constructor should have been called again:
    soundPlayerConsumer.playSongs(['file', '2', '3']);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
