import SoundPlayerConsumer from './sound-player-consumer';
import SP from './sound-player';
import { mocked } from 'ts-jest/utils';

const mockPlaySoundFile = jest.fn();
jest.mock('./sound-player', () => {
  return {
    default: jest.fn().mockImplementation(() => {
      return { playSoundFile: mockPlaySoundFile };
    }),
  };
});
const MockSoundPlayer = mocked(SP, true);
beforeEach(() => {
  MockSoundPlayer.mockClear();
  mockPlaySoundFile.mockClear();
});

it('The consumer should be able to call new() on SoundPlayer', () => {
  const soundPlayerConsumer = new SoundPlayerConsumer();
  // Ensure constructor created the object:
  expect(soundPlayerConsumer).toBeTruthy();
});

it('you can check if the consumer called the class constructor', () => {
  const soundPlayerConsumer = new SoundPlayerConsumer();
  expect(MockSoundPlayer).toHaveBeenCalledTimes(1);
});

it('you can check if the consumer called a method on the class instance', () => {
  const soundPlayerConsumer = new SoundPlayerConsumer();
  const coolSoundFileName = 'song.mp3';
  soundPlayerConsumer.playSomethingCool();
  expect(mockPlaySoundFile.mock.calls[0][0]).toEqual(coolSoundFileName);
});
