export default class SoundPlayer {
  private foo: string;
  constructor() {
    this.foo = 'bar';
  }

  playSoundFile(fileName: string) {
    console.log('Playing sound file ' + fileName);
  }
  playSongs(fileNames: string[]) {
    fileNames.forEach((song: string) => this.playSoundFile(song));
  }
}
