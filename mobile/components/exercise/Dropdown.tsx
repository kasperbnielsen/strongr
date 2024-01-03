import { Select } from '@tamagui/select';

import { ExerciseTypes as MuscleGroups } from '../../types';

export default function Dropdown({ data }: { data: string[] }) {
  return (
    <Select native>
      <Select.Trigger>
        <Select.Value placeholder='Search...' />
      </Select.Trigger>
      <Select.Content>
        <Select.ScrollUpButton />
        <Select.Viewport>
          <Select.Group>
            {data.map((x, i) => (
              <>
                <Select.Label />
                <Select.Item key={i} index={i} value={x}>
                  {x}
                  <Select.ItemText />
                </Select.Item>
              </>
            ))}
          </Select.Group>
        </Select.Viewport>
        <Select.ScrollDownButton />
      </Select.Content>
    </Select>
  );
}
