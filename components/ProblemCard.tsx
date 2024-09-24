//import { Link } from 'expo-router';
import { Link } from '@react-navigation/native';
import { Button, Pressable } from 'react-native';
import { Card, Colors, Typography, View, Text, Badge, TouchableOpacity } from 'react-native-ui-lib';

const ProblemCard: React.FC<{ title: string, difficulty: string, problemId: string, link: string, onClick: (problemId: string, problemTitle: string) => void }> = ({ title, difficulty, problemId, link, onClick}) => {
    return (
      <TouchableOpacity onPress={() => onClick(problemId, title)}>
      <Card
      style={{ margin: 10, padding: 10 }}
      enableShadow
      borderRadius={10}
      backgroundColor={Colors.white}
      containerStyle={{ borderColor:"#B3E9C7", borderWidth: 2 }}
    >
      {/*
      <Link href={{ pathname: '/problemView', params: { problemId : problemId } }} asChild>
      <Pressable style={{ padding: 20, backgroundColor: 'lightblue' }}>
          <Text>Go to Details</Text>
      </Pressable>
      </Link>
      */}
        <View>
          <Text style={{ ...Typography.text60, color: Colors.dark10 }}>
            {title}
          </Text>
          <Badge label={difficulty} size={16} backgroundColor={Colors.dark} />
        </View>
      </Card>
      </TouchableOpacity>
    );
  };
  
  export default ProblemCard;