import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import { RootStackParamList } from '../App';
import { useFonts } from "expo-font";
import { Button } from "react-native-ui-lib";

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [fontsLoaded] = useFonts({
    'Proxima-Nova-Semibold': require('./../assets/fonts/Proxima-Nova/ProximaNova-Semibold.ttf'),
  });

    return (
  <View>
        <Text style={{ fontFamily: 'Proxima-Nova-Semibold' }}>Feed</Text>

        <Button label={'Problems'} size={Button.sizes.medium}           onPress={() =>
            navigation.navigate('Problems')
          }/>
      </View>
    );
  }