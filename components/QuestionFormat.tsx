import { Card, Colors, Typography, View, Text, Badge, RadioGroup, RadioButton } from 'react-native-ui-lib';
import styles from '../assets/styles';
import { Question } from '../models/Question';

const QuestionFormat: React.FC<{ question: Question }> = ({ question }) => {
  function handleOptionSelect(choice: string): void {
    throw new Error('Function not implemented.');
  }

    return (
        <View>
        <View style={styles.questionSection}>
        <Text style={styles.questionsText}>{question.content}</Text>
      </View>
      <View style={styles.answerChoicesSection}>
        <RadioGroup>
{/*TODO: set answer choice to have id<View key={choice.id}></View>*/}
        {question.answerChoiceIds.map((choice) => (
            <RadioButton value={choice} size={15} label={choice} labelStyle={styles.answerChoiceText} onPress={() => handleOptionSelect(choice)}/>
        ))}
        </RadioGroup>
      </View>
      </View>
    );
  };
  
  export default QuestionFormat;