const questionsData = {
  ELA: {
    '0-1 Month': [
      { id: 1, question: 'Frequent crying', apiField: 'frequentCrying' },
      { id: 2, question: 'Begins random vocalization rather than crying', apiField: 'crying' },
      { id: 3, question: 'Vowel like sounds similar to /b/ & /a/ predominate', apiField: 'vowel' },
    ],
    '2 Months': [
      { id: 1, question: 'Has a special cry for hunger', apiField: 'cryForHunger' },
      { id: 2, question: 'Sometimes repeats the same syllable while cooing or babbling', apiField: 'cooingBabbling' },
      { id: 3, question: 'Develops vocal signs of pleasure', apiField: 'vocalSings' },
    ],
    '3 Months': [
      { id: 1, question: 'Occasionally responds to sound stimulation on speech by vocalizing', apiField: 'vocalExpression' },
      { id: 2, question: 'When played with, laughs & uses other vocal expressions of pleasure', apiField: 'watchesLips' },
      { id: 3, question: 'Often vocalizes with two or more different syllables', apiField: 'vocalizesSyllables' },
    ],
    '4 Months': [
      { id: 1, question: 'Often laughs during play with objects', apiField: 'laughPlayObject' },
      { id: 2, question: 'Babbles regularly especially when alone', apiField: 'babblesRegularly' },
      { id: 3, question: 'Often uses sounds like /p/, /b/ and /m/', apiField: 'usesSound' },
    ],
    '5 Months': [
      { id: 1, question: 'Uses vowel like sounds similar to /00/ and /w/', apiField: 'vovelLikeSound' },
      { id: 2, question: 'Usually stops babbling responds to vocal stimulus but may occasionally continue babbling for a short time', apiField: 'occassinallyBabble' },
    ],
    '6 Months': [
      { id: 1, question: 'Takes the initiative in localizing and babbling directly at others', apiField: 'localizing' },
      { id: 2, question: 'Plays at making sounds and noises while alone or with others', apiField: 'makisnSounds' },
    ],
    '7 Months': [
      { id: 1, question: 'Uses some words like vocal expressions (naming)', apiField: 'vocalExpression' },
      { id: 2, question: 'Begins some two syllables babbling (repeats combination of two or more different sounds)', apiField: 'syllablesBabbling' },
    ],
    '8 Months': [
      { id: 1, question: 'Occasionally vocalizes in sentence-like utterances', apiField: 'wholeConversation' },
      { id: 2, question: 'Plays speech gestures games like pat-a-cake', apiField: 'speechGesturesGame' },
      { id: 3, question: 'Occasionally sings with some familiar songs with true words', apiField: 'occassionallySings' },
    ],
    '9 Months': [
      { id: 1, question: 'Uses some gestural language such as shaking head for NO', apiField: 'shakingHead' },
      { id: 2, question: 'Often mimics the sounds and number of syllables used in vocal stimulation', apiField: 'vocalStimulation' },
      { id: 3, question: 'More consonants appear than at 6 months stage', apiField: 'moreConsonants' },
    ],
    '10 Months': [
      { id: 1, question: 'Speaks first words, often mama or name of a pet', apiField: 'nameOfPet' },
      { id: 2, question: 'Uses some exclamations like "oh-oh"', apiField: 'exclaimations' },
      { id: 3, question: 'Often uses jargons or short sentence-like utterances of 4 or more syllables without true words', apiField: 'trueWords' },
    ],
    '11 Months': [
      { id: 1, question: 'Usually vocalizes in varied jargon patterns while sitting down', apiField: 'variedJaergon' },
      { id: 2, question: 'Initiates speech gestures games like pat-a-cake', apiField: 'initiateSpeech' },
      { id: 3, question: 'Occasionally tries to imitate new words', apiField: 'imitateWords' },
    ],
    '12 Months': [
      { id: 1, question: 'Uses 3 or more words with some consistency', apiField: 'verbalResponses' },
      { id: 2, question: 'Talks to toys and people throughout the day using long verbal patterns', apiField: 'verbalPattern' },
      { id: 3, question: 'Frequently responds to songs or rhymes by vocalizing', apiField: 'vocalizing' },
    ],
    '13-14 Months': [
      { id: 1, question: 'Uses 5 or more true words with some consistency', apiField: 'newWords' },
      { id: 2, question: 'Attempts to obtain desired objects by voice in conjunction with gestures and pointing', apiField: 'desired' },
      { id: 3, question: 'Some true words now occur in jargon utterances', apiField: 'utarances' },
    ],
    '15-16 Months': [
      { id: 1, question: 'Consistently uses 7 or more true words', apiField: 'trueWords' },
      { id: 2, question: 'More frequent use of consonants like /t/, /d/, /w/, /n/, /h/', apiField: 'frequentUse' },
      { id: 3, question: 'Most communication with true words and gestures', apiField: 'wordsWith' },
    ],
    '17-18 Months': [
      { id: 1, question: 'Begins using words rather than gestures to express wants and needs', apiField: 'wantsAndNeeds' },
      { id: 2, question: 'Begins repeating words overheard in conversation', apiField: 'heardConversation' },
      { id: 3, question: 'Evidences a continual but gradual increase in speaking vocabulary', apiField: 'speakingVocabulart' },
    ],
    '19-20 Months': [
      { id: 1, question: 'Imitates some 2 or 3 word utterances', apiField: 'utterances' },
      { id: 2, question: 'Imitates environmental sounds (motor) while playing', apiField: 'playing' },
      { id: 3, question: 'Has a speaking vocabulary of at least 10-20 words', apiField: 'vocabulary' },
    ],
    '21-22 Months': [
      { id: 1, question: 'Begins combining words into simple sentences like "go bye-bye"', apiField: 'sentences' },
      { id: 2, question: 'Speaks more and more new words each week', apiField: 'newWords' },
      { id: 3, question: 'Attempts to tell about experiences using combinations of jargons and true words', apiField: 'experiences' },
    ],
    '23-24 Months': [
      { id: 1, question: 'Occasionally uses 3-word sentences (such as “there it is”, “play with blocks”)', apiField: 'wordSentences' },
      { id: 2, question: 'Refers to self by using his or her own name', apiField: 'ownName' },
      { id: 3, question: 'Begins using some pronouns but makes errors in syntax', apiField: 'pronouns' },
    ],
    '25-27 Months': [
      { id: 1, question: 'Usually uses 2 or 3 word sentences', apiField: 'sentences' },
      { id: 2, question: 'Often uses personal pronouns correctly (I, you, he, me, it, etc)', apiField: 'personalPronouns' },
      { id: 3, question: 'Asks for help with some personal needs such as washing hands, going to the toilet, etc.', apiField: 'personalNeeds' },
    ],
    '28-30 Months': [
      { id: 1, question: 'Names at least one object correctly', apiField: 'nameCorrectly' },
      { id: 2, question: 'Refers to self by using a pronoun rather than by his or her proper name', apiField: 'properName' },
      { id: 3, question: 'Repeats two or more numbers correctly', apiField: 'repeats' },
    ],
    '31-33 Months': [
      { id: 1, question: 'Tells gender when asked “Are you a boy or girl?”', apiField: 'tellsGender' },
      { id: 2, question: 'Names and talks about what he or she has scribbled or drawn when asked', apiField: 'scribbledOrDrawn' },
    ],
    '34-36 Months': [
      { id: 1, question: 'Regularly relates experiences from the recent past (what happened while he or she was "out or separated from parents")', apiField: 'experiences' },
      { id: 2, question: 'Uses several verb forms correctly in relating what is going on in action pictures', apiField: 'actionPictures' },
      { id: 3, question: 'Uses some plural forms correctly in speech', apiField: 'pluralForms' },
    ],
    '3-3.6 Years': [
      { id: 1, question: 'Identifies five primary colours and names', apiField: 'primaryColours' },
      { id: 2, question: 'Uses cannot, don’t, and plural markers', apiField: 'pluralMarkers' },
      { id: 3, question: 'Has a vocabulary of more than 1000 words and uses he, she, and they', apiField: 'vocabulary' },
      { id: 4, question: 'Uses 3-word sentences and is non-fluent', apiField: 'nonFluent' },
    ],
    '3.7-4 Years': [
      { id: 1, question: 'Uses verbs predominantly', apiField: 'predominantly' },
      { id: 2, question: 'Uses 3-4 word sentences and is non-fluent', apiField: 'nonFluent' },
      { id: 3, question: 'Identifies all major colours and names', apiField: 'coloursNames' },
      { id: 4, question: 'Uses simple present and future tense with feminine and masculine gender markers', apiField: 'usesSimplePresent' },
      { id: 5, question: 'Uses remote/proximate terms', apiField: 'remoteProximate' },
    ],
    '4-4.6 Years': [
      { id: 1, question: 'Uses below, inside, on top, out, what, where, who, why, whose, how', apiField: 'usesBelow' },
      { id: 2, question: 'Uses adjectives like little, fat, black', apiField: 'phrasesAdjective' },
      { id: 3, question: 'Tends to enact body posture and gestures when telling a story', apiField: 'posturesGestures' },
      { id: 4, question: 'Uses 4-word sentences and is non-fluent', apiField: 'nonFluent' },
      { id: 5, question: 'Can narrate a story on his or her own', apiField: 'narrateStory' },
      { id: 6, question: 'Uses past continuous tenses', apiField: 'usesContinuousTense' },
    ],
    '4.7-5 Years': [
      { id: 1, question: 'Has a vocabulary of 1500-2500 words and is non-fluent', apiField: 'vocabulary' },
      { id: 2, question: 'Uses past irregular verbs (went, caught)', apiField: 'irregularVerb' },
      { id: 3, question: 'Uses all who questions', apiField: 'questions' },
      { id: 4, question: 'Uses “how much” for comparison and numbers', apiField: 'usesHowMuch' },
      { id: 5, question: 'Can write all letters of the alphabet', apiField: 'realALLALphabates' },
    ],
    '5-6 Years': [
      { id: 1, question: 'Uses 5-6 word sentences and is fluent', apiField: 'usesSentences' },
      { id: 2, question: 'Uses embedded clauses to add further information', apiField: 'embededSentence' },
      { id: 3, question: 'Matches words to objects', apiField: 'wordsToObjects' },
      { id: 4, question: 'Uses all who questions and yes/no questions', apiField: 'usesAllWhoQuestions' },
      { id: 5, question: 'Writing skills', apiField: 'writing' },
    ],
    '6-7 Years': [
      { id: 1, question: 'Uses 6-7 word sentences', apiField: 'wordSentences' },
      { id: 2, question: 'Uses double adjectives in noun phrases', apiField: 'adjectiveNouns' },
      { id: 3, question: 'Uses coordinators like "and", "but", "if", "so"', apiField: 'usesCoordinates' },
      { id: 4, question: 'Speech is fluent and intelligible', apiField: 'speechIntelligible' },
      { id: 5, question: 'Can articulate all the sounds in his or her language', apiField: 'articulateLanguage' },
    ],
  },

  RLA: {
    '0-1 Month': [
      { id: 1, question: 'Startle response to loud noises', apiField: 'loudNoises' },
      { id: 2, question: 'Activity arrested when approached by sound', apiField: 'activityArrested' },
      { id: 3, question: 'Often quieted by a familiar friendly voice', apiField: 'oftenQuieted' },
    ],
    '2 Months': [
      { id: 1, question: 'Frequently gives direct attention to other voices', apiField: 'directAttention' },
      { id: 2, question: 'Appears to listen to speaker', apiField: 'listentoSpeaker' },
      { id: 3, question: 'Often looks at speaker and responds by smiling', apiField: 'responseBySmile' },
    ],
    '3 Months': [
      { id: 1, question: 'Responds to speech by looking directly at speaker\'s face', apiField: 'lookingAtSpeaker' },
      { id: 2, question: 'Regularly localizes speaker with eyes', apiField: 'localizesSpeaker' },
      { id: 3, question: 'Frequently watches lips and mouth of speaker', apiField: 'watchesLips' },
    ],
    '4 Months': [
      { id: 1, question: 'Turns head deliberately towards the source of voice', apiField: 'turnsHead' },
      { id: 2, question: 'Looks about in search of speaker', apiField: 'looksAbout' },
      { id: 3, question: 'Usually frightened or disturbed by angry voices', apiField: 'angryVoice' },
    ],
    '5 Months': [
      { id: 1, question: 'Regularly localizes source of voice with accuracy', apiField: 'localizesSource' },
      { id: 2, question: 'Recognizes or responds to his or her own name', apiField: 'respondsToHisName' },
    ],
    '6 Months': [
      { id: 1, question: 'Appears by facial and gestures to be able to distinguish general meanings of warning, anger, and friendly voice patterns', apiField: 'friendlyVoicePattern' },
      { id: 2, question: 'Appears to recognize words like "daddy", "bye-bye", etc.', apiField: 'recognizeWords' },
    ],
    '7 Months': [
      { id: 1, question: 'Responds in appropriate gestures to such words as "come", "hi", "bye-bye", etc.', apiField: 'appropriateGestured' },
      { id: 2, question: 'Appears to recognize names of family members in connected speech even when the person named is not in sight', apiField: 'recognizesNames' },
    ],
    '8 Months': [
      { id: 1, question: 'Frequently appears to listen to whole conversations between others', apiField: 'wholeConversation' },
      { id: 2, question: 'Regularly stops activity when called', apiField: 'stopsActivity' },
      { id: 3, question: 'Appears to recognize the names of common objects when spoken', apiField: 'recognizeName' },
    ],
    '9 Months': [
      { id: 1, question: 'Appears to understand some simple verbal requests', apiField: 'simpeVerbal' },
      { id: 2, question: 'Regularly stops activity in response to "NO"', apiField: 'responseToNo' },
      { id: 3, question: 'Sustains interest for up to a full minute in looking at pictures if they are named', apiField: 'arcNamed' },
    ],
    '10 Months': [
      { id: 1, question: 'Appears to enjoy listening to new words', apiField: 'enjoyListening' },
      { id: 2, question: 'Generally able to listen to speech without being distracted by other sounds', apiField: 'listenToSpeech' },
      { id: 3, question: 'Often gives toys or other objects to a parent on verbal request', apiField: 'verbalRequest' },
    ],
    '11 Months': [
      { id: 1, question: 'Occasionally follows simple commands like "put playing alone"', apiField: 'simpleCommands' },
      { id: 2, question: 'Appears to understand simple questions like "where is the ball?"', apiField: 'simpleQuestions' },
      { id: 3, question: 'Responds to rhythmic music by bodily or hand movements in approximate time to music', apiField: 'rhythmicMusic' },
    ],
    '12 Months': [
      { id: 1, question: 'Demonstrates understanding by responding to appropriate gestures to several kinds of verbal requests', apiField: 'appropriateGestures' },
      { id: 2, question: 'Generally shows intense attention and responds to speech over a prolonged period of time', apiField: 'intenseAttention' },
      { id: 3, question: 'Demonstrates understanding by making appropriate verbal responses to some requests (says "bye-bye")', apiField: 'verbalResponses' }
    ],
    '13-14 Months': [
      { id: 1, question: 'Appears to understand some new words each week', apiField: 'newWords' },
      { id: 2, question: 'Seems to understand the psychological feelings and shades of meanings of most speakers', apiField: 'shadesOfMeaning' },
      { id: 3, question: 'Will sustain interest for two or more minutes in looking at pictures if they are named', apiField: 'lookingAtPictures' },
    ],
    '15-16 Months': [
      { id: 1, question: 'Demonstrates understanding by carrying out verbal requests to select and bring some familiar object from another room', apiField: 'anotherRoom' },
      { id: 2, question: 'Recognizes and identifies many objects and pictures when they are named', apiField: 'recognizing' },
      { id: 3, question: 'Clearly recognizes names of various parts of the body', apiField: 'nameOFBody' },
    ],
    '17-18 Months': [
      { id: 1, question: 'Comprehends simple questions and carries out two consecutive directions with the ball or other objects', apiField: 'consecutiveDirections' },
      { id: 2, question: 'Remembers and associates new words by categories (e.g., animals)', apiField: 'categories' },
      { id: 3, question: 'From a single request, identifies two or more familiar objects from a group of four or more', apiField: 'familiarObjects' },
    ],
    '19-20 Months': [
      { id: 1, question: 'Upon verbal request, points to several parts of the body and various items of clothing shown in large pictures', apiField: 'largePictures' },
      { id: 2, question: 'Demonstrates understanding by appropriate responses to such action words as "sit down" and "come here"', apiField: 'appropriateResponses' },
      { id: 3, question: 'Demonstrates understanding of distinctions in personal pronouns such as "give it to him"', apiField: 'personalPronouns' },
    ],
    '21-22 Months': [
      { id: 1, question: 'Follows a series of two or three very simple but related commands', apiField: 'relatedCommand' },
      { id: 2, question: 'Recognizes new words daily at an increasing rate', apiField: 'increasingRate' },
      { id: 3, question: 'Recognizes and identifies almost all common objects and pictures of common objects when they are named', apiField: 'commonObjects' },
    ],
    '23-24 Months': [
      { id: 1, question: 'Upon verbal request, selects an item from a group of four or more varied items (e.g., comb, spoon, etc.)', apiField: 'verbalRequest' },
      { id: 2, question: 'Appears to listen to the meaning and reasoning behind language utterances, not just words or sounds', apiField: 'wordsOrSound' },
      { id: 3, question: 'Understands most complex sentences (e.g., “when we get to the store, I’ll buy you an ice cream”)', apiField: 'complexSentences' },
    ],
    '25-27 Months': [
      { id: 1, question: 'Demonstrates understanding of several action words (verb forms) by selecting appropriate pictures (e.g., correctly chooses which picture shows "sitting")', apiField: 'severalAction' },
      { id: 2, question: 'When asked, points to smaller parts of the body, such as chin, elbow, eyebrow, etc.', apiField: 'smallerParts' },
      { id: 3, question: 'Recognizes and identifies general family categories such as baby, mother, grandmother, etc.', apiField: 'familyCatagories' },
    ],
    '28-30 Months': [
      { id: 1, question: 'Demonstrates understanding of word associations through functional identification (e.g., correctly answers such questions as "what do you do with your car?")', apiField: 'identification' },
      { id: 2, question: 'Understands size differences (e.g., small vs. large)', apiField: 'sizeDifferences' },
      { id: 3, question: 'Recognizes the names and pictures of most common objects', apiField: 'commonObjects' },
    ],
    '31-33 Months': [
      { id: 1, question: 'Understands very long and complex sentences', apiField: 'complexSentences' },
      { id: 2, question: 'Demonstrates understanding of most common adjectives', apiField: 'commonAdjectives' },
    ],
    '34-36 Months': [
      { id: 1, question: 'Shows interest in explanations of "why" things happen and "how" things function', apiField: 'interested' },
      { id: 2, question: 'Carries out three simple verbal commands given in one long utterance', apiField: 'longUtterance' },
      { id: 3, question: 'Demonstrates understanding of prepositions (e.g., on, under, in front, behind, etc.)', apiField: 'preposition' },
    ],
    '3-3.6 Years': [
      { id: 1, question: 'Comprehends "how much" and numerical markers', apiField: 'markerTest' },
      { id: 2, question: 'Comprehends "no" used to indicate non-existence', apiField: 'nonExistance' },
      { id: 3, question: 'Understands contrasts in third-person singular pronouns', apiField: 'singularPronouns' },
      { id: 4, question: 'Comprehends embedded sentences (e.g., "show the dog which is running")', apiField: 'enbededSentences' },
    ],
    '3.7-4 Years': [
      { id: 1, question: 'Points out animals, objects, and foods from a large group of other pictures', apiField: 'pointsOut' },
      { id: 2, question: 'Recognizes time in pictures and all colours', apiField: 'recognizesTime' },
      { id: 3, question: 'Comprehends simple present and future tense with feminine and masculine genders', apiField: 'feminineMasculine' },
      { id: 4, question: 'Comprehends demonstrative nouns such as this, that, there', apiField: 'demonstrativeNouns' },
      { id: 5, question: 'Comprehends comparison sentences', apiField: 'comparisonSentence' },
    ],
    '4-4.6 Years': [
      { id: 1, question: 'Comprehends "how far", "a little", "all", "a few", "you both"', apiField: 'comprehendsHowFar' },
      { id: 2, question: 'Comprehends simple past and past continuous tenses', apiField: 'continuousTense' },
      { id: 3, question: 'Comprehends causative verbal sentences (e.g., "I got it done by him")', apiField: 'verbalSentences' },
      { id: 4, question: 'Comprehends yes-no question types', apiField: 'yesNoQuestion' },
      { id: 5, question: 'Comprehends noun/phrase with adjectives (e.g., "big red house")', apiField: 'phrasesAdjective' },
      { id: 6, question: 'Distinguishes between comparative/superlative degrees', apiField: 'superlativeDegree' },
    ],
    '4.7-5 Years': [
      { id: 1, question: 'Comprehends opposite concepts (e.g., "brother is a boy", "sister is a girl")', apiField: 'oppositConcepts' },
      { id: 2, question: 'Comprehends singular/plural contrasts for nouns', apiField: 'contrastOfNouns' },
      { id: 3, question: 'Comprehends prepositions (e.g., at the side of, in front of, between)', apiField: 'comprohendsPreposition' },
      { id: 4, question: 'Can identify most of the alphabet and can discriminate appropriate pictures in response to speech', apiField: 'criminatePictures' },
      { id: 5, question: 'Can read all the letters in his or her language', apiField: 'realALLALphabates' },
    ],
    '5-6 Years': [
      { id: 1, question: 'Comprehends quantitative adjectives (e.g., many, few)', apiField: 'quantitativeAdjectives' },
      { id: 2, question: 'Comprehends verbs (is vs. are)', apiField: 'comprehendVerbs' },
      { id: 3, question: 'Distinguishes between can/cannot', apiField: 'distinguishesCanCannot' },
      { id: 4, question: 'Vocabulary understanding of around 16,000 words', apiField: 'understandingAbout' },
      { id: 5, question: 'Reading', apiField: 'reading' },
    ],
    '6-7 Years': [
      { id: 1, question: 'Comprehends the meaning of half', apiField: 'meaningOfHalf' },
      { id: 2, question: 'Comprehends the meaning of quantity adjectives', apiField: 'meaningOfQuantity' },
      { id: 3, question: 'Comprehends the meaning of quality adjectives (e.g., soft, fast)', apiField: 'qualityAdjectives' },
      { id: 4, question: 'Comprehends personal gender pronouns (he, she, it)', apiField: 'genderPronouns' },
      { id: 5, question: 'Comprehends passive voice and future tense', apiField: 'passiveVoices' },
    ],
  },
};

