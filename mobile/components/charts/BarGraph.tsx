import { View, Text, FlatList } from 'react-native';

export default function BarGraph({
  size,
  dataPoints,
  title,
}: {
  size: number;
  dataPoints: { name: string; value: number }[];
  title: string;
}) {
  function getMaxValue() {
    let max = 0;
    for (let i = 0; i < dataPoints.length; i++) {
      if (dataPoints[i].value > max) max = dataPoints[i].value;
    }

    return max + (max % 5) + 1;
  }

  function getChartParameters() {
    const arr = [];
    for (let i = 5; i > 0; i--) {
      arr.push((getMaxValue() / 5) * i);
    }
    console.log(arr);
    return arr;
  }

  return (
    <View
      style={{
        width: 20 * size,
        alignSelf: 'center',
        backgroundColor: 'lightgray',
        borderRadius: 4,
      }}
    >
      <Text style={{ textAlign: 'center', paddingVertical: 8, fontWeight: '600' }}>{title}</Text>
      <View
        style={{
          height: 10 * size,
          width: 20 * size,
          backgroundColor: 'lightgray',
          alignSelf: 'center',
          flex: 5,
          flexDirection: 'row',
          borderRadius: 4,
        }}
      >
        <View style={{ width: '10%', height: 10 * size }}>
          <FlatList
            data={getChartParameters()}
            renderItem={({ item, index }) => (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  borderRightColor: 'black',
                  borderRightWidth: 1,
                  borderStyle: 'solid',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    height: (10 * size) / 6,
                    fontSize: 10,
                    paddingTop: '12.5%',
                  }}
                >
                  {item}
                </Text>
                <Text style={{ position: 'absolute', right: 0 }}>-</Text>
              </View>
            )}
            style={{ height: '80%' }}
            contentContainerStyle={{ justifyContent: 'center' }}
          />
          <View style={{ height: (10 * size) / 6 }} />
        </View>
        <View style={{ width: '15%', bottom: 0 }}>
          <View
            style={{ height: ((10 * size) / dataPoints.length) * (dataPoints.length - 1), justifyContent: 'flex-end' }}
          >
            <View
              style={{
                backgroundColor: 'blue',
                height: ((10 * size) / 6.5) * (dataPoints[0].value / (getMaxValue() / 5)),
                width: '30%',
                alignSelf: 'center',
              }}
            />
          </View>
          <Text
            style={{
              textAlign: 'center',
              borderTopColor: 'black',
              borderTopWidth: 1,
              borderStyle: 'solid',
              height: (10 * size) / dataPoints.length,
            }}
          >
            {dataPoints[0].name}
          </Text>
        </View>
        <View style={{ width: '15%', bottom: 0, height: '100%' }}>
          <View
            style={{ height: ((10 * size) / dataPoints.length) * (dataPoints.length - 1), justifyContent: 'flex-end' }}
          >
            <View
              style={{
                backgroundColor: 'blue',
                height: ((10 * size) / 6.5) * (dataPoints[1].value / (getMaxValue() / 5)),
                width: '30%',
                alignSelf: 'center',
              }}
            />
          </View>
          <Text
            style={{
              textAlign: 'center',
              borderTopColor: 'black',
              borderTopWidth: 1,
              borderStyle: 'solid',
              height: (10 * size) / dataPoints.length,
            }}
          >
            {dataPoints[1].name}
          </Text>
        </View>
        <View style={{ width: '15%', bottom: 0, height: '100%' }}>
          <View
            style={{ height: ((10 * size) / dataPoints.length) * (dataPoints.length - 1), justifyContent: 'flex-end' }}
          >
            <View
              style={{
                backgroundColor: 'blue',
                height: ((10 * size) / 6.5) * (dataPoints[2].value / (getMaxValue() / 5)),
                width: '30%',
                alignSelf: 'center',
              }}
            />
          </View>
          <Text
            style={{
              textAlign: 'center',
              borderTopColor: 'black',
              borderTopWidth: 1,
              borderStyle: 'solid',
              height: (10 * size) / dataPoints.length,
            }}
          >
            {dataPoints[2].name}
          </Text>
        </View>
        <View style={{ width: '15%', bottom: 0, height: '100%' }}>
          <View
            style={{ height: ((10 * size) / dataPoints.length) * (dataPoints.length - 1), justifyContent: 'flex-end' }}
          >
            <View
              style={{
                backgroundColor: 'blue',
                height: ((10 * size) / 6.5) * (dataPoints[3].value / (getMaxValue() / 5)),
                width: '30%',
                alignSelf: 'center',
              }}
            />
          </View>
          <Text
            style={{
              textAlign: 'center',
              borderTopColor: 'black',
              borderTopWidth: 1,
              borderStyle: 'solid',
              height: (10 * size) / dataPoints.length,
            }}
          >
            {dataPoints[3].name}
          </Text>
        </View>
        <View style={{ width: '15%', bottom: 0, height: '100%' }}>
          <View
            style={{ height: ((10 * size) / dataPoints.length) * (dataPoints.length - 1), justifyContent: 'flex-end' }}
          >
            <View
              style={{
                backgroundColor: 'blue',
                height: ((10 * size) / 6.5) * (dataPoints[4].value / (getMaxValue() / 5)),
                width: '30%',
                alignSelf: 'center',
              }}
            />
          </View>
          <Text
            style={{
              textAlign: 'center',
              borderTopColor: 'black',
              borderTopWidth: 1,
              borderStyle: 'solid',
              height: (10 * size) / dataPoints.length,
            }}
          >
            {dataPoints[4].name}
          </Text>
        </View>
        <View style={{ width: '15%', bottom: 0, height: '100%' }}>
          <View
            style={{ height: ((10 * size) / dataPoints.length) * (dataPoints.length - 1), justifyContent: 'flex-end' }}
          >
            <View
              style={{
                backgroundColor: 'blue',
                height: ((10 * size) / 6) * (dataPoints[5].value / (getMaxValue() / 5)),
                width: '30%',
                alignSelf: 'center',
              }}
            />
          </View>
          <Text
            style={{
              textAlign: 'center',
              borderTopColor: 'black',
              borderTopWidth: 1,
              borderStyle: 'solid',
              height: (10 * size) / dataPoints.length,
            }}
          >
            {dataPoints[5].name}
          </Text>
        </View>
      </View>
    </View>
  );
}
