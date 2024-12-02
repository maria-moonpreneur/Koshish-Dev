// SoundPlayer.js
import Sound from 'react-native-sound';

let buttonSound = new Sound(require('./assets/button-click.mp3'), Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('Failed to load sound', error);
  }
});

export const playButtonSound = () => {
  buttonSound.stop(() => {
    buttonSound.play();
  });
};
