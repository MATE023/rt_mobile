import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { View, Text, Checkbox, RadioButton, Button, RadioGroup, Badge, TouchableOpacity } from 'react-native-ui-lib';
import { ScrollView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
//import { useLocalSearchParams } from 'expo-router';
import { Problem } from '../models/Problem';
import { Solution } from '../models/Solution';
import { Question } from '../models/Question';
import styles from '../assets/styles';
import SolutionDetailsBar from '../components/SolutionDetailsBar';
import SolutionModule from '../components/SolutionModule';
import PageDivider from '../components/PageDivider';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';


type Props = NativeStackScreenProps<RootStackParamList, 'ProblemDetails'>;

export default function ProblemScreen({ route, navigation }: Props) {
    //const { problemId } = useLocalSearchParams();
    const { problemId } = route.params
    const [isLoading, setLoading] = useState(true);
    const [loaded, error] = useFonts({
      'Proxima-Nova-Light': require('../assets/fonts/Proxima-Nova/ProximaNova-Light.ttf'),
      'Proxima-Nova-Regular': require('../assets/fonts/Proxima-Nova/ProximaNova-Regular.ttf'),
    });
    const [data, setData] = useState<Problem>(
        {
            id: "",
            title: "",
            description: "",
            difficulty: "",
            url: "",
            solutionIds: []
        }
    );
    const [solutions, setSolutions] = useState<Solution[]>([]);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questionIndex, setQuestionIndex] = useState(1);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [currSolutionId, setCurrSolutionId] = useState("1");
    const [currSolution, setCurrSolution] = useState<Solution>(
      {    
      id: "",
      problemId: "",
      questionIds: [],
      timeComplexity: "",
      spaceComplexity: ""
      }
    );
  
    const currentQuestion = questions[currentQuestionIndex];
  
    const handleOptionSelect = (option: string, correctAnswer: string, qIndex: number) => {
      if(qIndex == currentQuestionIndex){
        setSelectedOption(option);
        if(selectedOption == correctAnswer) {
          handleSubmit();
          handleNextQuestion();
        }
      }
    };
  
    const handleSubmit = () => {
      setShowResult(true);
    };
  
    const handleNextQuestion = () => {
      setShowResult(false);
      setSelectedOption(null);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    };

    const handleSolutions = (solutionId: string) => {
      setCurrSolutionId(solutionId);
      console.log(currSolutionId);
    }

    useEffect(() => {
        axios.get<Problem>(`https://rtapi-git-main-mateos-projects-b74250f3.vercel.app/problems/${problemId}`)
        .then(response => {
            setData(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
        console.log("run");

        axios.get<Solution[]>(`https://rtapi-git-main-mateos-projects-b74250f3.vercel.app/problems/${problemId}/solutions`)
        .then(response => {
            setSolutions(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    return (
        <ScrollView>
        <View>
            <Text marginL-13 marginR-13 marginT-13 style={{ fontFamily: 'Proxima-Nova-Regular' }}>{data.description}</Text>
            <Badge label={data.difficulty} backgroundColor='rgb(242, 242, 242)' labelStyle={styles.badgeLabel} borderColor="black" borderWidth={1} style={styles.problemBadge} size={20}/>
    <View style={styles.circleSection}>
    {solutions.map((solution) => (
      <View key={solution.id}>
        {(solution.id == currSolutionId) ? (
          <View>
            <TouchableOpacity style={styles.circle} onPress={() => handleSolutions(solution.id)}>
            <Text style={styles.selectedSolutionButtonText}>Solution {solution.id}</Text>
            </TouchableOpacity>
          </View>
          ) : (
              <TouchableOpacity style={styles.circle} onPress={() => handleSolutions(solution.id)}>
              <Text style={styles.solutionButtonText}>Solution {solution.id}</Text>
              </TouchableOpacity>
          )}
      </View>
    ))}
    </View>
    <PageDivider/>
    <SolutionDetailsBar solutionId={currSolutionId} />
    <SolutionModule sId ={currSolutionId} />
    </View>
    </ScrollView>
    
  );
}
