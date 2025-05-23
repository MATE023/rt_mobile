import axios from 'axios';
import { useFonts } from 'expo-font';
import React, { useEffect, useState } from 'react';
import { View, Text, RadioGroup, RadioButton } from 'react-native-ui-lib';
import AnswerChoices from './AnswerChoices';
import { ReactTyped } from 'react-typed';
import { Question } from '../models/Question';
import styles from '../assets/styles';
import { Answer } from '../models/Answer';

const SolutionModule: React.FC<{ pId: string }> = ({ pId }) => {
    const [loaded, error] = useFonts({
        'Proxima-Nova-Light': require('../assets/fonts/Proxima-Nova/ProximaNova-Light.ttf'),
        'Proxima-Nova-Regular': require('../assets/fonts/Proxima-Nova/ProximaNova-Regular.ttf'),
        'Proxima-Nova-Semibold': require('../assets/fonts/Proxima-Nova/ProximaNova-Semibold.ttf'),
    });
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [transcript, setTranscript] = useState(new Map<string, string>());
    const [answerChoices, setAnswerChoices] = useState<Answer[]>([]);

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
            //handleCurrentAnswerChoice(questions[currentQuestionIndex].id);
          }
        }
      };
    
      const handleNextQuestion = (qText: string, aText: string) => {
        setSelectedOption(null);
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        //setCurrentQuestionIndex(currentQuestionIndex + 1);
        //console.log({currentQuestionIndex});
        
        setTranscript((transcript) => new Map(transcript.set(qText, aText)));
      };

      const handleCurrentAnswerChoice = (qId: string) => {
        console.log({qId});
        axios.get<Answer[]>(`https://rt-api-nf0n.onrender.com/answers/question/${qId}`)
        .then(response => {
            setAnswerChoices(response.data);
        })
        .catch(error => {
            console.error('Error fetching answer data:', error);
        });
      }

      useEffect(() => {
        if(questions.length > 0 && currentQuestionIndex < questions.length) {
          handleCurrentAnswerChoice(questions[currentQuestionIndex].id);
        }
      }, [currentQuestionIndex, questions])

    useEffect(() => {
      axios.get<Question[]>(`https://rt-api-nf0n.onrender.com/questions/solutions/1`)
      .then(response => {
          setQuestions(response.data);
          //const qu = questions[0];
          //handleCurrentAnswerChoice(qu.id);
          const qu = response.data[0];
          handleCurrentAnswerChoice(qu.id);
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
                                          console.log({questionIndex})
                                          console.log({currentQuestionIndex})
                                        <View style={styles.questionSection}>
                                        <Text style={styles.questionsText}> <ReactTyped strings={[q.content]} typeSpeed={50} showCursor={false}/></Text>
                                      </View>
                                      {(questionIndex < currentQuestionIndex) ? (
                                      <View style={styles.answerChoicesSection}>
                                        console.log("111");
                                        <RadioGroup>
                                        {answerChoices.map((choice) => (
                                          <View key={choice.id}>
                                            <AnswerChoices current={(questionIndex <= currentQuestionIndex)} answerChoice={choice.id} cAnswer={q.correctAnswer} index={questionIndex} qText={q.content} onAnswerClick={handleOptionSelect}/> 
                                          </View>
                                        ))}
                                        </RadioGroup>
                                        <Text style={styles.answerChoiceText}> <ReactTyped strings={[transcript.get(q.content) ?? '']} typeSpeed={30} showCursor={false}/></Text>
                                        <br/>
                                        <Text style={styles.questionsText}> <ReactTyped strings={["Correct!"]} typeSpeed={50} showCursor={false}/></Text>
                                      </View>
                                      ) : (                               
                                      <View style={styles.answerChoicesSection}>
                                        console.log("000");     
                                        <RadioGroup>
                                          {answerChoices.map((choice) => (
                                            <View key={choice.id}>
                                              <AnswerChoices current={(questionIndex <= currentQuestionIndex)} answerChoice={choice.id} cAnswer={q.correctAnswer} index={questionIndex} qText={q.content} onAnswerClick={handleOptionSelect}/> 
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