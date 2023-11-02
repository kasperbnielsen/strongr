import { TextInput } from 'react-native-gesture-handler';

export default function WorkoutTitleInput({
  title,
  setTitle,
}: {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <TextInput
      style={{
        fontSize: 24,
        width: '100%',
        // @ts-expect-error no clue why there is an error. it works perfectly (https://stackoverflow.com/questions/67655104/how-to-hide-the-react-native-focus-input-border)
        outlineStyle: 'none',
      }}
      value={title}
      onChangeText={setTitle}
      placeholder='Workout Title'
    />
  );
}