import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, ActivityIndicator, ImageBackground, Image, Modal, Alert } from 'react-native';
import { Koulen_400Regular } from '@expo-google-fonts/koulen';
import { useFonts } from 'expo-font';
import DateTimePicker from '@react-native-community/datetimepicker';

const { width } = Dimensions.get('window');

const ELARLATest = ({ navigation }) => {
  const [currentSection, setCurrentSection] = useState('ELA');
  const [currentSubSection, setCurrentSubSection] = useState('0-1 Month');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [ageInMonths, setAgeInMonths] = useState(null);
  const [responses, setResponses] = useState({});
  const [sectionCompleted, setSectionCompleted] = useState({
    ELA: false,
    RLA: false,
  });
  const [modalVisible, setModalVisible] = useState(true);
  const [birthdate, setBirthdate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const scrollViewRef = useRef(null);
  let [fontsLoaded] = useFonts({ Koulen_400Regular });

  const calculateAgeInMonths = (birthdate) => {
    const now = new Date();
    return (now.getFullYear() - birthdate.getFullYear()) * 12 + (now.getMonth() - birthdate.getMonth());
  };

  const handleConfirmDate = () => {
    const ageMonths = calculateAgeInMonths(birthdate);
    setAgeInMonths(ageMonths);
    setCurrentSubSection(findInitialSubSection(ageMonths, 'ELA'));
    setModalVisible(false);
  };

  const findInitialSubSection = (ageMonths) => {
    const ageMap = [
      { range: [0, 1], label: '0-1 Month' },
      { range: [2, 2], label: '2 Months' },
      { range: [3, 3], label: '3 Months' },
      { range: [4, 4], label: '4 Months' },
      { range: [5, 5], label: '5 Months' },
      { range: [6, 6], label: '6 Months' },
      { range: [7, 7], label: '7 Months' },
      { range: [8, 8], label: '8 Months' },
      { range: [9, 9], label: '9 Months' },
      { range: [10, 10], label: '10 Months' },
      { range: [11, 11], label: '11 Months' },
      { range: [12, 12], label: '12 Months' },
      { range: [13, 14], label: '13-14 Months' },
      { range: [15, 16], label: '15-16 Months' },
      { range: [17, 18], label: '17-18 Months' },
      { range: [19, 20], label: '19-20 Months' },
      { range: [21, 22], label: '21-22 Months' },
      { range: [23, 24], label: '23-24 Months' },
      { range: [25, 27], label: '25-27 Months' },
      { range: [28, 30], label: '28-30 Months' },
      { range: [31, 33], label: '31-33 Months' },
      { range: [34, 36], label: '34-36 Months' },
      { range: [37, 42], label: '3-3.6 Years' },
      { range: [43, 48], label: '3.7-4 Years' },
      { range: [49, 54], label: '4-4.6 Years' },
      { range: [55, 60], label: '4.7-5 Years' },
      { range: [61, 72], label: '5-6 Years' },
      { range: [73, 84], label: '6-7 Years' },
    ];
    const section = ageMap.find((section) => ageMonths >= section.range[0] && ageMonths <= section.range[1]);
    return section ? section.label : Object.keys(questionsData[currentSection])[0];
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const handleDateChange = (event, selectedDate) => {
    setDatePickerVisible(false);
    if (selectedDate) {
      setBirthdate(selectedDate);
    }
  };

  useEffect(() => {
    if (sectionCompleted.ELA && sectionCompleted.RLA) {
      navigation.navigate('FinalAnswers', {
        responses,
        questionsData,
        ageInMonths,
      });
    }
  }, [sectionCompleted]);

  const moveToNext = () => {
    const currentQuestions = questionsData[currentSection][currentSubSection] || [];
    const relevantSubSections = getRelevantSubSections(ageInMonths);

    if (currentQuestionIndex < currentQuestions.length - 1) {
      // Move to next question within the current subsection
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Move to the next subsection within the current section
      const currentSubSectionIndex = relevantSubSections.indexOf(currentSubSection);
      if (currentSubSectionIndex < relevantSubSections.length - 1) {
        setCurrentSubSection(relevantSubSections[currentSubSectionIndex + 1]);
        setCurrentQuestionIndex(0);
      } else {
        // If all subsections in the current section are completed, mark the section as completed
        setSectionCompleted((prev) => ({ ...prev, [currentSection]: true }));

        // Switch to the other section if it's not completed
        const nextSection = currentSection === 'ELA' ? 'RLA' : 'ELA';
        if (!sectionCompleted[nextSection]) {
          setCurrentSection(nextSection);
          setCurrentSubSection(findInitialSubSection(ageInMonths));
          setCurrentQuestionIndex(0);
        }
      }
    }
  };

  const handleYes = () => {
    const currentQuestion = questionsData[currentSection][currentSubSection][currentQuestionIndex];
    setResponses((prev) => ({
      ...prev,
      [currentQuestion.apiField]: true,
    }));
    moveToNext();
  };

  const handleNo = () => {
    const currentQuestion = questionsData[currentSection][currentSubSection][currentQuestionIndex];
    setResponses((prev) => ({
      ...prev,
      [currentQuestion.apiField]: false,
    }));
    moveToNext();
  };

  const getRelevantSubSections = (ageMonths) => {
    const ageMap = [
      { range: [0, 1], label: '0-1 Month' },
      { range: [2, 2], label: '2 Months' },
      { range: [3, 3], label: '3 Months' },
      { range: [4, 4], label: '4 Months' },
      { range: [5, 5], label: '5 Months' },
      { range: [6, 6], label: '6 Months' },
      { range: [7, 7], label: '7 Months' },
      { range: [8, 8], label: '8 Months' },
      { range: [9, 9], label: '9 Months' },
      { range: [10, 10], label: '10 Months' },
      { range: [11, 11], label: '11 Months' },
      { range: [12, 12], label: '12 Months' },
      { range: [13, 14], label: '13-14 Months' },
      { range: [15, 16], label: '15-16 Months' },
      { range: [17, 18], label: '17-18 Months' },
      { range: [19, 20], label: '19-20 Months' },
      { range: [21, 22], label: '21-22 Months' },
      { range: [23, 24], label: '23-24 Months' },
      { range: [25, 27], label: '25-27 Months' },
      { range: [28, 30], label: '28-30 Months' },
      { range: [31, 33], label: '31-33 Months' },
      { range: [34, 36], label: '34-36 Months' },
      { range: [37, 42], label: '3-3.6 Years' },
      { range: [43, 48], label: '3.7-4 Years' },
      { range: [49, 54], label: '4-4.6 Years' },
      { range: [55, 60], label: '4.7-5 Years' },
      { range: [61, 72], label: '5-6 Years' },
      { range: [73, 84], label: '6-7 Years' },
    ];

    return ageMap.filter((section) => ageMonths >= section.range[0]).map((section) => section.label);
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const currentQuestions = questionsData[currentSection][currentSubSection] || [];

  return (
    <ImageBackground source={require('../assets/Shape.png')} style={styles.background}>
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Child's Birthdate</Text>
            <TouchableOpacity onPress={showDatePicker} style={styles.dateButton}>
              <Text style={styles.dateButtonText}>{birthdate.toDateString()}</Text>
            </TouchableOpacity>
            {datePickerVisible && (
              <DateTimePicker
                value={birthdate}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmDate}>
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.container}>
        <View style={styles.tabsContainer}>
          {['ELA', 'RLA'].map((section) => (
            <TouchableOpacity
              key={section}
              style={[styles.tab, currentSection === section ? styles.activeTab : {}]}
              onPress={() => setCurrentSection(section)}
            >
              <Text style={currentSection === section ? styles.activeTabText : styles.tabText}>
                {section}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={scrollViewRef}
          style={styles.subTabsContainer}
          contentContainerStyle={styles.subTabsContentContainer}
        >
          {getRelevantSubSections(ageInMonths).map((subSection) => (
            <TouchableOpacity
              key={subSection}
              style={[styles.subTab, currentSubSection === subSection ? styles.activeSubTab : {}]}
              onPress={() => setCurrentSubSection(subSection)}
            >
              <Text style={currentSubSection === subSection ? styles.activeSubTabText : styles.subTabText}>
                {subSection}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            {currentQuestions[currentQuestionIndex]?.question}
          </Text>
          <Text style={styles.questionCount}>
            {currentQuestionIndex + 1} of {currentQuestions.length}
          </Text>
        </View>

        <Image source={require('../assets/Toys.png')} style={styles.toysImage} />

        <View style={styles.answerContainer}>
          <TouchableOpacity style={styles.yesButton} onPress={handleYes}>
            <Text style={styles.buttonText}>YES</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.noButton} onPress={handleNo}>
            <Text style={styles.buttonText}>NO</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover' },
  container: { flex: 1, alignItems: 'center', paddingTop: 30, marginTop: 40, marginBottom: 20 },
  tabsContainer: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginBottom: 20 },
  tab: { width: '40%', alignItems: 'center', paddingVertical: 10, borderRadius: 20 },
  activeTab: { backgroundColor: '#FFF', borderRadius: 20, elevation: 5 },
  tabText: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  activeTabText: { color: '#000' },
  subTabsContainer: { width: '100%', height: 50 },
  subTabsContentContainer: { alignItems: 'center', paddingLeft: 10 },
  subTab: { paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20, marginHorizontal: 5 },
  activeSubTab: { backgroundColor: '#FFF', borderRadius: 20, elevation: 5 },
  subTabText: { fontSize: 15, color: '#000', fontWeight: 'bold' },
  activeSubTabText: { color: '#000' },
  questionContainer: { padding: 20, backgroundColor: '#FFFFFF', borderRadius: 10, width: '80%', alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  questionText: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  questionCount: { marginTop: 10, fontSize: 14, color: '#888' },
  toysImage: { width: '80%', height: '30%', resizeMode: 'contain', marginVertical: 20 },
  answerContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginTop: 10 },
  yesButton: { width: '45%', paddingVertical: 13, backgroundColor: '#FFFFFF', borderRadius: 25, alignItems: 'center', opacity: 0.8 },
  noButton: { width: '45%', paddingVertical: 13, backgroundColor: '#FFFFFF', borderRadius: 25, alignItems: 'center', opacity: 0.8 },
  buttonText: { fontSize: 35, color: '#006769', fontFamily: 'Koulen_400Regular' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  confirmButton: { marginTop: 10, backgroundColor: '#006769', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 },
  confirmButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default ELARLATest;
