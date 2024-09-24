import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, Button } from "react-native";
import { RootStackParamList } from '../App';
import { useFonts } from "expo-font";

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [fontsLoaded] = useFonts({
    'Proxima-Nova-Semibold': require('./../assets/fonts/Proxima-Nova/ProximaNova-Semibold.ttf'),
  });

    return (
  <View>
        <Text style={{ fontFamily: 'Proxima-Nova-Semibold' }}>Feed</Text>
        <Button
          title="Go to Details"
          onPress={() =>
            navigation.navigate('Problems')
          }
        />
      </View>
    );
  }