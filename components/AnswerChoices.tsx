import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, Colors, Typography, View, Text, Badge, RadioGroup, RadioButton } from 'react-native-ui-lib';
import { Answer } from '../models/Answer';
import styles from '../assets/styles';

const AnswerChoices: React.FC<{ current: boolean, answerChoice: string, cAnswer: string, index: number, qText: string, onAnswerClick: (option: string, correctAnswer: string, qIndex: number, qText: string, aText: string) => void}> = ({ current, answerChoice, cAnswer, index, qText, onAnswerClick }) => {
    const [answerText, setAnswerText] = useState("");
    
    useEffect(() => {
        axios.get<Answer>(`https://rtapi-git-main-mateos-projects-b74250f3.vercel.app/answers/${answerChoice}`)
        .then(response => {
            const a = response.data;
            setAnswerText(a.content);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
      }, [])
    
    
    return (
    <View>
        {(current) ? (
            <View >
                <RadioButton value={answerChoice} size={15} label={answerText} labelStyle={styles.answerChoiceText} onPress={() => onAnswerClick(answerChoice, cAnswer, index, qText, answerText)}/>
            </View>  

            ) : (                                    
            <View>
                <RadioButton value={answerChoice} size={15} label={answerText} labelStyle={styles.answerChoiceText} onPress={() => onAnswerClick(answerChoice, cAnswer, index, qText, answerText)}/>
            </View>  
            )}
    </View>
    );
  };
  
  export default AnswerChoices;