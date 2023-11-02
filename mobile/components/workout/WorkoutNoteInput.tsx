import { TextInput } from 'react-native-gesture-handler';

export default function WorkoutNoteInput({
  note,
  setNote,
}: {
  note: string;
  setNote: React.Dispatch<React.SetStateAction<string>>;
}) {
  return <TextInput value={note} onChangeText={setNote} placeholder='Notes...' />;
}
