import axios from 'axios';
import { useFonts } from 'expo-font';
import React, { useEffect, useState } from 'react';
import { View, Text, RadioGroup, RadioButton } from 'react-native-ui-lib';
import AnswerChoices from './AnswerChoices';
import { ReactTyped } from 'react-typed';
import { Question } from '../models/Question';
import styles from '../assets/styles';

const SolutionModule: React.FC<{ sId: string }> = ({ sId }) => {
    const [loaded, error] = useFonts({
        'Proxima-Nova-Light': require('../assets/fonts/Proxima-Nova/ProximaNova-Light.ttf'),
        'Proxima-Nova-Regular': require('../assets/fonts/Proxima-Nova/ProximaNova-Regular.ttf'),
        'Proxima-Nova-Semibold': require('../assets/fonts/Proxima-Nova/ProximaNova-Semibold.ttf'),
    });
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [transcript, setTranscript] = useState(new Map<string, string>());

    const handleOptionSelect = (option: string, correctAnswer: string, qIndex: number, qText: string, aText: string) => {
      console.log(`correct answer: ${correctAnswer}\n`);
      console.log(`option: ${option}\n`);  
      if(qIndex == currentQuestionIndex){
        console.log(`$1: ${selectedOption} \n`);
          setSelectedOption(option);
          console.log(`$2: ${selectedOption} \n`);
          if(option == correctAnswer) {
            console.log(`${aText} a\n`);
            handleNextQuestion(qText, aText);
          }
        }
      };
    
      const handleNextQuestion = (qText: string, aText: string) => {
        setSelectedOption(null);
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setTranscript((transcript) => new Map(transcript.set(qText, aText)));
      };

    useEffect(() => {
      axios.get<Question[]>(`https://rtapi-git-main-mateos-projects-b74250f3.vercel.app/solutions/${sId}/questions`)
      .then(response => {
          setQuestions(response.data);
          for (const q of questions) 
          {
            setTranscript((transcript) => new Map(transcript.set(q.content, "")));
          }
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
    }, [])

    return (
        <View padding-20 bg-grey70 br40 style={styles.questionsBox}>
          
        <View>
              {questions.map((q, questionIndex) => (
                            <View key={q.id}>
                              {(questionIndex <= currentQuestionIndex) ? (
                                        <View>
                                        <View style={styles.questionSection}>
                                        <Text style={styles.questionsText}> <ReactTyped strings={[q.content]} typeSpeed={50} showCursor={false}/></Text>
                                      </View>
                                      {(questionIndex < currentQuestionIndex) ? (
                                      <View style={styles.answerChoicesSection}>
                                        <RadioGroup>
                                        {q.answerChoiceIds.map((choice) => (
                                          <View key={choice}>
                                            <AnswerChoices current={(questionIndex <= currentQuestionIndex)} answerChoice={choice} cAnswer={q.correctAnswer} index={questionIndex} qText={q.content} onAnswerClick={handleOptionSelect}/> 
                                          </View>
                                        ))}
                                        </RadioGroup>
                                        <Text style={styles.answerChoiceText}> <ReactTyped strings={[transcript.get(q.content) ?? '']} typeSpeed={30} showCursor={false}/></Text>
                                        <br/>
                                        <Text style={styles.questionsText}> <ReactTyped strings={["Correct!"]} typeSpeed={50} showCursor={false}/></Text>
                                      </View>
                                      ) : (                                    
                                      <View style={styles.answerChoicesSection}>
                                        <RadioGroup>
                                          {q.answerChoiceIds.map((choice) => (
                                            <View key={choice}>
                                              <AnswerChoices current={(questionIndex <= currentQuestionIndex)} answerChoice={choice} cAnswer={q.correctAnswer} index={questionIndex} qText={q.content} onAnswerClick={handleOptionSelect}/> 
                                            </View>
                                        ))}
                                        </RadioGroup>                                   
                                      </View>)}
                                    
                                      </View>
                                ) : (<></>)}
                             </View>
                ))}
        </View>
      </View>
    );
  };
  
  export default SolutionModule;