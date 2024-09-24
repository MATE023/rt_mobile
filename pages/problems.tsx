import Ionicons from '@expo/vector-icons/Ionicons';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Pressable, Text, View} from 'react-native';
import axios from 'axios';
import { Card } from 'react-native-ui-lib';
import { Problem } from '../models/Problem';
import ProblemCard from '../components/ProblemCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Problems'>;

export default function ProblemsScreen({ route, navigation }: Props) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<Problem[]>([]);

    function goToProblem(problemId: string, problemTitle: string) {
        navigation.navigate( 'ProblemDetails', 
            {
                problemId: problemId,
                problemTitle: problemTitle,
            });
    }

    useEffect(() => {
        axios.get<Problem[]>('https://rtapi-git-main-mateos-projects-b74250f3.vercel.app/problems')
        .then(response => {
            setData(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    return (
        <View style={{flex: 1, padding: 24}}>
            {data.map((item) => (
                <View key={item.id}>
                    <ProblemCard title={item.title} difficulty={item.difficulty} problemId={item.id} link={item.description} onClick={goToProblem}/>
                </View>
            ))}
            {/*
        <Link href={{ pathname: '/problemView', params: { problemId : '1' } }} asChild>
        <Pressable style={{ padding: 20, backgroundColor: 'lightblue' }}>
          <Text>Go to Details</Text>
        </Pressable>
      </Link>
      */}
    </View>
  );
}
