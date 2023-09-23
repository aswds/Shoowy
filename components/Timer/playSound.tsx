import { Audio } from "expo-av";

// Initialize the audio player
const soundObject = new Audio.Sound();

export async function playSoundAsync() {
  try {
    // Load the sound file
    await soundObject.loadAsync(
      require("../../assets/sounds/soundToChange.mp3")
    );

    // Play the loaded sound
    await soundObject.playAsync();
  } catch (error) {
    console.error("Error playing sound:", error);
  }
}

// Example usage:
// Replace 'soundfile.mp3' with the actual path to your sound file
